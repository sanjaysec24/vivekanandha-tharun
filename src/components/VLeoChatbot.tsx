import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Phone, Mail, Globe, CornerDownRight, Sparkles, AlertCircle, RefreshCcw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  shouldEscalate?: boolean;
}

const HOVER_BUBBLES = [
  "🦁 Need help?",
  "Ask V-Leo",
  "Admissions Assistant",
  "How can I help?",
];

export default function VLeoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hoverBubble, setHoverBubble] = useState<string | null>(null);
  const [showSparkles, setShowSparkles] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // English & Tamil localized text
  const t = {
    en: {
      botName: "🦁 V-Leo AI",
      subtitle: "Your School Companion",
      status: "Online",
      inputPlaceholder: "Ask V-Leo anything...",
      escalationText: "Would you like to connect directly with our admissions desk?",
      callSchool: "Call Admissions (+91 94445 47474)",
      whatsApp: "WhatsApp Admissions",
      sendEmail: "Send Email",
      quickActionsTitle: "Quick Actions",
      welcomeGreeting: `Hello 👋
I'm V-Leo, your AI School Companion.

I can help you with:
• Admissions
• School Fees
• Academics
• Transport
• Events
• Gallery
• Campus Visits
• School Timings
• General Questions`,
    },
    ta: {
      botName: "🦁 வி-லியோ AI",
      subtitle: "உங்கள் பள்ளி வழிகாட்டி",
      status: "ஆன்லைனில் உள்ளார்",
      inputPlaceholder: "வி-லியோவிடம் ஏதேனும் கேட்கவும்...",
      escalationText: "எங்கள் சேர்க்கை அலுவலகத்தை நேரடியாக தொடர்பு கொள்ள விரும்புகிறீர்களா?",
      callSchool: "பள்ளியை அழைக்க (+91 94445 47474)",
      whatsApp: "வாட்ஸ்அப் சேர்க்கை",
      sendEmail: "மின்னஞ்சல் அனுப்பவும்",
      quickActionsTitle: "விரைவு உதவி",
      welcomeGreeting: `வணக்கம் 👋
நான் வி-லியோ (V-Leo), விவேகானந்தா பள்ளியின் AI வழிகாட்டி.

நான் உங்களுக்கு பின்வருவனவற்றில் உதவ முடியும்:
• சேர்க்கை (Admissions)
• பள்ளி கட்டணம் (Fees)
• கல்வி முறை (Academics)
• பேருந்து வசதி (Transport)
• நிகழ்வுகள் (Events)
• புகைப்படங்கள் (Gallery)
• பள்ளி வருகை (Campus Visit)
• பள்ளி நேரம் (Timings)
• பொதுவான கேள்விகள்`,
    },
  };

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: t[language].welcomeGreeting,
        timestamp: formatTime(),
      },
    ]);
  }, [language]);

  // Scroll to bottom on new messages or thinking state
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  // Keyboard accessibility: ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-greeting trigger after ~45 seconds if user hasn't opened chat
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setHoverBubble("Admissions for 2027 are open! Need help?");
        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => {
          setHoverBubble(null);
        }, 5000);
        return () => clearTimeout(hideTimer);
      }
    }, 45000);

    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  const handleMascotClick = () => {
    setHasInteracted(true);
    setShowSparkles(true);
    setHoverBubble(null);

    setTimeout(() => {
      setShowSparkles(false);
    }, 1200);

    setIsOpen((prev) => !prev);
  };

  const handleMascotHover = () => {
    if (!isOpen && !hoverBubble) {
      const randomBubble = HOVER_BUBBLES[Math.floor(Math.random() * HOVER_BUBBLES.length)];
      setHoverBubble(randomBubble);
    }
  };

  const handleMascotLeave = () => {
    if (!hasInteracted) {
      setHoverBubble(null);
    }
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
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("V-Leo AI Error:", error);
      const botMessage: Message = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: language === "en"
          ? "I am currently processing requests. Please feel free to reach our admissions team directly at +91 94445 47474 for immediate guidance!"
          : "தற்போது உதவிக்குழு தகவல்களை புதுப்பிக்கிறது. உடனடி சேர்க்கை தகவலுக்கு +91 94445 47474 எண்ணில் எங்களை அழைக்கவும்!",
        timestamp: formatTime(),
        shouldEscalate: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const quickActions = [
    { label: "Admissions", labelTa: "சேர்க்கை", query: "Tell me about admission process and eligibility for 2027" },
    { label: "Fee Details", labelTa: "கட்டணம்", query: "What is the fee structure at Vivekanandha School?" },
    { label: "Academics", labelTa: "பாடத்திட்டம்", query: "What grades and curriculum do you offer?" },
    { label: "Events", labelTa: "நிகழ்வுகள்", query: "What are the upcoming events and celebrations?" },
    { label: "Transport", labelTa: "பேருந்து", query: "What are the school transport routes and facilities?" },
    { label: "Gallery", labelTa: "புகைப்படங்கள்", query: "Where can I view photos of campus activities?" },
    { label: "Book Visit", labelTa: "நேரில் வர", query: "How can I book a campus visit to Vivekanandha School?" },
    { label: "Contact Office", labelTa: "தொடர்பு", query: "What is the office address, phone number and email?" },
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 font-sans select-none pointer-events-auto">
      {/* Floating AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            role="dialog"
            aria-label="V-Leo AI Assistant"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 md:right-6 flex flex-col bg-white border border-[#E6DCCF] shadow-[0_20px_60px_rgba(58,35,24,0.22)] overflow-hidden w-[calc(100vw-32px)] sm:w-[380px] md:w-[420px] h-[78vh] max-h-[620px] rounded-[28px]"
          >
            {/* Glassmorphic Header */}
            <div className="flex items-center justify-between px-5 h-[74px] bg-[#4A2C21]/95 backdrop-blur-md text-white shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                {/* Mascot Avatar */}
                <div className="relative flex items-center justify-center w-11 h-11 bg-white/10 rounded-full border border-white/20 shadow-inner overflow-hidden flex-shrink-0">
                  <img
                    src="/images/vleo_mascot.png"
                    alt="V-Leo AI Mascot"
                    loading="lazy"
                    decoding="async"
                    className="w-9 h-9 object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#4A2C21] rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[16px] tracking-tight text-[#FAF7F2]">
                      {t[language].botName}
                    </span>
                    <span className="text-[10px] bg-[#25D366]/20 text-[#6CE5A3] px-2 py-0.5 rounded-full font-semibold border border-[#25D366]/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse"></span>
                      {t[language].status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D5C2B1] font-medium leading-none mt-0.5">
                    {t[language].subtitle}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                  className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/15 text-[#FAF7F2] cursor-pointer"
                  title="Switch Language / மொழியை மாற்ற"
                  aria-label="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#E78F68]" />
                  <span>{language === "en" ? "தமிழ்" : "EN"}</span>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2] scrollbar-thin scrollbar-thumb-amber-200">
              {messages.map((msg) => (
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
                          src="/images/vleo_mascot.png"
                          alt="V-Leo"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-4 py-3 text-[13.5px] leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#E78F68] text-white rounded-2xl rounded-tr-xs"
                          : "bg-white text-[#3A2318] border border-[#E6DCCF] rounded-2xl rounded-tl-xs"
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.text}
                      <div
                        className={`text-[9px] mt-1.5 text-right font-medium ${
                          msg.sender === "user" ? "text-white/80" : "text-[#8C7A6B]"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Suggested Follow-up Questions */}
                  {msg.sender === "bot" && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-col gap-1.5 ml-10 mt-1">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="self-start text-xs text-[#4A2C21] hover:text-[#E78F68] bg-white hover:bg-[#F4EFE6] px-3.5 py-1.5 rounded-full border border-[#DED4C7] shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer text-left font-medium"
                        >
                          <CornerDownRight className="w-3 h-3 text-[#E78F68] shrink-0" />
                          <span>{q}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Human Escalation Box */}
                  {msg.sender === "bot" && msg.shouldEscalate && (
                    <div className="ml-10 bg-white border border-amber-200 rounded-2xl p-3.5 space-y-2.5 mt-2 shadow-sm">
                      <div className="flex gap-2 text-[#3A2318]">
                        <AlertCircle className="w-4 h-4 text-[#E78F68] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold leading-normal">
                          {t[language].escalationText}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        <a
                          href="tel:+919444547474"
                          className="flex items-center justify-center gap-2 text-xs font-bold py-2 bg-[#198C52] text-white hover:bg-[#157544] rounded-xl transition-all shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{t[language].callSchool}</span>
                        </a>
                        <a
                          href="https://wa.me/919444547474?text=Hi%20Vivekanandha%20School,%20I'm%20interested%20in%20admissions."
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 text-xs font-bold py-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded-xl transition-all shadow-xs"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.022-.08-.117-.146-.217-.196-.1-.05-1.29-.636-1.49-.71-.2-.073-.346-.11-.493.11-.147.217-.57.712-.697.857-.127.145-.255.163-.455.063-.2-.1-1.32-.487-2.518-1.556-.93-.83-1.558-1.854-1.74-2.164-.18-.312-.02-.48.136-.636.14-.14.31-.363.466-.546.155-.18.21-.31.31-.518.1-.2.05-.38-.027-.54-.078-.16-.697-1.68-.957-2.3-.25-.6-.54-.515-.744-.526-.193-.012-.416-.014-.638-.014-.22 0-.58.08-.884.41-.304.33-1.162 1.14-1.162 2.78 0 1.64 1.192 3.223 1.356 3.44.163.22 2.348 3.585 5.69 5.03.793.344 1.413.548 1.898.703.796.254 1.52.218 2.09.133.636-.093 1.956-.8 2.232-1.57.275-.773.275-1.436.193-1.57-.08-.135-.255-.21-.453-.314zm-5.467 6.467h-.01c-1.805 0-3.574-.485-5.12-1.4l-.368-.218-3.805.998.1015-3.708-.24-.383C1.65 14.59 1.124 12.8 1.124 10.95c0-4.897 3.987-8.88 8.887-8.88 2.37 0 4.6 1.0 6.275 2.68 1.67 1.68 2.59 3.91 2.59 6.28 0 4.9-3.99 8.88-8.89 8.88zm8.88-18.36C18.665.55 15.11 0 11.003 0 4.933 0 .01 4.922.01 10.943c0 1.927.502 3.808 1.458 5.485L0 24l7.74-2.03c1.61.88 3.41 1.34 5.25 1.34 6.07 0 11-4.93 11-10.95 0-2.91-1.14-5.65-3.21-7.72z" />
                          </svg>
                          <span>{t[language].whatsApp}</span>
                        </a>
                        <a
                          href="mailto:admissions@vivekanandhaschool.edu.in"
                          className="flex items-center justify-center gap-2 text-xs font-bold py-2 bg-[#4A2C21] text-white hover:bg-[#321E16] rounded-xl transition-all shadow-xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{t[language].sendEmail}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Mascot Thinking State */}
              {isThinking && (
                <div className="flex items-start gap-2.5">
                  <motion.div
                    animate={{ rotate: [-4, 4, -4], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-8 h-8 rounded-full bg-white border border-[#E6DCCF] flex items-center justify-center shadow-sm shrink-0 overflow-hidden"
                  >
                    <img
                      src="/images/vleo_mascot.png"
                      alt="Thinking Mascot"
                      className="w-6 h-6 object-contain"
                    />
                  </motion.div>
                  <div className="bg-white border border-[#E6DCCF] rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#4A2C21]">V-Leo is thinking</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#E78F68] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-[#E78F68] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-[#E78F68] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white border-t border-[#E6DCCF] px-4 py-2.5 shrink-0">
              <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#8C7A6B] mb-2 px-0.5">
                {t[language].quickActionsTitle}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
                {quickActions.map((act, idx) => {
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
                placeholder={t[language].inputPlaceholder}
                disabled={isThinking}
                className="flex-1 px-4 py-2 text-[13.5px] text-[#3A2318] placeholder-[#A39281] bg-[#FAF7F2] border border-[#E6DCCF] rounded-full focus:outline-none focus:border-[#4A2C21] focus:ring-1 focus:ring-[#4A2C21] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                aria-label="Send Message"
                className="p-2.5 bg-[#4A2C21] hover:bg-[#E78F68] text-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Speech Bubble on Hover or Auto-Greeting */}
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
            {/* Pointer arrow */}
            <div className="absolute -bottom-1.5 right-7 sm:right-8 w-3 h-3 bg-white border-r border-b border-[#E6DCCF] rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles Burst on Click */}
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
        onMouseEnter={handleMascotHover}
        onMouseLeave={handleMascotLeave}
        animate={
          !isOpen
            ? { y: [0, -4, 0] }
            : { y: 0 }
        }
        transition={
          !isOpen
            ? { repeat: Infinity, duration: 4, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open V-Leo AI Assistant"
        className="group relative flex items-center justify-center w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] md:w-[78px] md:h-[78px] bg-white/90 backdrop-blur-xl border-2 border-white/90 shadow-[0_12px_32px_rgba(74,44,33,0.18)] rounded-full p-2 cursor-pointer transition-all duration-300 hover:shadow-[0_16px_40px_rgba(234,179,8,0.28)] hover:border-amber-200/90"
      >
        {/* Soft Golden Ambient Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 via-orange-300/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Inner Gold Accent Ring */}
        <div className="relative w-full h-full rounded-full border border-[#EAB308]/35 flex items-center justify-center p-1.5 bg-gradient-to-b from-white to-[#FFFDF9] shadow-inner overflow-hidden">
          {/* Centered School Lion Emblem Icon */}
          <img
            src="/images/vleo_mascot.png"
            alt="Vivekanandha School Lion Emblem"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-0.5 filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Status Indicator Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full shadow-xs">
          <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></span>
        </span>
      </motion.button>
    </div>
  );
}

