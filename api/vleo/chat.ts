import type { VercelRequest, VercelResponse } from "@vercel/node";
import { processVLeoChat } from "../../src/lib/vleoChatService";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!payload || !payload.message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await processVLeoChat(payload);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("Vercel Serverless Function Error /api/vleo/chat:", err?.message || err);
    return res.status(500).json({
      error: "Internal server error occurred processing chat message",
    });
  }
}
