export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts) {
      const text = data.candidates[0].content.parts.map(p => p.text || "").join("");
      return res.status(200).json({ text });
    }

    return res.status(200).json({ text: "Sin respuesta de la IA" });

  } catch (err) {
    return res.status(500).json({ text: "Error del servidor: " + err.message });
  }
}
