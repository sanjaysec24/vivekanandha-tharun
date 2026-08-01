import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Send, Phone, Mail, Globe, CornerDownRight, Sparkles, AlertCircle,
  Copy, Check, RotateCcw, Trash2, ThumbsUp, ThumbsDown, MapPin, ExternalLink,
  MessageSquare
} from "lucide-react";
import Markdown from "react-markdown";
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "../lib/router";

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  shouldEscalate?: boolean;
  userPrompt?: string; // Stored on bot message for regenerate
  feedbackSubmitted?: "helpful" | "unhelpful" | null;
  feedbackComment?: string;
}

export interface ChatbotCMSData {
  // Avatars
  avatar?: string;
  avatarUrl?: string;
  botAvatar?: string;
  headerAvatar?: string;
  header_avatar?: string;
  headerAvatarUrl?: string;
  launcherIcon?: string;
  launcher_icon?: string;
  launcherIconUrl?: string;
  mascotIcon?: string;
  launcherImage?: string;

  // Assistant Names & Titles
  name?: string;
  assistantName?: string;
  assistant_name?: string;
  botName?: string;
  bot_name?: string;
  assistantNameEn?: string;
  assistantNameTa?: string;
  nameTa?: string;

  subtitle?: string;
  assistantSubtitle?: string;
  assistant_subtitle?: string;
  subtitleEn?: string;
  subtitleTa?: string;

  status?: string;
  statusText?: string;
  statusEn?: string;
  statusTa?: string;

  // Prompts & Knowledge Base
  systemPrompt?: string;
  system_prompt?: string;
  knowledgeBase?: string;
  knowledge_base?: string;
  websiteInformation?: string;

  // Greetings & Welcome
  greeting?: string;
  welcomeMessage?: string;
  welcome_message?: string;
  welcomeGreeting?: string;
  welcomeMessageEn?: string;
  welcomeMessageTa?: string;
  hoverGreeting?: string;
  hoverBubbles?: string[] | string;
  hover_bubbles?: string[] | string;

  // Capabilities & Suggested Questions
  capabilitiesList?: string[] | string;
  capabilitiesListTa?: string[] | string;
  suggestedQuestions?: string[];
  quickActions?: Array<{ label?: string; labelTa?: string; query?: string; text?: string }> | string[];
  quick_actions?: Array<{ label?: string; labelTa?: string; query?: string; text?: string }> | string[];

  // Input & Language
  inputPlaceholder?: string;
  inputPlaceholderTa?: string;
  languageButtonText?: string;
  languageButtonTa?: string;

  // Settings
  conversationHistoryLength?: number | string;
  maxHistoryLength?: number | string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | string;
  floatingPosition?: string;
  widgetSize?: "compact" | "standard" | "large" | string;

  // Appearance & Colors
  headerBgColor?: string;
  header_bg_color?: string;
  accentColor?: string;
  accent_color?: string;
  primaryColor?: string;
  chatBgColor?: string;
  chat_bg_color?: string;
  userBubbleBgColor?: string;
  user_bubble_bg_color?: string;
  botBubbleBgColor?: string;
  bot_bubble_bg_color?: string;
  launcherBgColor?: string;
  launcher_bg_color?: string;
  appearanceColours?: Record<string, string>;
  appearanceColors?: Record<string, string>;

  // Human Contact / Handoff
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapsUrl?: string;
}

const DEFAULT_MASCOT_IMAGE = "/images/vleo_mascot.png";

const DEFAULT_HOVER_BUBBLES = [
  "🦁 Need help?",
  "Ask V-Leo",
  "Admissions Assistant",
  "How can I help?",
];

