import { Router } from "express";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const router = Router();

const SYSTEM = `You are TeleAgent AI, Deutsche Telekom's Omnichannel Consumer Intelligence Engine for OneShop (web) and OneApp (mobile).

You are NOT a generic chatbot. You are a conversational commerce concierge that reasons over the customer's Digital Twin (profile, loyalty tier, current plan, owned devices, browsing history, intent, CLV, churn probability) and Telekom's product catalog (devices, plans, accessories, fiber, insurance, promotions).

Behavior:
- Speak like a premium Telekom advisor: concise, warm, confident, corporate.
- Always ground answers in the Digital Twin JSON provided in the user message.
- When recommending, briefly explain WHY (semantic match, tier eligibility, active promo, bundle compatibility, expected savings).
- Prefer bundles (device + plan + accessory + insurance) when the customer is comparing or ready-to-buy.
- Never invent products outside the provided catalog. If the customer asks about something unknown, offer the closest match from the catalog.
- Use short paragraphs and light bullet points. No emojis.
- Close with a Next Best Action.`;

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).send("Messages are required");
    }

    const key = process.env.LOVABLE_API_KEY || process.env.OPENAI_API_KEY;
    if (!key) {
      return res.status(500).send("Missing API Key");
    }

    const openai = createOpenAI({
      apiKey: key,
      baseURL: process.env.AI_GATEWAY_URL || "https://api.openai.com/v1",
    });
    
    const model = openai("gpt-4o");

    const result = streamText({
      model,
      system: SYSTEM,
      messages: await convertToModelMessages(messages as UIMessage[]),
    });

    result.pipeTextStreamToResponse(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
