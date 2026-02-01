import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, lang, voiceName } = await req.json();
    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_TTS_API_KEY not set" }, { status: 400 });
    }

    const body = {
      input: { text },
      // Prefer passed voiceName, else language-only voice; Google will select a default voice
      voice: voiceName ? { languageCode: lang || "en-IN", name: voiceName } : { languageCode: lang || "en-IN" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Google TTS HTTP ${res.status}: ${errText}` }, { status: 500 });
    }
    const data = await res.json();
    const audioB64 = data?.audioContent;
    if (!audioB64) {
      return NextResponse.json({ error: "No audio content returned" }, { status: 500 });
    }

    const audioBuffer = Buffer.from(audioB64, "base64");
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
