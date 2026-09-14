import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { processVLeoChat, getFallbackResponse, GEMINI_MODEL } from "./src/lib/vleoChatService";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    model: GEMINI_MODEL,
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

// Primary V-Leo chat handler used by both /api/vleo/chat and /api/chat
async function handleChatRequest(req: express.Request, res: express.Response) {
  try {
    const { message, history, language, currentPage, cmsContext, systemPrompt, knowledgeBase } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await processVLeoChat({
      message,
      history,
      language,
      currentPage,
      cmsContext,
      systemPrompt,
      knowledgeBase,
    });

    return res.json(result);
  } catch (error: any) {
    console.error("V-Leo Chat Server Handler Error:", error?.message || error);
    const isTamil = req.body?.language === "ta";
    const fallback = getFallbackResponse(req.body?.message || "", isTamil);
    return res.json(fallback);
  }
}

// Support both endpoint paths for seamless compatibility:
app.post("/api/vleo/chat", handleChatRequest);
app.post("/api/chat", handleChatRequest);

// Vite server middleware integration or static assets build serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully running on http://localhost:${PORT}`);
  });
}

startServer();
