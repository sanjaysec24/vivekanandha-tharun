import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

// Lazy-initialized Gemini client to prevent crashes if key is missing during startup
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Full School Information System for AI context
const SCHOOL_KNOWLEDGE_BASE = `
You are V-Leo Bot, the friendly and warm official AI Assistant for Vivekanandha School (formerly Vivekanandha Nursery & Primary School).
Your mascot is the V-Leo Lion, who is playful, friendly, and extremely helpful. You speak to parents, children, and prospective students with a highly positive, encouraging, and warm demeanor, like a premium school concierge or a friendly kindergarten guide.

You support both English and Tamil. If the user talks in Tamil or requests Tamil, reply in high-quality Tamil, or Tamil script.

You have access to the following Vivekanandha School Knowledge Base:
- **School Address & Location**:
  Vivekanandha School
  Vedapalayam Road, Near Angalamman Kovil,
  Uthiramerur, Kanchipuram District, Tamil Nadu - 603406
  Location code (Plus Code): JQ82+C7H (Uthiramerur Road, Uttiramerur). It is in the heart of Uthiramerur, serving families across Kanchipuram district.
- **Phone Numbers**:
  - Admissions Office: +91 94445 47474
  - Principal Office: +91 44 2727 4747
  - Administration Office: +91 44 2727 4848
- **Email Addresses**:
  - admissions@vivekanandhaschool.edu.in
  - info@vivekanandhaschool.edu.in
- **Working Hours**:
  - Monday to Friday: 8:30 AM to 5:00 PM
  - Saturday: 9:00 AM to 1:00 PM
  - Sunday: Holiday (Closed)
- **School Timings for Students**:
  - Daily: 8:30 AM to 3:30 PM.
  - Lunch break: 12:15 PM to 1:00 PM.
- **Grades / Classes Offered**:
  - Pre KG, LKG, UKG, Grade 1, Grade 2, Grade 3, Grade 4, Grade 5.
- **Admission Process**:
  - Simple, parent-focused application process. Parents can fill out our Interactive Enquiry Form online on the Contact page, or click 'Apply for Admission' to load the admissions portal or drawer.
  - Offline admissions can be completed by visiting our campus on Vedapalayam Road during working hours.
- **Fee Information**:
  - Vivekanandha School offers a highly affordable, competitive, and parent-friendly fee structure. For exact fee schedules for each grade, please connect with the Admissions Office at +91 94445 47474.
- **Academic Programs & Curriculum**:
  - Standard state-board foundation with CBSE hybrid modules for nursery & primary levels. Focused on holistic child development, reading, writing, math, moral values, and Tamil cultural roots.
- **Uniforms**:
  - Standard neat school uniform (Brown/Cream combinations) to match our premium aesthetic, details provided upon admissions confirmation.
- **Transport Facilities**:
  - Safe and reliable school bus and van network covering major areas in and around Uthiramerur and Kanchipuram district.
- **Co-Curricular Activities & Events**:
  - We have sports activities, drawing, chess, yoga, traditional cultural arts, and events.
  - Signature yearly event: Vijayadasami Admissions fest where new nursery students start their educational journey. We also celebrate Pongal, Annual Day, Sports Day, Independence Day, and Children's Day.
- **Campus Information**:
  - Well-ventilated modern digital classrooms, safe play areas, activity hubs, and a friendly nursery learning environment.

Instructions:
1. Answer any questions about the school using this knowledge.
2. Keep answers warm, positive, friendly, and brief (parents want quick, reassuring answers).
3. If you don't know the answer or if the query is unrelated to the school or represents an escalation/direct human contact request, set "shouldEscalate" to true so the UI can present human contact links (phone, WhatsApp, email) to the parent.
4. Provide 2-3 short, relevant follow-up questions in "suggestedQuestions" to guide the conversation based on the current context.
`;

