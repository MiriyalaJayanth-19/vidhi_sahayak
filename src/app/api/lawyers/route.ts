import { NextResponse } from "next/server";
import { LAWYERS } from "@/lib/lawyers";
import { createSupabaseServer } from "@/lib/supabase-server";

type LawyerRow = {
  id: string;
  full_name: string | null;
  practices: string[] | null;
  experience_years: number | null;
  office_location: string | null;
  fee: number | null;
  verification_status: string | null;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const practice = searchParams.get("practice") || "all";
  const location = searchParams.get("location") || "all";
  const maxFee = searchParams.get("maxFee");
  const maxFeeNum = maxFee ? Number(maxFee) : null;

  // Try Supabase first
  const supabase = await createSupabaseServer();
  if (supabase) {
    const orParts: string[] = [];
    const sanitizedQ = q.replace(/[,()"]/g, "").trim();
    if (sanitizedQ) {
      // simple text match on name, location
      orParts.push(`full_name.ilike.%${sanitizedQ}%`);
      orParts.push(`office_location.ilike.%${sanitizedQ}%`);
    }
    let queryBuilder = supabase
      .from("lawyer_profiles")
      .select("id,full_name,practices,experience_years,office_location,fee,verification_status")
      .eq("verification_status", "verified");
    if (practice !== "all") {
      queryBuilder = queryBuilder.contains("practices", [practice]);
    }
    if (location !== "all") {
      queryBuilder = queryBuilder.eq("office_location", location);
    }
    if (maxFeeNum) {
      queryBuilder = queryBuilder.lte("fee", maxFeeNum);
    }
    if (orParts.length > 0) {
      queryBuilder = queryBuilder.or(orParts.join(","));
    }
    const { data, error } = await queryBuilder.returns<LawyerRow[]>();
    if (!error && data) {
      // Map DB field names to API shape
      const items = data.map((d) => ({
        id: d.id,
        name: d.full_name ?? "(Unnamed)",
        practices: d.practices ?? [],
        experienceYears: d.experience_years ?? 0,
        location: d.office_location ?? "",
        fee: d.fee ?? 0,
      }));
      const response = NextResponse.json({ items });
      // Add Cache-Control headers for CDN caching (1 minute fresh, 5 mins stale-while-revalidate)
      response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
      return response;
    }
  }

  // Fallback to file data
  const filtered = LAWYERS.filter((l) => {
    const matchesText = q
      ? [l.name, l.location, ...l.practices].join(" ").toLowerCase().includes(q)
      : true;
    const matchesPractice = practice === "all" ? true : l.practices.includes(practice);
    const matchesLocation = location === "all" ? true : l.location === location;
    const matchesFee = maxFeeNum ? l.fee <= maxFeeNum : true;
    return matchesText && matchesPractice && matchesLocation && matchesFee;
  });

  return NextResponse.json({ items: filtered });
}