const DEFAULT_QUICK_ACTIONS = [
  { label: "Admissions", labelTa: "சேர்க்கை", query: "Tell me about the admission process and eligibility for 2027" },
  { label: "Fee Details", labelTa: "கட்டணம்", query: "What is the fee structure at Vivekanandha School?" },
  { label: "Academics", labelTa: "பாடத்திட்டம்", query: "What grades and curriculum do you offer?" },
  { label: "Events", labelTa: "நிகழ்வுகள்", query: "What are the upcoming events and celebrations?" },
  { label: "Transport", labelTa: "பேருந்து", query: "What are the school transport routes and facilities?" },
  { label: "Gallery", labelTa: "புகைப்படங்கள்", query: "Where can I view photos of campus activities?" },
  { label: "Book Visit", labelTa: "நேரில் வர", query: "How can I book a campus visit to Vivekanandha School?" },
  { label: "Contact Office", labelTa: "தொடர்பு", query: "What is the office address, phone number and email?" },
];

export default function VLeoChatbot() {
  const { path } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hoverBubble, setHoverBubble] = useState<string | null>(null);
  const [showSparkles, setShowSparkles] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Feedback State for comments
  const [activeFeedbackMsgId, setActiveFeedbackMsgId] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"helpful" | "unhelpful" | null>(null);
  const [feedbackCommentText, setFeedbackCommentText] = useState("");

  // CMS Settings & Live Context
  const [cmsAiSettings, setCmsAiSettings] = useState<ChatbotCMSData | null>(null);
  const [cmsChatbotSettings, setCmsChatbotSettings] = useState<ChatbotCMSData | null>(null);
  const [cmsContextData, setCmsContextData] = useState<Record<string, any>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // 1. Subscribe to website_cms/ai AND website_cms/chatbot
  useEffect(() => {
    if (!db) return;

    const unsubAi = onSnapshot(
      doc(db, "website_cms", "ai"),
      (docSnap) => {
        if (docSnap.exists()) {
          setCmsAiSettings(docSnap.data() as ChatbotCMSData);
        }
      },
      (err) => {
        console.warn("website_cms/ai snapshot warning:", err);
      }
    );

    const unsubChatbot = onSnapshot(
      doc(db, "website_cms", "chatbot"),
      (docSnap) => {
        if (docSnap.exists()) {
          setCmsChatbotSettings(docSnap.data() as ChatbotCMSData);
        }
      },
      (err) => {
        console.warn("website_cms/chatbot snapshot warning:", err);
      }
    );

    // Subscribe to key CMS sections for live AI context enrichment
    const sectionsToListen = [
      "branding",
      "hero",
      "promotions",
      "educational_highlight",
      "upcoming_event",
      "event_showcase",
      "seo"
    ];

    const unsubs: Array<() => void> = [];

    sectionsToListen.forEach((sec) => {
      const u = onSnapshot(
        doc(db, "website_cms", sec),
        (snap) => {
          if (snap.exists()) {
            setCmsContextData((prev) => ({
              ...prev,
              [sec]: snap.data(),
            }));
          }
        },
        () => {}
      );
      unsubs.push(u);
    });

    return () => {
      unsubAi();
      unsubChatbot();
      unsubs.forEach((u) => u());
    };
  }, []);

  // Merge CMS Data (website_cms/ai takes precedence over website_cms/chatbot)
  const cmsData: ChatbotCMSData = {
    ...cmsChatbotSettings,
    ...cmsAiSettings,
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // --- Dynamic Values with Fallbacks ---
  const launcherIcon =
    cmsData?.launcherIcon ||
    cmsData?.launcher_icon ||
    cmsData?.launcherIconUrl ||
    cmsData?.mascotIcon ||
    cmsData?.launcherImage ||
    DEFAULT_MASCOT_IMAGE;

  const headerAvatar =
    cmsData?.headerAvatar ||
    cmsData?.header_avatar ||
    cmsData?.headerAvatarUrl ||
    cmsData?.botAvatar ||
    cmsData?.avatarUrl ||
    cmsData?.avatar ||
    launcherIcon;

  const botNameEn =
    cmsData?.assistantName ||
    cmsData?.assistant_name ||
    cmsData?.botName ||
    cmsData?.bot_name ||
    cmsData?.name ||
    cmsData?.assistantNameEn ||
    "🦁 V-Leo AI";

  const botNameTa =
    cmsData?.assistantNameTa ||
    cmsData?.nameTa ||
    "🦁 வி-லியோ AI";

  const currentBotName = language === "en" ? botNameEn : botNameTa;

  const subtitleEn =
    cmsData?.assistantSubtitle ||
    cmsData?.assistant_subtitle ||
    cmsData?.subtitle ||
    cmsData?.subtitleEn ||
    "Your School Companion";

  const subtitleTa =
    cmsData?.subtitleTa ||
    "உங்கள் பள்ளி வழிகாட்டி";

  const currentSubtitle = language === "en" ? subtitleEn : subtitleTa;

  const statusEn = cmsData?.status || cmsData?.statusText || cmsData?.statusEn || "Online";
  const statusTa = cmsData?.statusTa || "ஆன்லைனில் உள்ளார்";
  const currentStatus = language === "en" ? statusEn : statusTa;

  const langBtnTextEn = cmsData?.languageButtonTa || "தமிழ்";
  const langBtnTextTa = cmsData?.languageButtonText || "EN";
  const currentLangBtnText = language === "en" ? langBtnTextEn : langBtnTextTa;

  // Welcome Messages
  const defaultWelcomeEn = `Hello 👋
I'm V-Leo, your AI School Companion.

I can help you with:
• Admissions & Eligibility
• Fee Structure & Payment
• Academic Curriculum & Grades
• School Bus & Transport
• Events, Celebration & Gallery
• Campus Tour & Timings`;

  const defaultWelcomeTa = `வணக்கம் 👋
நான் வி-லியோ (V-Leo), விவேகானந்தா பள்ளியின் AI வழிகாட்டி.

நான் உங்களுக்கு பின்வருவனவற்றில் உதவ முடியும்:
• சேர்க்கை விவரங்கள்
• பள்ளி கட்டணம்
• கல்வி முறை
• பேருந்து வசதி
• நிகழ்வுகள் & படங்கள்
• பள்ளி நேரம் & வருகை`;

  const welcomeEn =
    cmsData?.welcomeMessage ||
    cmsData?.welcome_message ||
    cmsData?.welcomeGreeting ||
    cmsData?.welcomeMessageEn ||
    defaultWelcomeEn;

  const welcomeTa =
    cmsData?.welcomeMessageTa ||
    defaultWelcomeTa;

  const currentWelcomeMessage = language === "en" ? welcomeEn : welcomeTa;

  // Hover Bubbles
  const rawHoverBubbles = cmsData?.hoverBubbles || cmsData?.hover_bubbles;
  let cmsHoverBubbles: string[] = [];
  if (Array.isArray(rawHoverBubbles)) {
    cmsHoverBubbles = rawHoverBubbles.map((b) => String(b)).filter(Boolean);
  } else if (typeof rawHoverBubbles === "string" && rawHoverBubbles.trim() !== "") {
    cmsHoverBubbles = [rawHoverBubbles.trim()];
  } else if (cmsData?.greeting) {
    cmsHoverBubbles = [cmsData.greeting];
  }
  const hoverBubblesList = cmsHoverBubbles.length > 0 ? cmsHoverBubbles : DEFAULT_HOVER_BUBBLES;

  // Quick Actions & Suggested Questions
  const rawQuickActions = cmsData?.suggestedQuestions || cmsData?.quickActions || cmsData?.quick_actions;
  let quickActionsList = DEFAULT_QUICK_ACTIONS;

  if (Array.isArray(rawQuickActions) && rawQuickActions.length > 0) {
    quickActionsList = rawQuickActions.map((item: any) => {
      if (typeof item === "string") {
        return {
          label: item,
          labelTa: item,
          query: `Tell me about ${item}`,
        };
      }
      return {
        label: item.label || item.text || item.title || "Help",
        labelTa: item.labelTa || item.label_ta || item.label || "உதவி",
        query: item.query || item.prompt || `Tell me about ${item.label || item.text || "this"}`,
      };
    });
  }

  // Placeholder
  const inputPlaceholderEn = cmsData?.inputPlaceholder || "Ask V-Leo anything...";
  const inputPlaceholderTa = cmsData?.inputPlaceholderTa || "வி-லியோவிடம் ஏதேனும் கேட்கவும்...";
  const currentInputPlaceholder = language === "en" ? inputPlaceholderEn : inputPlaceholderTa;

  // Appearance Colors
  const colorsObj = cmsData?.appearanceColours || cmsData?.appearanceColors || {};
  const headerBgColor = cmsData?.headerBgColor || cmsData?.header_bg_color || colorsObj.headerBgColor || "#4A2C21";
  const accentColor = cmsData?.accentColor || cmsData?.accent_color || cmsData?.primaryColor || colorsObj.accentColor || "#E78F68";
  const chatBgColor = cmsData?.chatBgColor || cmsData?.chat_bg_color || colorsObj.chatBgColor || "#FAF7F2";
  const userBubbleBgColor = cmsData?.userBubbleBgColor || cmsData?.user_bubble_bg_color || colorsObj.userBubbleBgColor || accentColor;
  const botBubbleBgColor = cmsData?.botBubbleBgColor || cmsData?.bot_bubble_bg_color || colorsObj.botBubbleBgColor || "#FFFFFF";
  const launcherBgColor = cmsData?.launcherBgColor || cmsData?.launcher_bg_color || colorsObj.launcherBgColor || "#FFFFFF";

  // Contact / Escalation info
  const phoneVal = cmsData?.phone || "+91 94445 47474";
  const whatsappVal = cmsData?.whatsapp || "919444547474";
  const emailVal = cmsData?.email || "admissions@vivekanandhaschool.edu.in";
  const mapsUrlVal = cmsData?.googleMapsUrl || "https://maps.google.com/?q=Vivekanandha+School+Uthiramerur";

  // Position Styling
  const floatingPosClass =
    cmsData?.position === "bottom-left" || cmsData?.floatingPosition === "bottom-left"
      ? "bottom-4 left-4 md:bottom-6 md:left-6"
      : "bottom-4 right-4 md:bottom-6 md:right-6";

  const windowPosClass =
    cmsData?.position === "bottom-left" || cmsData?.floatingPosition === "bottom-left"
      ? "bottom-20 left-4 md:left-6"
      : "bottom-20 right-4 md:right-6";

  // Conversation History Limit
  const historyLimit = Number(cmsData?.conversationHistoryLength || cmsData?.maxHistoryLength) || 15;

  // Update welcome message on load or language change
  useEffect(() => {
    setMessages((prev) => {
      const userHasSentMessages = prev.some((m) => m.sender === "user");
      if (!userHasSentMessages) {
        return [
          {
            id: "welcome",
            sender: "bot",
            text: currentWelcomeMessage,
            timestamp: formatTime(),
          },
        ];
      }
      return prev;
    });
  }, [language, currentWelcomeMessage]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleMascotClick = () => {
    setHasInteracted(true);
    setShowSparkles(true);
    setHoverBubble(null);
    setTimeout(() => setShowSparkles(false), 1200);
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isThinking) return;

    setHasInteracted(true);
    setHoverBubble(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);

    const history = messages
      .filter((m) => m.id !== "welcome")
      .slice(-historyLimit)
      .map((m) => ({
        role: m.sender,
        text: m.text,
      }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: history,
          language: language,
          currentPage: path,
          cmsContext: cmsContextData,
          systemPrompt: cmsData?.systemPrompt || cmsData?.system_prompt,
          knowledgeBase: cmsData?.knowledgeBase || cmsData?.knowledge_base,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat server error");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I am here to help you with anything regarding Vivekanandha School!",
        timestamp: formatTime(),
        suggestedQuestions: data.suggestedQuestions || [],
        shouldEscalate: data.shouldEscalate || false,
        userPrompt: textToSend,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("V-Leo AI Error:", error);
      const botMessage: Message = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: language === "en"
          ? "I am currently processing requests. Please feel free to reach our admissions team directly at +91 94445 47474 for immediate guidance!"
          : "தற்போது தகவல்களை புதுப்பிக்கிறது. உடனடி சேர்க்கை தகவலுக்கு +91 94445 47474 எண்ணில் எங்களை அழைக்கவும்!",
        timestamp: formatTime(),
        shouldEscalate: true,
        userPrompt: textToSend,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  // Action: Copy Message Text
  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Action: Regenerate Response
  const handleRegenerate = (userPrompt?: string) => {
    if (userPrompt) {
      handleSendMessage(userPrompt);
    } else {
      // Find last user message
      const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
      if (lastUserMsg) {
        handleSendMessage(lastUserMsg.text);
      }
    }
  };

  // Action: Clear Chat
  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: currentWelcomeMessage,
        timestamp: formatTime(),
      },
    ]);
  };

  // Action: Submit Feedback
  const handleFeedbackClick = (msgId: string, type: "helpful" | "unhelpful") => {
    setActiveFeedbackMsgId(msgId);
    setFeedbackType(type);
    
    // Update local state immediately
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedbackSubmitted: type } : m))
    );

    // Save feedback doc in Firestore
    if (db) {
      const msgObj = messages.find((m) => m.id === msgId);
      addDoc(collection(db, "ai_feedback"), {
        messageId: msgId,
        userPrompt: msgObj?.userPrompt || "",
        botResponse: msgObj?.text || "",
        feedback: type,
        createdAt: serverTimestamp(),
        page: path,
      }).catch((e) => console.warn("Error saving AI feedback:", e));
    }
  };

  const handleSaveFeedbackComment = (msgId: string) => {
    if (!feedbackCommentText.trim()) {
      setActiveFeedbackMsgId(null);
      return;
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedbackComment: feedbackCommentText } : m))
    );

    if (db) {
      addDoc(collection(db, "ai_feedback"), {
        messageId: msgId,
        comment: feedbackCommentText,
        feedback: feedbackType,
        createdAt: serverTimestamp(),
      }).catch((e) => console.warn("Error saving AI feedback comment:", e));
    }

    setFeedbackCommentText("");
    setActiveFeedbackMsgId(null);
  };

  return (
    <div className={`fixed ${floatingPosClass} z-50 font-sans select-none pointer-events-auto`}>
      {/* Floating AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            role="dialog"
            aria-label={`${currentBotName} Assistant`}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed ${windowPosClass} flex flex-col bg-white border border-[#E6DCCF] shadow-[0_20px_60px_rgba(58,35,24,0.22)] overflow-hidden w-[calc(100vw-32px)] sm:w-[380px] md:w-[420px] h-[78vh] max-h-[640px] rounded-[28px]`}
          >
            {/* Glassmorphic Header */}
            <div
              style={{ backgroundColor: headerBgColor }}
              className="flex items-center justify-between px-5 h-[74px] backdrop-blur-md text-white shrink-0 border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                {/* Mascot Avatar */}
                <div className="relative flex items-center justify-center w-11 h-11 bg-white/10 rounded-full border border-white/20 shadow-inner overflow-hidden flex-shrink-0">
                  <img
                    src={headerAvatar}
                    alt={`${currentBotName} Mascot`}
                    loading="lazy"
                    decoding="async"
                    className="w-9 h-9 object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#4A2C21] rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[16px] tracking-tight text-[#FAF7F2]">
                      {currentBotName}
                    </span>
                    <span className="text-[10px] bg-[#25D366]/20 text-[#6CE5A3] px-2 py-0.5 rounded-full font-semibold border border-[#25D366]/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse"></span>
                      {currentStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D5C2B1] font-medium leading-none mt-0.5">
                    {currentSubtitle}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 hover:bg-white/15 rounded-full transition-colors cursor-pointer text-[#D5C2B1] hover:text-white"
                  title="Clear Chat / உரையாடலைத் துடைக்கவும்"
                  aria-label="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                  className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/15 text-[#FAF7F2] cursor-pointer"
                  title="Switch Language / மொழியை மாற்ற"
                  aria-label="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  <span>{currentLangBtnText}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/15 rounded-full transition-colors cursor-pointer text-[#D5C2B1] hover:text-white"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body & Messages Area */}
            <div
              style={{ backgroundColor: chatBgColor }}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-200"
            >
              {messages.map((msg, index) => {
                const isLastBotMsg =
                  msg.sender === "bot" &&
                  index === messages.length - 1 &&
                  msg.id !== "welcome";

                return (
                  <div key={msg.id} className="space-y-1.5">
                    <div
                      className={`flex items-start gap-2.5 ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Bot Avatar on Left */}
                      {msg.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-white border border-[#E6DCCF] flex items-center justify-center shadow-sm shrink-0 overflow-hidden mt-0.5">
                          <img
                            src={headerAvatar}
                            alt={currentBotName}
                            loading="lazy"
                            decoding="async"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      )}

                      <div
                        className={`group relative max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed shadow-sm ${
                          msg.sender === "user"
                            ? "text-white rounded-2xl rounded-tr-xs"
                            : "text-[#3A2318] border border-[#E6DCCF] rounded-2xl rounded-tl-xs"
                        }`}
                        style={{
                          backgroundColor:
                            msg.sender === "user" ? userBubbleBgColor : botBubbleBgColor,
                        }}
                      >
                        {/* Render Body using Markdown for Bot, plain text for User */}
                        {msg.sender === "bot" ? (
                          <div className="markdown-body space-y-2 select-text">
                            <Markdown
                              components={{
                                a: ({ node, ...props }) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#E78F68] underline font-semibold hover:text-[#4A2C21]"
                                  />
                                ),
                                ul: ({ node, ...props }) => (
                                  <ul {...props} className="list-disc list-inside space-y-1 my-1" />
                                ),
                                ol: ({ node, ...props }) => (
                                  <ol {...props} className="list-decimal list-inside space-y-1 my-1" />
                                ),
                                code: ({ node, ...props }) => (
                                  <code
                                    {...props}
                                    className="bg-[#F4EFE6] text-[#4A2C21] px-1.5 py-0.5 rounded font-mono text-xs border border-[#E6DCCF]"
                                  />
                                ),
                              }}
                            >
                              {msg.text}
                            </Markdown>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        )}

                        {/* Message Footer: Timestamp & Action Buttons */}
                        <div
                          className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[9.5px] font-medium ${
                            msg.sender === "user"
                              ? "border-white/20 text-white/80"
                              : "border-[#E6DCCF]/60 text-[#8C7A6B]"
                          }`}
                        >
                          <span>{msg.timestamp}</span>

                          {msg.sender === "bot" && (
                            <div className="flex items-center gap-1.5">
                              {/* Copy Button */}
                              <button
                                onClick={() => handleCopyMessage(msg.id, msg.text)}
                                className="p-1 hover:bg-black/5 rounded transition-colors cursor-pointer text-[#8C7A6B] hover:text-[#4A2C21]"
                                title="Copy Message"
                              >
                                {copiedMsgId === msg.id ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>

                              {/* Regenerate Button on Latest Bot Message */}
                              {isLastBotMsg && (
                                <button
                                  onClick={() => handleRegenerate(msg.userPrompt)}
                                  className="p-1 hover:bg-black/5 rounded transition-colors cursor-pointer text-[#8C7A6B] hover:text-[#4A2C21]"
                                  title="Regenerate Answer"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </button>
                              )}

                              {/* Feedback Rating */}
                              <button
                                onClick={() => handleFeedbackClick(msg.id, "helpful")}
                                className={`p-1 rounded transition-colors cursor-pointer ${
                                  msg.feedbackSubmitted === "helpful"
                                    ? "text-emerald-600 font-bold bg-emerald-50"
                                    : "text-[#8C7A6B] hover:text-emerald-600 hover:bg-black/5"
                                }`}
                                title="Helpful answer"
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleFeedbackClick(msg.id, "unhelpful")}
                                className={`p-1 rounded transition-colors cursor-pointer ${
                                  msg.feedbackSubmitted === "unhelpful"
                                    ? "text-rose-600 font-bold bg-rose-50"
                                    : "text-[#8C7A6B] hover:text-rose-600 hover:bg-black/5"
                                }`}
                                title="Not helpful"
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Optional Comment Input Box after rating */}
                        {activeFeedbackMsgId === msg.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-2.5 pt-2 border-t border-[#E6DCCF] space-y-1.5"
                          >
                            <p className="text-[10px] font-bold text-[#4A2C21]">
                              Thank you! Leave an optional comment:
                            </p>
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                value={feedbackCommentText}
                                onChange={(e) => setFeedbackCommentText(e.target.value)}
                                placeholder="How can we improve?"
                                className="flex-1 text-xs px-2.5 py-1 bg-[#FAF7F2] border border-[#E6DCCF] rounded-lg text-[#3A2318] focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveFeedbackComment(msg.id)}
                                className="text-xs bg-[#4A2C21] text-white px-2.5 py-1 rounded-lg font-medium cursor-pointer"
                              >
                                Send
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Suggested Follow-up Questions */}
                    {msg.sender === "bot" &&
                      msg.suggestedQuestions &&
                      msg.suggestedQuestions.length > 0 && (
                        <div className="flex flex-col gap-1.5 ml-10 mt-1">
                          {msg.suggestedQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(q)}
                              className="self-start text-xs text-[#4A2C21] hover:text-[#E78F68] bg-white hover:bg-[#F4EFE6] px-3.5 py-1.5 rounded-full border border-[#DED4C7] shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer text-left font-medium"
                            >
                              <CornerDownRight
                                className="w-3 h-3 shrink-0"
                                style={{ color: accentColor }}
                              />
                              <span>{q}</span>
                            </button>
                          ))}
                        </div>
                      )}

                    {/* Human Escalation Box */}
                    {msg.sender === "bot" && msg.shouldEscalate && (
                      <div className="ml-10 bg-white border border-amber-200 rounded-2xl p-3.5 space-y-2.5 mt-2 shadow-sm">
                        <div className="flex gap-2 text-[#3A2318]">
                          <AlertCircle
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: accentColor }}
                          />
                          <span className="text-xs font-semibold leading-normal">
                            {language === "en"
                              ? "Would you like to connect directly with our admissions desk?"
                              : "எங்கள் சேர்க்கை அலுவலகத்தை நேரடியாக தொடர்பு கொள்ள விரும்புகிறீர்களா?"}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          <a
                            href={`tel:${phoneVal.replace(/\s+/g, "")}`}
                            className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 bg-[#198C52] text-white hover:bg-[#157544] rounded-xl transition-all shadow-xs"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call Office</span>
                          </a>
                          <a
                            href={`https://wa.me/${whatsappVal.replace(/\D/g, "")}?text=Hi%20Vivekanandha%20School,%20I'm%20interested%20in%20admissions.`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded-xl transition-all shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${emailVal}`}
                            style={{ backgroundColor: headerBgColor }}
                            className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 text-white rounded-xl transition-all shadow-xs"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Email</span>
                          </a>
                          <a
                            href={mapsUrlVal}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 bg-[#3A2318] text-white hover:bg-[#2B1B13] rounded-xl transition-all shadow-xs"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Visit Campus</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mascot Thinking / Typing Indicator */}
              {isThinking && (
                <div className="flex items-start gap-2.5">
                  <motion.div
                    animate={{ rotate: [-4, 4, -4], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-8 h-8 rounded-full bg-white border border-[#E6DCCF] flex items-center justify-center shadow-sm shrink-0 overflow-hidden"
                  >
                    <img
                      src={headerAvatar}
                      alt="Thinking Mascot"
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 object-contain"
                    />
                  </motion.div>
                  <div className="bg-white border border-[#E6DCCF] rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#4A2C21]">
                      {currentBotName} is thinking
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ backgroundColor: accentColor, animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ backgroundColor: accentColor, animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ backgroundColor: accentColor, animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions / Quick Actions Bar */}
            <div className="bg-white border-t border-[#E6DCCF] px-4 py-2.5 shrink-0">
              <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#8C7A6B] mb-1.5 px-0.5">
                {language === "en" ? "Suggested Questions" : "விரைவு உதவி"}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
                {quickActionsList.map((act, idx) => {
                  const label = language === "ta" ? act.labelTa : act.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(act.query)}
                      className="shrink-0 text-[11.5px] font-bold bg-[#FAF7F2] hover:bg-[#E78F68] text-[#4A2C21] hover:text-white px-3.5 py-1.5 rounded-full border border-[#E6DCCF] shadow-2xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2 px-4 h-[64px] bg-white border-t border-[#E6DCCF] shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentInputPlaceholder}
                disabled={isThinking}
                className="flex-1 px-4 py-2 text-[13.5px] text-[#3A2318] placeholder-[#A39281] bg-[#FAF7F2] border border-[#E6DCCF] rounded-full focus:outline-none focus:border-[#4A2C21] focus:ring-1 focus:ring-[#4A2C21] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                aria-label="Send Message"
                style={{ backgroundColor: accentColor }}
                className="p-2.5 text-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm active:scale-95 hover:brightness-110"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Speech Bubble on Hover */}
      <AnimatePresence>
        {hoverBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-[80px] sm:bottom-[88px] right-0 bg-white/95 backdrop-blur-md text-[#3A2318] border border-[#E6DCCF] shadow-xl px-4 py-2.5 rounded-2xl text-[12.5px] font-bold whitespace-nowrap z-50 pointer-events-none flex items-center gap-2"
          >
            <span className="flex items-center gap-1.5">
              <span>{hoverBubble}</span>
            </span>
            <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
            <div className="absolute -bottom-1.5 right-7 sm:right-8 w-3 h-3 bg-white border-r border-b border-[#E6DCCF] rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles Burst */}
      <AnimatePresence>
        {showSparkles && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.4 }}
            exit={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-6 -left-6 pointer-events-none text-amber-400 z-50"
          >
            <Sparkles className="w-12 h-12 fill-current" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING LION EMBLEM LAUNCHER */}
      <motion.button
        onClick={handleMascotClick}
        animate={!isOpen ? { y: [0, -4, 0] } : { y: 0 }}
        transition={!isOpen ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : { duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Open ${currentBotName} Assistant`}
        style={{ backgroundColor: launcherBgColor }}
        className="group relative flex items-center justify-center w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] md:w-[78px] md:h-[78px] backdrop-blur-xl border-2 border-white/90 shadow-[0_12px_32px_rgba(74,44,33,0.18)] rounded-full p-2 cursor-pointer transition-all duration-300 hover:shadow-[0_16px_40px_rgba(234,179,8,0.28)] hover:border-amber-200/90"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative w-full h-full rounded-full border border-[#EAB308]/35 flex items-center justify-center p-1.5 bg-gradient-to-b from-white to-[#FFFDF9] shadow-inner overflow-hidden">
          <img
            src={launcherIcon}
            alt={`${currentBotName} Launcher Emblem`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-0.5 filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full shadow-xs">
          <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></span>
        </span>
      </motion.button>
    </div>
  );
}