// Rule-based high-quality fallback generator
function getFallbackResponse(message: string, isTamil: boolean): { text: string; shouldEscalate: boolean; suggestedQuestions: string[] } {
  const msg = message.toLowerCase();
  
  if (isTamil || msg.includes("tamil") || msg.includes("தமிழ்") || /[அ-ஹ]/.test(message)) {
    if (msg.includes("கட்டணம்") || msg.includes("fee") || msg.includes("cost") || msg.includes("பணம்")) {
      return {
        text: "விவேகானந்தா பள்ளியில் மாணவர் சேர்க்கைக்கான கட்டணம் மிகவும் மலிவானது மற்றும் தரமானது. உங்கள் வகுப்புக்கான சரியான கட்டண விவரங்களை அறிய, எங்கள் சேர்க்கை அலுவலகத்தை +91 94445 47474 என்ற எண்ணில் தொடர்பு கொள்ளவும். 🦁",
        shouldEscalate: true,
        suggestedQuestions: ["விண்ணப்பிப்பது எப்படி?", "பள்ளி வேலை நேரம்?", "போக்குவரத்து வசதி உண்டா?"]
      };
    }
    if (msg.includes("சேர்க்கை") || msg.includes("admission") || msg.includes("apply") || msg.includes("சேர")) {
      return {
        text: "விவேகானந்தா பள்ளியில் Pre KG முதல் 5 ஆம் வகுப்பு வரை சேர்க்கை நடைபெறுகிறது! 🌸 எங்கள் இணையதளத்தில் உள்ள 'Apply for Admission' பொத்தானை அழுத்தி விண்ணப்பிக்கலாம் அல்லது எங்கள் அலுவலகத்திற்கு நேரில் வரலாம்.",
        shouldEscalate: false,
        suggestedQuestions: ["பள்ளி கட்டணம் எவ்வளவு?", "பள்ளி எங்குள்ளது?", "பள்ளி வேலை நேரம்?"]
      };
    }
    if (msg.includes("நேரம்") || msg.includes("timing") || msg.includes("time") || msg.includes("மணி")) {
      return {
        text: "விவேகானந்தா பள்ளி மாணவர்களுக்கான வேலை நேரம்: காலை 8:30 மணி முதல் மாலை 3:30 மணி வரை. மதிய உணவு இடைவேளை: மதியம் 12:15 மணி முதல் 1:00 மணி வரை. ⏰",
        shouldEscalate: false,
        suggestedQuestions: ["போக்குவரத்து வசதி?", "பள்ளி கட்டணம் எவ்வளவு?", "விண்ணப்பிப்பது எப்படி?"]
      };
    }
    if (msg.includes("இடம்") || msg.includes("location") || msg.includes("எங்கு") || msg.includes("map") || msg.includes("address")) {
      return {
        text: "எங்கள் பள்ளி முகவரி:\nவிவேகானந்தா பள்ளி, வேதப்பாளையம் சாலை, அங்காளம்மன் கோவில் அருகில், உத்திரமேரூர், காஞ்சிபுரம் மாவட்டம், தமிழ்நாடு - 603406. 📍",
        shouldEscalate: false,
        suggestedQuestions: ["சேர்க்கை விவரங்கள்?", "தொடர்பு கொள்ள வேண்டிய எண்?", "பள்ளி வேலை நேரம்?"]
      };
    }
    if (msg.includes("தொடர்பு") || msg.includes("phone") || msg.includes("contact") || msg.includes("நம்பர்") || msg.includes("எண்")) {
      return {
        text: "எங்களை தொடர்பு கொள்ள:\n📞 சேர்க்கை அலுவலகம்: +91 94445 47474\n📞 முதல்வர் அலுவலகம்: +91 44 2727 4747\n✉️ admissions@vivekanandhaschool.edu.in",
        shouldEscalate: true,
        suggestedQuestions: ["பள்ளி கட்டணம் எவ்வளவு?", "விண்ணப்பிப்பது எப்படி?", "பள்ளி வேலை நேரம்?"]
      };
    }
    return {
      text: "வணக்கம்! 🦁 நான் வி-லியோ பாட் (V-Leo Bot), விவேகானந்தா பள்ளியின் அதிகாரப்பூர்வ உதவியாளர். சேர்க்கை, பள்ளி கட்டணம், பள்ளி வேலை நேரம் மற்றும் போக்குவரத்து வசதிகள் குறித்து நான் உங்களுக்கு உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?",
      shouldEscalate: false,
      suggestedQuestions: ["சேர்க்கை எவ்வாறு பெறுவது?", "பள்ளி கட்டணம் எவ்வளவு?", "தொடர்பு கொள்ள வேண்டிய எண்?"]
    };
  } else {
    // English Fallback
    if (msg.includes("fee") || msg.includes("cost") || msg.includes("price") || msg.includes("fees")) {
      return {
        text: "Vivekanandha School offers a highly affordable and competitive fee structure tailored for parents. For detailed tuition and other fees for each class, please connect directly with our Admissions Office at +91 94445 47474.",
        shouldEscalate: true,
        suggestedQuestions: ["How to apply for admission?", "What are the school timings?", "Is transport facility available?"]
      };
    }
    if (msg.includes("admission") || msg.includes("apply") || msg.includes("enrol") || msg.includes("join")) {
      return {
        text: "Admissions are actively open for Pre KG, LKG, UKG, and Grades 1 to 5! 🌸 You can easily initiate the process by clicking the 'Apply for Admission' button, or by filling out the Enquiry Form on our Contact page.",
        shouldEscalate: false,
        suggestedQuestions: ["What are the school fees?", "Where is the school located?", "What are the school timings?"]
      };
    }
    if (msg.includes("timing") || msg.includes("time") || msg.includes("hours")) {
      return {
        text: "Our school timings for students are from 8:30 AM to 3:30 PM (Monday to Friday). The lunch break is scheduled from 12:15 PM to 1:00 PM. Administrative office hours are 8:30 AM to 5:00 PM.",
        shouldEscalate: false,
        suggestedQuestions: ["Is there school on Saturday?", "What are the school fees?", "How to apply?"]
      };
    }
    if (msg.includes("location") || msg.includes("where") || msg.includes("address") || msg.includes("map") || msg.includes("located") || msg.includes("gps")) {
      return {
        text: "We are located in the heart of Uthiramerur! 📍\n\nAddress:\nVivekanandha School\nVedapalayam Road, Near Angalamman Kovil,\nUthiramerur, Kanchipuram District, Tamil Nadu - 603406.",
        shouldEscalate: false,
        suggestedQuestions: ["What transport facilities are available?", "How to contact the school?", "What are the admission grades?"]
      };
    }
    if (msg.includes("transport") || msg.includes("bus") || msg.includes("van") || msg.includes("route")) {
      return {
        text: "Yes, Vivekanandha School offers safe, prompt, and reliable transport facilities (school buses and vans) across all major residential sectors of Uthiramerur and neighboring Kanchipuram areas. 🚌",
        shouldEscalate: false,
        suggestedQuestions: ["How to apply?", "Where is the school located?", "What are the school fees?"]
      };
    }
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("number") || msg.includes("call") || msg.includes("email") || msg.includes("principal")) {
      return {
        text: "Here are our official contact coordinates:\n📞 Admissions Office: +91 94445 47474\n📞 Principal Office: +91 44 2727 4747\n📞 Administration: +91 44 2727 4848\n📧 admissions@vivekanandhaschool.edu.in",
        shouldEscalate: true,
        suggestedQuestions: ["What are the school fees?", "How to apply for admission?", "What classes do you offer?"]
      };
    }
    return {
      text: "Vanakkam! 🦁 I am V-Leo Bot, the official AI Assistant of Vivekanandha School. I can guide you on admissions, fee enquiries, class information, transport routes, and school timings. How can I help you today?",
      shouldEscalate: false,
      suggestedQuestions: ["Tell me about admissions", "What are the school timings?", "How to contact the school?"]
    };
  }
}

