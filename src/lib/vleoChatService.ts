import { GoogleGenAI, Type } from "@google/genai";

// Configurable model name in one server-side location
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-vleo",
        },
      },
    });
  }
  return aiClient;
}

// Complete Vivekanandha School Knowledge Base
export const VLEO_KNOWLEDGE_BASE = `
You are V-Leo AI ("V-Leo AI - Your School Companion"), the official, friendly, knowledgeable, and respectful AI representative of Vivekanandha School (formerly Vivekanandha Nursery & Primary School).
Your mascot is the joyful, warm V-Leo Lion who welcomes parents, students, alumni, and prospective families.

Tone & Personality:
- Friendly, warm, respectful, professional, school-appropriate, and concise.
- Never sound robotic or cold.
- Use helpful formatting like bullet points or bold text where appropriate.

CRITICAL RULES ON GROUNDED TRUTH & ACCURACY:
1. Grounded Truth: Always answer based on the official Vivekanandha School information provided below. Do NOT invent dates, facts, classes, contacts, or policies.
2. FEE ENQUIRIES (STRICT RULE):
   - For queries asking about fee amounts, fee structures (e.g., "What is the fee structure for 2026-27?"):
     DO NOT INVENT ANY FEE AMOUNT OR RUPEE FIGURE.
     Vivekanandha School maintains a transparent, highly affordable fee structure tailored to the community, but specific class fee schedules and installment plans are provided directly by the Admissions Office.
     Inform the user that exact fee details are available through the school Admissions Office, and provide the official contact number (+91 94445 47474) and email (admissions@vivekanandhaschool.edu.in).
     Set "shouldEscalate": true.
3. UNAVAILABLE INFORMATION:
   - If the user asks about something not covered in the official information below (e.g. unknown policies, specific teacher phone numbers, private records), clearly state that this information is currently unavailable through V-Leo, and politely direct the visitor to the school office or admissions team. Set "shouldEscalate": true.
4. LANGUAGE SUPPORT:
   - If the selected language is Tamil ("ta"), or if the user asks in Tamil, reply in fluent, polite, grammatically correct, and natural Tamil.
   - If the selected language is English ("en"), reply in clean, engaging English.

OFFICIAL VIVEKANANDHA SCHOOL INFORMATION:
- **Establishment & Legacy**:
  - Established in 1998 in Uthiramerur, Kanchipuram District, Tamil Nadu.
  - Started with an initial batch of 45 students; now has over 25+ years of academic and cultural legacy.
  - More than 2,500+ proud and thriving alumni.
  - Inspired by Swami Vivekananda's ideal: "Life-building, man-making, and character-making education."
- **Grades / Classes Offered**:
  - Pre-KG, LKG, UKG (Early Childhood Foundational Years)
  - Grade 1, Grade 2, Grade 3, Grade 4, Grade 5 (Primary Schooling)
- **Admissions (2026-27 & Ongoing)**:
  - Admissions are open for Pre-KG through Grade 5.
  - How to Apply:
    1. Online: Use the 'Apply for Admission' / 'Admissions Open' CTA on the website to submit the enquiry/admission form.
    2. In Person: Visit the campus admissions desk on Vedapalayam Road, Uthiramerur.
  - Admissions Contact: +91 94445 47474
  - Email: admissions@vivekanandhaschool.edu.in
- **Fee Policy**:
  - Transparent, parent-friendly, and affordable fee structure.
  - Detailed fee sheets, tuition breakdowns, and fee concessions are handled confidentially by the Admissions Office. Do NOT provide invented numbers.
- **SPECTRA Annual Day Gala**:
  - "SPECTRA" is the school's signature grand Annual Day gala and thematic cultural showcase.
  - Key Highlights:
    - 100% student participation: Every single nursery and primary child takes part on stage.
    - Over 2,000+ attendees including parents, patrons, and alumni.
    - 15+ stage performances: Synchronized cultural dances, classical drama, Tamil literature skits, and musical recitals.
    - Celebration of 25+ years of heritage.
- **Co-Curricular Activities & Holistic Development**:
  - Sports & Athletics: Safe running track, weekly yoga, martial arts/karate, football, competitive sports meets.
  - Arts & Creative Crafts: Dedicated indoor atelier, clay modeling, origami, canvas sketching, annual art exhibition.
  - STEM & Science Discovery: Weekly botanical trials, computer lab exposure, block programming (Scratch), science exhibition.
  - Cultural Heritage & Recitation: Classical Tamil reciting, Thirukkural couplet recital contests, classical music, folk dance.
- **Campus Facilities**:
  - Well-ventilated digital smart classrooms
  - Safe, dedicated children's play areas and activity ateliers
  - Science & computer learning hubs
  - Safe and monitored school bus/van transport covering Uthiramerur and neighboring Kanchipuram villages
- **School Timings**:
  - Student Hours: Monday to Friday: 8:30 AM to 3:30 PM (Lunch break: 12:15 PM to 1:00 PM)
  - Office Working Hours:
    - Monday to Friday: 8:30 AM to 5:00 PM
    - Saturday: 9:00 AM to 1:00 PM
    - Sunday: Holiday (Closed)
- **School Location & Contact Coordinates**:
  - Address: Vivekanandha School, Vedapalayam Road, Near Angalamman Kovil, Uthiramerur, Kanchipuram District, Tamil Nadu - 603406
  - Plus Code: JQ82+C7H (Uthiramerur Road)
  - Admissions Helpline: +91 94445 47474
  - Principal Office: +91 44 2727 4747
  - Administration: +91 44 2727 4848
  - Emails: admissions@vivekanandhaschool.edu.in | info@vivekanandhaschool.edu.in
`;

