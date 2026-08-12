/**
 * POST /api/tts
 * Body: { text, lang?, voiceName? }
 *
 * Proxies the request to Google Text-to-Speech and returns the audio as MP3.
 * Keeping the API key server-side (never exposed to the browser).
 */
async function synthesize(req, res) {
  try {
    const { text, lang, voiceName } = req.body;
    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }
    if (!apiKey) {
      return res.status(400).json({ error: "GOOGLE_TTS_API_KEY not configured on the server." });
    }

    const body = {
      input: { text },
      voice: voiceName
        ? { languageCode: lang || "en-IN", name: voiceName }
        : { languageCode: lang || "en-IN" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const { default: fetch } = await import("node-fetch");
    const ttsRes = await fetch(
      "https://texttospeech.googleapis.com/v1/text:synthesize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(body),
      }
    );

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      return res.status(500).json({ error: `Google TTS HTTP ${ttsRes.status}: ${errText}` });
    }

    const data = await ttsRes.json();
    const audioB64 = data?.audioContent;

    if (!audioB64) {
      return res.status(500).json({ error: "No audio content returned from Google TTS." });
    }

    const audioBuffer = Buffer.from(audioB64, "base64");
    res.set({
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    });
    res.send(audioBuffer);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
}

module.exports = { synthesize };
