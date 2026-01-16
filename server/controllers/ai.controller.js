import main from "../config/gemini.js";
import { GroqService } from "../config/groqService.js";

export const journalPrompt = async (req, res) => {
  try {
    const { journals } = req.body;
    const formattedEntries = journals.map((j, idx) => {
      const date = new Date(j.createdAt).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return `Entry ${idx + 1} - ${date}:\n${j.content}`;
    }).join('\n\n');

    const prompt = `
    You are a thoughtful and empathetic mental wellness assistant. Also give only for those journals if 7 days ago else give plain text message "No journal in recent 7 days"

    Given the following journal entries:
    ${formattedEntries}

    Generate a short, insightful reflection summary which user will be able to understand and make him feel emotionally connected

    Return plain text only. No explanations, no JSON.
    `;

    const content = await main(prompt);

    return res.json({ success: true, prompt: content });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const suggestCoping = async (req, res) => {
  try {
    const { stress_level, stress_factors, symptoms } = req.body;

    if (typeof stress_level !== 'number') {
      return res.status(400).json({ success: false, message: 'Stress level must be a number' });
    }

    if (!Array.isArray(stress_factors) || !stress_factors.length) {
      return res.status(400).json({ success: false, message: 'At least one stress factor is required' });
    }

    if (!Array.isArray(symptoms) || !symptoms.length) {
      return res.status(400).json({ success: false, message: 'At least one symptom is required' });
    }

    const prompt = `
    You are a mental wellness AI assistant. A user reports:
    - Stress level: ${stress_level} / 4
    - Stress factors: ${stress_factors.join(', ')}
    - Symptoms: ${symptoms.join(', ')}

    Suggest 5 short, practical coping strategies. Return ONLY a raw JSON array of strings. No explanations. No markdown. No backticks

    Example format:
    ["Strategy 1", "Strategy 2", "Strategy 3"]
    `;

    const content = await main(prompt);
    const strategies = JSON.parse(content);
    return res.status(200).json({ success: true, coping_strategies: strategies });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const selfCarePlan = async (req, res) => {
  try {
    const { habits = [] } = req.body;

    const prompt = `
      You are an empathetic mental wellness assistant. Based on this user's states:
      - Mood: Moderate
      - Stress Level: Between low and moderate
      - Recent Habits: ${habits.length ? habits.join(', ') : 'None'}

      Suggest a calming and practical **daily self-care plan** with 4-5 bullet points. Focus on:
      - Mindfulness
      - Hydration
      - Physical movement
      - Sleep hygiene
      - Mental rest

      Keep it concise and clear in **plain text** that is as a string, not JSON. and don't add third-party app names. If suggesting breathing, mention "MindMoose breathing exercise".
      `;

    const content = await main(prompt);

    return res.status(200).json({ success: true, plan: content });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const aiTherapistChat = async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ success: false, message: 'Messages must be an array' });
    }

    const systemPrompt = `
      You are a compassionate AI therapist. Respond with empathy and encouragement. Always format your response in clean, readable **Markdown**. Use:
      - bullet points for lists
      - bold text for emphasis
      - headers where appropriate
      - line breaks between points
    Never include raw HTML. Markdown only.`;

    const content = await GroqService.chatWithMessages({
      system: systemPrompt,
      messages,
      max_tokens: 500,
    });

    return res.json({ success: true, reply: content });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