// API Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, language } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const isTamil = language === "ta";
    const ai = getAI();

    // If AI Client is not available, run fallback rule system instantly
    if (!ai) {
      const fallback = getFallbackResponse(message, isTamil);
      return res.json(fallback);
    }

    // Format chat history for GoogleGenAI
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }],
        });
      }
    }
    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SCHOOL_KNOWLEDGE_BASE,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The response to the user. Must be helpful, concise, extremely friendly, and in the language requested (English or Tamil).",
            },
            shouldEscalate: {
              type: Type.BOOLEAN,
              description: "True if the bot cannot answer, if the user asks for email/phone/direct human help, or if the user wants to contact administration.",
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 to 3 short suggested questions that make sense as next steps.",
            },
          },
          required: ["text", "shouldEscalate", "suggestedQuestions"],
        },
      },
    });

    const replyText = response.text;
    if (replyText) {
      try {
        const parsed = JSON.parse(replyText.trim());
        return res.json(parsed);
      } catch (e) {
        // Fallback if JSON format fails to parse correctly
        return res.json({
          text: replyText,
          shouldEscalate: false,
          suggestedQuestions: isTamil 
            ? ["விண்ணப்பிப்பது எப்படி?", "பள்ளி கட்டணம்?"] 
            : ["How to apply?", "What are the school fees?"],
        });
      }
    } else {
      throw new Error("No response text from Gemini API");
    }
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    // Secure and elegant fallback during API limits or failures
    const { message, language } = req.body;
    const isTamil = language === "ta";
    const fallback = getFallbackResponse(message || "", isTamil);
    return res.json(fallback);
  }
});

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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully running on port ${PORT}`);
  });
}

startServer();
