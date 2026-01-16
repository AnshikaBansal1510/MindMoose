import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export class GroqService {

  // temperature is scale of creativity
  static async chatWithMessages({ system, messages, temperature = 0.7, max_tokens = 500, model = "openai/gpt-oss-20b" }) {
    const response = await client.chat.completions.create({
      model,
      temperature,
      max_tokens,
      messages: [{ role: "system", content: system }, ...messages],
    });

    return response.choices[0].message.content.trim();
  }
}