import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Phone, Mail, ArrowRight, Globe, CornerDownRight, Check, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  shouldEscalate?: boolean;
}

export default function VLeoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1); // Start with 1 unread for the initial welcome
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // English & Tamil localized text
  const t = {
    en: {
      botName: "V-Leo Bot",
      subtitle: "Vivekanandha School Assistant",
      status: "Online",
      inputPlaceholder: "Type your query here...",
      escalationText: "Would you like to connect with our admissions office?",
      callSchool: "Call School",
      whatsApp: "WhatsApp Admissions",
      sendEmail: "Send Email",
      quickActionsTitle: "Quick Actions",
      howToHelp: "How may I assist you today?",
      greeting: `Vanakkam! 🦁
I am V-Leo Bot, the official assistant of Vivekanandha School.

I can help you with:
• Admissions
• Fee enquiries
• Class information
• School timings
• Transport facilities
• Activities and events

How may I assist you today?`,
    },
    ta: {
      botName: "வி-லியோ பாட்",
      subtitle: "விவேகானந்தா பள்ளி உதவியாளர்",
      status: "ஆன்லைனில் உள்ளார்",
      inputPlaceholder: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...",
      escalationText: "எங்கள் சேர்க்கை அலுவலகத்துடன் தொடர்பு கொள்ள விரும்புகிறீர்களா?",
      callSchool: "பள்ளியை அழைக்கவும்",
      whatsApp: "வாட்ஸ்அப் சேர்க்கை",
      sendEmail: "மின்னஞ்சல் அனுப்பவும்",
      quickActionsTitle: "விரைவான கேள்விகள்",
      howToHelp: "நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?",
      greeting: `வணக்கம்! 🦁
நான் வி-லியோ பாட் (V-Leo Bot), விவேகானந்தா பள்ளியின் அதிகாரப்பூர்வ உதவியாளர்.

நான் உங்களுக்கு பின்வருவனவற்றில் உதவ முடியும்:
• சேர்க்கை விவரங்கள் (Admissions)
• கட்டண விசாரணைகள் (Fee enquiries)
• வகுப்பு தகவல்கள் (Class information)
• பள்ளி வேலை நேரங்கள் (School timings)
• போக்குவரத்து வசதிகள் (Transport facilities)
• செயல்பாடுகள் மற்றும் நிகழ்வுகள் (Activities)

இன்று நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்?`,
    },
  };

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: t[language].greeting,
        timestamp: formatTime(),
      },
    ]);
  }, [language]);

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Prepare message history formatted for Gemini endpoint
    const history = messages
      .filter((m) => m.id !== "welcome") // ignore static welcome in history to save payload
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
        throw new Error("Failed to contact V-Leo Bot server");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I am here to help you!",
        timestamp: formatTime(),
        suggestedQuestions: data.suggestedQuestions || [],
        shouldEscalate: data.shouldEscalate || false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      // Fallback message
      const botMessage: Message = {
        id: `bot-error-${Date.now()}`,
        sender: "bot",
        text: language === "en" 
          ? "I am currently processing requests. Feel free to contact our admissions desk directly at +91 94445 47474 for immediate help!"
          : "தற்போது என்னால் பதிலளிக்க இயலவில்லை. உடனடி உதவிக்கு தயவுசெய்து எங்களை +91 94445 47474 என்ற எண்ணில் தொடர்பு கொள்ளவும்!",
        timestamp: formatTime(),
        shouldEscalate: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (questionText: string, localizedDisplay: string) => {
    // Send standard English keyword or exact query to bot so it gets processed optimally
    handleSendMessage(localizedDisplay);
  };

  const quickQuestions = [
    { label: "📝 Apply for Admission", labelTa: "📝 சேர்க்கை விண்ணப்பம்", query: "How do I apply for admission?" },
    { label: "💰 Fee Structure", labelTa: "💰 பள்ளி கட்டண விவரம்", query: "What is the fee structure?" },
    { label: "🏫 About Vivekanandha School", labelTa: "🏫 பள்ளி வரலாறு", query: "Tell me about Vivekanandha School history and vision." },
    { label: "🚌 Transport Facilities", labelTa: "🚌 போக்குவரத்து வசதிகள்", query: "What transport facilities are available?" },
    { label: "📚 Academic Programs", labelTa: "📚 கல்விப் பாடத்திட்டம்", query: "What academic programs and classes do you offer?" },
    { label: "🎨 Activities and Events", labelTa: "🎨 விளையாட்டு & நிகழ்வுகள்", query: "What extracurricular activities and school events do you have?" },
    { label: "📅 Book Campus Visit", labelTa: "📅 நேரில் பார்வையிட பதிவு செய்ய", query: "I would like to book a campus visit." },
    { label: "📞 Contact School", labelTa: "📞 தொடர்புகொள்ள", query: "What is the contact information of the school?" },
    { label: "🌸 Vijayadasami Admissions", labelTa: "🌸 விஜயதசமி சேர்க்கை", query: "Tell me about Vijayadasami Admissions." },
    { label: "📍 School Location", labelTa: "📍 பள்ளி அமைவிடம்", query: "Where is the school located and how to get there?" }
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 font-sans select-none pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 md:relative md:bottom-auto md:right-auto flex flex-col bg-[#FAF7F2] border-[1.5px] border-[#E6DCCF] shadow-xl overflow-hidden md:mb-4 w-[92vw] h-[78vh] md:w-[380px] md:h-[560px] rounded-[28px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-[72px] min-h-[72px] bg-[#4A2C21] text-white shrink-0">
              <div className="flex items-center gap-3">
                {/* V-Leo Mascot Avatar */}
                <div className="relative flex items-center justify-center w-11 h-11 bg-[#F8EFE4] rounded-full border border-[#D5C2B1] shadow-inner text-2xl">
                  🦁
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#198C52] border-2 border-[#4A2C21] rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[15px] tracking-wide text-[#F9EFE4]">
                      {t[language].botName}
                    </span>
                    <span className="text-[10px] bg-[#198C52]/30 text-[#6CE5A3] px-1.5 py-0.5 rounded-full font-medium border border-[#198C52]/50 flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#49E391] rounded-full animate-ping"></span>
                      {t[language].status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D5C2B1] font-light leading-none mt-0.5">
                    {t[language].subtitle}
                  </p>
                </div>
              </div>

              {/* Language Selector + Close */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10 text-[#F9EFE4] cursor-pointer"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#E78F68]" />
                  <span>{language === "en" ? "தமிழ்" : "EN"}</span>
                </button>
                <button
                  onClick={handleOpenToggle}
                  className="p-1.5 hover:bg-white/15 rounded-full transition-colors cursor-pointer text-[#D5C2B1] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body & Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-200">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#4A2C21] text-white rounded-t-2xl rounded-bl-2xl rounded-br-[4px]"
                          : "bg-white text-[#3A2318] border border-[#E6DCCF] rounded-t-2xl rounded-br-2xl rounded-bl-[4px]"
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {msg.text}
                      <div
                        className={`text-[9px] mt-1.5 text-right ${
                          msg.sender === "user" ? "text-white/60" : "text-[#8C7A6B]"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Render Suggested Follow-up Questions */}
                  {msg.sender === "bot" && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-col gap-1.5 ml-2 mt-1">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="self-start text-xs text-[#4A2C21] hover:text-[#E78F68] bg-[#F4EFE6] hover:bg-[#EBDCC8] px-3 py-1.5 rounded-full border border-[#DED4C7] transition-all flex items-center gap-1 cursor-pointer text-left font-medium"
                        >
                          <CornerDownRight className="w-3 h-3 text-[#E78F68] shrink-0" />
                          <span>{q}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Human Escalation options */}
                  {msg.sender === "bot" && msg.shouldEscalate && (
                    <div className="bg-white border-[1.5px] border-amber-200 rounded-2xl p-3.5 space-y-3 mt-2 shadow-sm">
                      <div className="flex gap-2 text-[#3A2318]">
                        <AlertCircle className="w-4 h-4 text-[#E78F68] shrink-0 mt-0.5" />
                        <span className="text-xs font-medium leading-normal">
                          {t[language].escalationText}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <a
                          href="tel:+919444547474"
                          className="flex items-center justify-center gap-2 text-xs font-semibold py-2 bg-[#198C52] text-white hover:bg-[#157544] rounded-xl transition-all shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{t[language].callSchool} (+91 94445)</span>
                        </a>
                        <a
                          href="https://wa.me/919444547474?text=Hi%20Vivekanandha%20School%20Admissions%20Office,%20I'm%20interested%20in%20admission."
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 text-xs font-semibold py-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded-xl transition-all shadow-sm"
                        >
                          {/* Beautiful Custom WhatsApp Circle indicator/icon */}
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.022-.08-.117-.146-.217-.196-.1-.05-1.29-.636-1.49-.71-.2-.073-.346-.11-.493.11-.147.217-.57.712-.697.857-.127.145-.255.163-.455.063-.2-.1-1.32-.487-2.518-1.556-.93-.83-1.558-1.854-1.74-2.164-.18-.312-.02-.48.136-.636.14-.14.31-.363.466-.546.155-.18.21-.31.31-.518.1-.2.05-.38-.027-.54-.078-.16-.697-1.68-.957-2.3-.25-.6-.54-.515-.744-.526-.193-.012-.416-.014-.638-.014-.22 0-.58.08-.884.41-.304.33-1.162 1.14-1.162 2.78 0 1.64 1.192 3.223 1.356 3.44.163.22 2.348 3.585 5.69 5.03.793.344 1.413.548 1.898.703.796.254 1.52.218 2.09.133.636-.093 1.956-.8 2.232-1.57.275-.773.275-1.436.193-1.57-.08-.135-.255-.21-.453-.314zm-5.467 6.467h-.01c-1.805 0-3.574-.485-5.12-1.4l-.368-.218-3.805.998.1015-3.708-.24-.383C1.65 14.59 1.124 12.8 1.124 10.95c0-4.897 3.987-8.88 8.887-8.88 2.37 0 4.6 1.0 6.275 2.68 1.67 1.68 2.59 3.91 2.59 6.28 0 4.9-3.99 8.88-8.89 8.88zm8.88-18.36C18.665.55 15.11 0 11.003 0 4.933 0 .01 4.922.01 10.943c0 1.927.502 3.808 1.458 5.485L0 24l7.74-2.03c1.61.88 3.41 1.34 5.25 1.34 6.07 0 11-4.93 11-10.95 0-2.91-1.14-5.65-3.21-7.72z" />
                          </svg>
                          <span>{t[language].whatsApp}</span>
                        </a>
                        <a
                          href="mailto:admissions@vivekanandhaschool.edu.in"
                          className="flex items-center justify-center gap-2 text-xs font-semibold py-2 bg-[#4A2C21] text-white hover:bg-[#321E16] rounded-xl transition-all shadow-sm border border-[#E6DCCF]/25"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{t[language].sendEmail}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Bot typing loader animation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E6DCCF] rounded-t-2xl rounded-br-2xl rounded-bl-[4px] px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#4A2C21] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-[#4A2C21] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-[#4A2C21] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Panel (Collapsible/Scrollable) */}
            <div className="bg-[#FAF7F2] border-t border-[#E6DCCF] px-4 py-2.5 shrink-0">
              <p className="text-[10px] font-bold tracking-wider uppercase text-[#8C7A6B] mb-1.5 px-0.5">
                {t[language].quickActionsTitle}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
                {quickQuestions.map((q, idx) => {
                  const displayLabel = language === "ta" ? q.labelTa : q.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(q.query, displayLabel)}
                      className="shrink-0 text-[11px] font-medium bg-white hover:bg-[#F4EFE6] text-[#4A2C21] px-3 py-1.5 rounded-full border border-[#DED4C7] shadow-sm hover:border-[#4A2C21]/30 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {displayLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2 px-4 h-[64px] min-h-[64px] bg-white border-t border-[#E6DCCF] shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t[language].inputPlaceholder}
                disabled={isTyping}
                className="flex-1 px-4 py-2 text-[13.5px] text-[#3A2318] placeholder-[#A39281] bg-[#FAF7F2] border border-[#E6DCCF] rounded-full focus:outline-none focus:border-[#4A2C21] focus:ring-1 focus:ring-[#4A2C21] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-[#4A2C21] hover:bg-[#321E16] text-[#F9EFE4] rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher trigger widget */}
      <button
        onClick={handleOpenToggle}
        className={`group relative items-center justify-center w-16 h-16 md:w-14 md:h-14 bg-[#4A2C21] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#E6DCCF]/20 ${
          isOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-[#F9EFE4]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              {/* Lion Emoji as the mascot launcher */}
              <span className="text-3xl filter drop-shadow">🦁</span>
              
              {/* Active Online indicator badge on launcher */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#198C52] rounded-full border-2 border-[#FAF7F2]"></span>

              {/* Unread notification count badge */}
              {unreadCount > 0 && (
                <span className="absolute -bottom-1 -left-1 bg-[#E78F68] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2] shadow animate-bounce">
                  {unreadCount}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover tooltips */}
        {!isOpen && (
          <span className="absolute right-16 bg-[#4A2C21] text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-[#E6DCCF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
            Chat with V-Leo! 🦁
          </span>
        )}
      </button>
    </div>
  );
}