export interface ChatRequestPayload {
  message: string;
  history?: Array<{ role: string; text: string }>;
  language?: "en" | "ta" | string;
  currentPage?: string;
  cmsContext?: any;
  systemPrompt?: string;
  knowledgeBase?: string;
}

export interface ChatResponsePayload {
  text: string;
  shouldEscalate: boolean;
  suggestedQuestions: string[];
}

// Fallback generator when API is offline or rate-limited
export function getFallbackResponse(message: string, isTamil: boolean): ChatResponsePayload {
  const msg = (message || "").toLowerCase();

  if (isTamil || msg.includes("tamil") || msg.includes("தமிழ்") || /[அ-ஹ]/.test(message)) {
    if (msg.includes("கட்டணம்") || msg.includes("fee") || msg.includes("cost") || msg.includes("பணம்")) {
      return {
        text: "விவேகானந்தா பள்ளியில் மாணவர் சேர்க்கைக்கான கட்டணம் மிகவும் மலிவானது மற்றும் வெளிப்படையானது. உங்கள் வகுப்புக்கான சரியான கட்டண விவரங்களை அறிய, எங்கள் சேர்க்கை அலுவலகத்தை **+91 94445 47474** என்ற எண்ணில் தொடர்பு கொள்ளவும் அல்லது admissions@vivekanandhaschool.edu.in என்ற முகவரிக்கு மின்னஞ்சல் அனுப்பவும்.",
        shouldEscalate: true,
        suggestedQuestions: ["விண்ணப்பிப்பது எப்படி?", "பள்ளி வேலை நேரம்?", "போக்குவரத்து வசதி உண்டா?"]
      };
    }
    if (msg.includes("spectra") || msg.includes("ஸ்பெக்ட்ரா") || msg.includes("annual day") || msg.includes("ஆண்டு விழா")) {
      return {
        text: "**ஸ்பெக்ட்ரா (SPECTRA)** என்பது விவேகானந்தா பள்ளியின் பிரம்மாண்டமான ஆண்டு விழா மற்றும் கலைத் திருவிழா ஆகும். இதில் 100% மாணவர்கள் மேடையில் தோன்றி நடனம், நாடகம் மற்றும் கலை நிகழ்ச்சிகளை நிகழ்த்துகிறார்கள். 2,000-க்கும் மேற்பட்ட பெற்றோர்கள் மற்றும் நலவிரும்பிகள் இதில் கலந்துகொள்கின்றனர்.",
        shouldEscalate: false,
        suggestedQuestions: ["என்னென்ன வகுப்புகள் உள்ளன?", "பள்ளி வேலை நேரம்?", "சேர்க்கை எவ்வாறு பெறுவது?"]
      };
    }
    if (msg.includes("சேர்க்கை") || msg.includes("admission") || msg.includes("apply") || msg.includes("சேர")) {
      return {
        text: "விவேகானந்தா பள்ளியில் **Pre-KG முதல் 5 ஆம் வகுப்பு வரை** சேர்க்கை நடைபெறுகிறது! 🌸 எங்கள் இணையதளத்தில் உள்ள 'Apply for Admission' பொத்தானை அழுத்தி ஆன்லைனில் விண்ணப்பிக்கலாம் அல்லது எங்கள் அலுவலகத்திற்கு நேரில் வரலாம்.\n\n📞 சேர்க்கை உதவி எண்: **+91 94445 47474**",
        shouldEscalate: false,
        suggestedQuestions: ["பள்ளி கட்டணம் எவ்வளவு?", "பள்ளி எங்குள்ளது?", "பள்ளி வேலை நேரம்?"]
      };
    }
    if (msg.includes("வகுப்பு") || msg.includes("class") || msg.includes("grade")) {
      return {
        text: "விவேகானந்தா பள்ளியில் பின்வரும் வகுப்புகள் உள்ளன:\n- **பாலர் கல்வி:** Pre-KG, LKG, UKG\n- **தொடக்கப் பள்ளி:** 1 ஆம் வகுப்பு முதல் 5 ஆம் வகுப்பு வரை",
        shouldEscalate: false,
        suggestedQuestions: ["சேர்க்கை எவ்வாறு பெறுவது?", "பள்ளி வேலை நேரம்?", "போக்குவரத்து வசதி உண்டா?"]
      };
    }
    if (msg.includes("தொடங்கப்பட்டது") || msg.includes("established") || msg.includes("வரலாறு") || msg.includes("history") || msg.includes("1998")) {
      return {
        text: "விவேகானந்தா பள்ளி **1998 ஆம் ஆண்டு** உத்திரமேரூரில் 45 மாணவர்களுடன் தொடங்கப்பட்டது. 25 ஆண்டுகளுக்கும் மேலான கல்வி பாரம்பரியத்தில், 2,500-க்கும் மேற்பட்ட முன்னாள் மாணவர்களை உருவாக்கியுள்ளது.",
        shouldEscalate: false,
        suggestedQuestions: ["என்னென்ன வகுப்புகள் உள்ளன?", "சேர்க்கை விவரங்கள்?", "பள்ளி எங்குள்ளது?"]
      };
    }
    if (msg.includes("நேரம்") || msg.includes("timing") || msg.includes("time") || msg.includes("மணி")) {
      return {
        text: "விவேகானந்தா பள்ளி மாணவர்களுக்கான வேலை நேரம்:\n- **திங்கள் முதல் வெள்ளி வரை:** காலை 8:30 மணி முதல் மாலை 3:30 மணி வரை\n- **மதிய உணவு இடைவேளை:** மதியம் 12:15 மணி முதல் 1:00 மணி வரை\n- **அலுவலக நேரம்:** காலை 8:30 மணி முதல் மாலை 5:00 மணி வரை",
        shouldEscalate: false,
        suggestedQuestions: ["போக்குவரத்து வசதி?", "பள்ளி கட்டணம் எவ்வளவு?", "விண்ணப்பிப்பது எப்படி?"]
      };
    }
    if (msg.includes("இடம்") || msg.includes("location") || msg.includes("எங்கு") || msg.includes("address")) {
      return {
        text: "எங்கள் பள்ளி முகவரி:\n📍 **விவேகானந்தா பள்ளி**, வேதப்பாளையம் சாலை, அங்காளம்மன் கோவில் அருகில், உத்திரமேரூர், காஞ்சிபுரம் மாவட்டம், தமிழ்நாடு - 603406.",
        shouldEscalate: false,
        suggestedQuestions: ["சேர்க்கை விவரங்கள்?", "தொடர்பு கொள்ள வேண்டிய எண்?", "பள்ளி வேலை நேரம்?"]
      };
    }
    return {
      text: "வணக்கம்! 🦁 நான் வி-லியோ பாட் (V-Leo AI), விவேகானந்தா பள்ளியின் அதிகாரப்பூர்வ உதவியாளர். சேர்க்கை, பள்ளி வரலாறு, வகுப்புகள், வேலை நேரம் மற்றும் வசதிகள் குறித்து நான் உங்களுக்கு உதவ முடியும். நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?",
      shouldEscalate: false,
      suggestedQuestions: ["சேர்க்கை எவ்வாறு பெறுவது?", "என்னென்ன வகுப்புகள் உள்ளன?", "ஸ்பெக்ட்ரா பற்றி கூறுங்கள்"]
    };
  }

  // English Fallback
  if (msg.includes("fee") || msg.includes("cost") || msg.includes("price") || msg.includes("fees")) {
    return {
      text: "Vivekanandha School maintains a transparent and affordable fee structure tailored to the community. Official class fee schedules, installment options, and breakdown for the 2026-27 academic year are provided directly by our Admissions Office.\n\nPlease call our Admissions Helpline directly at **+91 94445 47474** or email **admissions@vivekanandhaschool.edu.in** for exact details.",
      shouldEscalate: true,
      suggestedQuestions: ["How to apply for admission?", "What classes are available?", "What are the school timings?"]
    };
  }
  if (msg.includes("spectra") || msg.includes("annual day")) {
    return {
      text: "**SPECTRA** is Vivekanandha School's celebrated grand Annual Day cultural gala! 🌟\n\n- **100% Student Participation**: Every nursery and primary child participates on stage.\n- **2,000+ Audience**: Attended enthusiastically by parents, patrons, and alumni.\n- **15+ Performances**: Cultural dances, historical drama, classical choir, and Thirukkural recitals.\n- **25+ Years of Legacy**: Honoring the school's heritage.",
      shouldEscalate: false,
      suggestedQuestions: ["What classes are available?", "How to apply for admission?", "When was the school established?"]
    };
  }
  if (msg.includes("class") || msg.includes("grade") || msg.includes("offer") || msg.includes("curriculum")) {
    return {
      text: "Vivekanandha School offers classes from foundational early childhood through primary education:\n\n- **Early Years:** Pre-KG, LKG, and UKG\n- **Primary School:** Grade 1, Grade 2, Grade 3, Grade 4, and Grade 5\n\nOur curriculum integrates foundational state-board standards with CBSE-oriented hybrid learning modules.",
      shouldEscalate: false,
      suggestedQuestions: ["Tell me about admissions", "What are the school timings?", "What co-curricular activities exist?"]
    };
  }
  if (msg.includes("established") || msg.includes("history") || msg.includes("founded") || msg.includes("1998") || msg.includes("about")) {
    return {
      text: "Vivekanandha School was established in **1998** in Uthiramerur, Kanchipuram District, with an inaugural batch of 45 students. Over its **25+ years of legacy**, the institution has guided more than **2,500+ thriving alumni**, inspired by the character-building ideals of Swami Vivekananda.",
      shouldEscalate: false,
      suggestedQuestions: ["What classes are available?", "Tell me about admissions", "Tell me about Spectra"]
    };
  }
  if (msg.includes("admission") || msg.includes("apply") || msg.includes("enrol") || msg.includes("join")) {
    return {
      text: "Admissions for **Pre-KG through Grade 5** for the **2026-2027 academic year** are currently open! 🌸\n\n**How to Apply:**\n1. **Online:** Click 'Apply for Admission' on our website to fill the application enquiry.\n2. **In Person:** Visit our campus admissions desk on Vedapalayam Road, Uthiramerur.\n\n📞 Admissions Helpline: **+91 94445 47474**\n📧 Email: **admissions@vivekanandhaschool.edu.in**",
      shouldEscalate: false,
      suggestedQuestions: ["What classes are available?", "Where is the school located?", "What are the school timings?"]
    };
  }
  if (msg.includes("timing") || msg.includes("time") || msg.includes("hours")) {
    return {
      text: "**School Timings:**\n- **Students:** Monday to Friday, 8:30 AM to 3:30 PM (Lunch break: 12:15 PM – 1:00 PM)\n- **Office Hours:** Monday to Friday, 8:30 AM to 5:00 PM | Saturday, 9:00 AM to 1:00 PM | Sunday: Closed",
      shouldEscalate: false,
      suggestedQuestions: ["What transport facilities exist?", "How to apply for admission?", "Where is the school located?"]
    };
  }
  if (msg.includes("location") || msg.includes("where") || msg.includes("address") || msg.includes("contact")) {
    return {
      text: "**Vivekanandha School**\n📍 Vedapalayam Road, Near Angalamman Kovil, Uthiramerur, Kanchipuram District, Tamil Nadu - 603406\n\n📞 **Phone:** +91 94445 47474 (Admissions) | +91 44 2727 4747 (Office)\n📧 **Email:** admissions@vivekanandhaschool.edu.in",
      shouldEscalate: false,
      suggestedQuestions: ["Tell me about admissions", "What classes are available?", "Tell me about Spectra"]
    };
  }

  return {
    text: "Vanakkam! 🦁 I am V-Leo AI, your official school companion for Vivekanandha School. I can assist you with admissions, classes, school history, campus facilities, timings, and our annual Spectra gala. How can I help you today?",
    shouldEscalate: false,
    suggestedQuestions: ["Tell me about Vivekanandha School", "What classes are available?", "Tell me about admissions"]
  };
}

