import { createSupabaseServer } from "@/lib/supabase-server";
import { AppShell } from "@/components/app-shell";
import { DashboardView } from "./dashboard-view";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();
  let docCount = 0;
  let consultationCount = 0;
  let chatCount = 0;
  let isSignedIn = false;

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      isSignedIn = true;

      const { count: docs } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      docCount = docs || 0;

      const { count: consults } = await supabase
        .from("consultations")
        .select("*", { count: "exact", head: true })
        .eq("user_email", user.email);
      consultationCount = consults || 0;

      const { count: chats } = await supabase
        .from("ai_chat_sessions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      chatCount = chats || 0;
    }
  }

  return (
    <AppShell active="dashboard" title="Dashboard" desc="Your legal workspace">
      <DashboardView
        isSignedIn={isSignedIn}
        docCount={docCount}
        consultationCount={consultationCount}
        chatCount={chatCount}
      />
    </AppShell>
  );
}