// Core Gemini chat processor - serverless-safe & framework-independent
export async function processVLeoChat(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
  const { message, history, language, currentPage, cmsContext, systemPrompt, knowledgeBase } = payload;

  // Basic validation
  if (!message || typeof message !== "string" || !message.trim()) {
    throw new Error("Message is required and must not be empty");
  }

  const cleanMessage = message.trim().slice(0, 1000); // Limit message length
  const isTamil = language === "ta";

  // Check Gemini client
  const ai = getGeminiClient();
  if (!ai) {
    console.warn("GEMINI_API_KEY is not configured. Serving grounded fallback.");
    return getFallbackResponse(cleanMessage, isTamil);
  }

  // Construct dynamic context
  let liveCmsKnowledge = "";
  if (cmsContext && typeof cmsContext === "object") {
    try {
      const entries = Object.entries(cmsContext)
        .slice(0, 10) // Limit size
        .map(([key, val]) => {
          if (!val) return null;
          return `--- Section: ${key} ---\n${typeof val === "string" ? val : JSON.stringify(val)}`;
        })
        .filter(Boolean);
      if (entries.length > 0) {
        liveCmsKnowledge = `\nADDITIONAL WEBSITE CMS CONTEXT:\n` + entries.join("\n\n");
      }
    } catch {
      // Ignore stringify errors
    }
  }

  const pageContext = currentPage ? `\nUSER CURRENTLY BROWSING: ${currentPage}` : "";
  const customSystemPrompt = systemPrompt ? `\nADDITIONAL INSTRUCTIONS:\n${systemPrompt}` : "";
  const customKnowledge = knowledgeBase ? `\nCUSTOM KNOWLEDGE BASE:\n${knowledgeBase}` : "";

  const systemInstruction = `${VLEO_KNOWLEDGE_BASE}${customSystemPrompt}${customKnowledge}${liveCmsKnowledge}${pageContext}\nTarget Language: ${isTamil ? "Tamil" : "English"}`;

  // Build sanitized history (limit to last 10 messages)
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  if (Array.isArray(history)) {
    const recentHistory = history.slice(-10);
    for (const turn of recentHistory) {
      if (turn && typeof turn.text === "string" && turn.text.trim()) {
        contents.push({
          role: turn.role === "user" || turn.role === "human" ? "user" : "model",
          parts: [{ text: turn.text.trim().slice(0, 1000) }],
        });
      }
    }
  }

  // Add current message
  contents.push({
    role: "user",
    parts: [{ text: cleanMessage }],
  });

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The response in clean Markdown. Must be warm, polite, school-appropriate, and strictly grounded in Vivekanandha School knowledge.",
            },
            shouldEscalate: {
              type: Type.BOOLEAN,
              description: "True if information is missing/unavailable, if fees are asked, or if human admissions/office contact is needed.",
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 to 3 concise relevant follow-up questions.",
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
        if (parsed.text && Array.isArray(parsed.suggestedQuestions)) {
          return {
            text: parsed.text,
            shouldEscalate: Boolean(parsed.shouldEscalate),
            suggestedQuestions: parsed.suggestedQuestions.slice(0, 3),
          };
        }
      } catch (parseError) {
        return {
          text: replyText,
          shouldEscalate: false,
          suggestedQuestions: isTamil
            ? ["விண்ணப்பிப்பது எப்படி?", "வகுப்புகள் என்னென்ன?"]
            : ["How to apply?", "What classes are available?"],
        };
      }
    }

    throw new Error("Empty response received from Gemini model");
  } catch (error: any) {
    console.error("Gemini API invocation error:", error?.message || error);
    return getFallbackResponse(cleanMessage, isTamil);
  }
}
