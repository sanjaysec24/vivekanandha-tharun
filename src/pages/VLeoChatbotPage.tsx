import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Plus, ArrowLeft, MoreVertical, Copy, Check, CheckCheck, 
  Globe, RotateCcw, Phone, X, Sparkles
} from 'lucide-react';
import Markdown from 'react-markdown';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from '../lib/router';
import { Message, ChatbotCMSData } from '../components/VLeoChatbot';
import ChatDoodlePattern from '../components/ChatDoodlePattern';

const DEFAULT_SUGGESTIONS_EN = [
  'Admissions',
  'Fee Details',
  'School Timings',
  'Campus Visit',
];

const DEFAULT_SUGGESTIONS_TA = [
  'சேர்க்கை விவரங்கள்',
  'கட்டண விவரம்',
  'பள்ளி நேரம்',
  'வளாகப் பார்வை',
];

const QUICK_MENU_TOPICS_EN = [
  { label: 'Admissions 2027', query: 'Tell me about the admission process and eligibility for 2027.' },
  { label: 'Fee Details', query: 'What is the fee structure at Vivekanandha School?' },
  { label: 'School Timings', query: 'What are the daily school hours and working days?' },
  { label: 'Campus Visit', query: 'How can I schedule a campus visit to Vivekanandha School?' },
  { label: 'Transport Routes', query: 'What are the school transport bus routes and safety facilities?' },
  { label: 'Academic Curriculum', query: 'What curriculum and grades are offered at Vivekanandha School?' },
];

const QUICK_MENU_TOPICS_TA = [
  { label: '2027 சேர்க்கை', query: '2027 சேர்க்கை நடைமுறை மற்றும் தகுதிகள் பற்றி சொல்லுங்கள்.' },
  { label: 'கட்டண விவரம்', query: 'விவேகானந்தா பள்ளியின் கட்டண விவரங்கள் என்ன?' },
  { label: 'பள்ளி நேரம்', query: 'பள்ளியின் தினசரி வேலை நேரம் மற்றும் விடுமுறை நாட்கள் என்ன?' },
  { label: 'வளாகப் பார்வை', query: 'பள்ளி வளாகத்தை நேரில் பார்வையிட எவ்வாறு முன்பதிவு செய்வது?' },
  { label: 'பேருந்து வசதி', query: 'பள்ளி பேருந்து வழித்தடங்கள் மற்றும் வசதிகள் என்ன?' },
  { label: 'பாடத்திட்டம்', query: 'பள்ளியில் கற்பிக்கப்படும் பாடத்திட்டம் மற்றும் வகுப்புகள் என்ன?' },
];

export default function VLeoChatbotPage() {
  const { navigate, path } = useRouter();
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // CMS Settings & Live Context
  const [cmsAiSettings, setCmsAiSettings] = useState<ChatbotCMSData | null>(null);
  const [cmsChatbotSettings, setCmsChatbotSettings] = useState<ChatbotCMSData | null>(null);
  const [cmsContextData, setCmsContextData] = useState<Record<string, any>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const createWelcomeMessage = (lang: 'en' | 'ta'): Message => ({
    id: 'welcome-msg',
    sender: 'bot',
    text: lang === 'en'
      ? "Hi! I'm V-Leo 👋\n\nHow can I help you today?"
      : "வணக்கம்! நான் வி-லியோ 👋\n\nஇன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    timestamp: formatTime(),
    suggestedQuestions: lang === 'en' ? DEFAULT_SUGGESTIONS_EN : DEFAULT_SUGGESTIONS_TA,
  });

  // Initialize with the standard V-Leo welcome message at the top of the conversation
  const [messages, setMessages] = useState<Message[]>([createWelcomeMessage('en')]);

  // Subscribe to CMS settings
  useEffect(() => {
    if (!db) return;

    const unsubAi = onSnapshot(doc(db, 'website_cms', 'ai'), (docSnap) => {
      if (docSnap.exists()) setCmsAiSettings(docSnap.data() as ChatbotCMSData);
    });

    const unsubChatbot = onSnapshot(doc(db, 'website_cms', 'chatbot'), (docSnap) => {
      if (docSnap.exists()) setCmsChatbotSettings(docSnap.data() as ChatbotCMSData);
    });

    const sectionsToListen = ['branding', 'hero', 'promotions', 'contact', 'admissions'];
    const unsubs = sectionsToListen.map((sec) =>
      onSnapshot(doc(db, 'website_cms', sec), (snap) => {
        if (snap.exists()) {
          setCmsContextData((prev) => ({ ...prev, [sec]: snap.data() }));
        }
      })
    );

    return () => {
      unsubAi();
      unsubChatbot();
      unsubs.forEach((u) => u());
    };
  }, []);

  const cmsData: ChatbotCMSData = {
    ...cmsChatbotSettings,
    ...cmsAiSettings,
  };

  // Dedicated V-Leo Chat Avatar (strictly separated from the floating website launcher artwork)
  const defaultChatAvatar = '/images/vleo_chat_avatar.svg';
  const chatAvatar =
    cmsData?.chatAvatarUrl ||
    cmsData?.chatbotAvatar ||
    cmsData?.avatarUrl ||
    cmsData?.avatar ||
    defaultChatAvatar;

  const botNameEn = cmsData?.assistantName || cmsData?.botName || 'V-Leo AI';
  const botNameTa = cmsData?.assistantNameTa || 'வி-லியோ AI';
  const currentBotName = language === 'en' ? botNameEn : botNameTa;

  // Close header menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Auto-scroll chat area on new message or thinking status
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Listen for initial query passed from home page / help chips
  useEffect(() => {
    try {
      const initial = sessionStorage.getItem('vleo_initial_query');
      if (initial) {
        sessionStorage.removeItem('vleo_initial_query');
        handleSendMessage(initial);
      }
    } catch (_) {}
  }, []);

  // Auto-resize composer input textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // Language switch handler
  const handleLanguageToggle = () => {
    const nextLang = language === 'en' ? 'ta' : 'en';
    setLanguage(nextLang);
    // If only the welcome message exists, update it to the target language
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [createWelcomeMessage(nextLang)];
      }
      return prev;
    });
  };

  const handleSendMessage = async (textToSend: string) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isThinking) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cleanText,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setShowQuickMenu(false);
    setIsThinking(true);

    const historyLimit = Number(cmsData?.conversationHistoryLength) || 15;
    const history = messages
      .filter((m) => m.id !== 'welcome-msg')
      .slice(-historyLimit)
      .map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

    try {
      let response: Response;
      try {
        response = await fetch('/api/vleo/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: cleanText,
            history,
            language,
            currentPage: path,
            cmsContext: cmsContextData,
            systemPrompt: cmsData?.systemPrompt || cmsData?.system_prompt,
            knowledgeBase: cmsData?.knowledgeBase || cmsData?.knowledge_base,
          }),
        });
      } catch {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: cleanText,
            history,
            language,
            currentPage: path,
            cmsContext: cmsContextData,
            systemPrompt: cmsData?.systemPrompt || cmsData?.system_prompt,
            knowledgeBase: cmsData?.knowledgeBase || cmsData?.knowledge_base,
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`Chat response status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || (language === 'en' ? 'I am here to help you!' : 'நான் உங்களுக்கு உதவ தயாராக உள்ளேன்!'),
        timestamp: formatTime(),
        suggestedQuestions: data.suggestedQuestions || [],
        shouldEscalate: data.shouldEscalate || false,
        userPrompt: cleanText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('V-Leo Chat Error:', err);
      const botMessage: Message = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: language === 'en'
          ? 'I am temporarily unable to reach the school server. Please reach our admissions office directly at **+91 94445 47474**.'
          : 'பள்ளி சேவையை தற்போது தொடர்பு கொள்ள முடியவில்லை. தயவுசெய்து **+91 94445 47474** என்ற எண்ணில் பள்ளி அலுவலகத்தை தொடர்பு கொள்ளவும்.',
        timestamp: formatTime(),
        shouldEscalate: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleRestartChat = () => {
    setMessages([createWelcomeMessage(language)]);
    setIsMenuOpen(false);
  };

  const quickTopics = language === 'en' ? QUICK_MENU_TOPICS_EN : QUICK_MENU_TOPICS_TA;

  return (
    <div className="h-dvh w-full flex flex-col bg-[#F3ECE4] text-[#2C1810] font-sans overflow-hidden">
      {/* Centered chat workspace for desktop / full width on mobile */}
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col bg-[#FAF5EE] shadow-2xl sm:border-x sm:border-[#E8DFD5] overflow-hidden relative">

        {/* ━━━━━━━━━━━━━━━━━━━━
            2. TOP CHAT HEADER
            ━━━━━━━━━━━━━━━━━━━━ */}
        <header className="bg-[#422A21] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-xs z-30 shrink-0 select-none border-b border-[#352018]">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* [ ← ] Back button */}
            <button
              onClick={() => navigate('/')}
              aria-label="Back to website"
              className="p-1 -ml-1 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* [ V-Leo avatar ] */}
            <div className="relative w-9 h-9 rounded-full bg-white p-1 shrink-0 shadow-xs border border-white/20 overflow-hidden">
              <img
                src={chatAvatar}
                alt="V-Leo Robot Avatar"
                className="w-full h-full object-contain"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#422A21]" />
            </div>

            {/* [ V-Leo AI ] + Online status */}
            <div className="min-w-0 leading-tight">
              <h1 className="text-sm font-bold text-white truncate">
                {currentBotName}
              </h1>
              <p className="text-[11px] text-[#A7F3D0] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{language === 'en' ? 'Online' : 'இணைப்பில் உள்ளது'}</span>
              </p>
            </div>
          </div>

          {/* Right side: [ Tamil / English ] [ ⋮ ] */}
          <div className="flex items-center gap-1.5 shrink-0 relative" ref={menuRef}>
            <button
              onClick={handleLanguageToggle}
              title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
              className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5EE] border border-white/15 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#E58B52]" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Menu options"
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* Options Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-48 bg-white text-[#3E2723] rounded-2xl shadow-xl border border-[#E8DFD5] py-1.5 z-40 text-xs">
                <button
                  onClick={() => {
                    handleLanguageToggle();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#FAF5EE] flex items-center gap-2 cursor-pointer text-[#422A21]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#E58B52]" />
                  <span>{language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}</span>
                </button>
                <button
                  onClick={handleRestartChat}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#FAF5EE] flex items-center gap-2 cursor-pointer text-[#422A21]"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#8C7A6B]" />
                  <span>{language === 'en' ? 'Restart Chat' : 'புதிய உரையாடல்'}</span>
                </button>
                <div className="border-t border-[#E8DFD5] my-1" />
                <a
                  href="tel:+919444547474"
                  className="w-full text-left px-3.5 py-2 hover:bg-[#FAF5EE] flex items-center gap-2 text-[#422A21]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{language === 'en' ? 'Call Admissions' : 'பள்ளி அலுவலகம்'}</span>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* ━━━━━━━━━━━━━━━━━━━━
            3, 4, 5, 7. CHAT AREA & MESSAGES
            ━━━━━━━━━━━━━━━━━━━━ */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 bg-[#FAF5EE] relative">
          {/* Low-opacity educational doodle pattern strictly in conversation area */}
          <ChatDoodlePattern />

          <div className="relative z-10 space-y-3">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div
                    className={`flex items-end gap-1.5 max-w-[88%] sm:max-w-[80%] ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Small dedicated avatar alongside V-Leo messages */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-[#E8DFD5] shadow-2xs shrink-0 mb-0.5 overflow-hidden">
                        <img
                          src={chatAvatar}
                          alt="V-Leo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`relative px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-2xs select-text ${
                        isUser
                          ? 'bg-[#E58B52] text-white rounded-br-xs'
                          : 'bg-white text-[#2C1810] border border-[#E8DFD5] rounded-bl-xs'
                      }`}
                    >
                      {isUser ? (
                        <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                      ) : (
                        <div className="space-y-1.5 select-text break-words">
                          <Markdown
                            components={{
                              a: ({ node, ...props }) => (
                                <a
                                  {...props}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#E58B52] underline font-semibold hover:text-[#422A21]"
                                />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul {...props} className="list-disc list-inside space-y-1 my-1" />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol {...props} className="list-decimal list-inside space-y-1 my-1" />
                              ),
                              p: ({ node, ...props }) => (
                                <p {...props} className="my-1 leading-relaxed" />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong {...props} className="font-bold text-[#422A21]" />
                              ),
                            }}
                          >
                            {msg.text}
                          </Markdown>
                        </div>
                      )}

                      {/* Small timestamp + status checkmark */}
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] select-none ${
                          isUser ? 'text-white/80' : 'text-[#A08E7E]'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-white/90" />}
                        {!isUser && (
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            title="Copy"
                            className="hover:text-[#422A21] transition-colors p-0.5 ml-1 cursor-pointer"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Compact Quick-Question Chips beneath V-Leo message */}
                  {!isUser && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 ml-8 mt-1">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-[12px] text-[#422A21] bg-white hover:bg-[#FFF4EC] active:bg-[#FBECE0] border border-[#E8DFD5] hover:border-[#E58B52] px-3 py-1.5 rounded-full transition-all text-left shadow-2xs active:scale-95 cursor-pointer font-medium"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Escalation contact button if needed */}
                  {!isUser && msg.shouldEscalate && (
                    <div className="ml-8 mt-1 inline-flex items-center gap-2 bg-[#FFF6EE] border border-[#E58B52]/40 rounded-xl px-3 py-1.5 text-xs text-[#422A21] shadow-2xs">
                      <span className="font-semibold text-[11px]">📞 Need direct assistance?</span>
                      <a
                        href="tel:+919444547474"
                        className="font-bold text-[#E58B52] hover:underline"
                      >
                        +91 94445 47474
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / typing indicator */}
            {isThinking && (
              <div className="flex items-end gap-1.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-[#E8DFD5] shadow-2xs shrink-0 mb-0.5 overflow-hidden">
                  <img
                    src={chatAvatar}
                    alt="V-Leo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white border border-[#E8DFD5] px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E58B52] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E58B52] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E58B52] animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* ━━━━━━━━━━━━━━━━━━━━
            QUICK TOPICS ACTION SHEET (Toggled by '+')
            ━━━━━━━━━━━━━━━━━━━━ */}
        {showQuickMenu && (
          <div className="bg-white border-t border-[#E8DFD5] p-3 shadow-lg z-20 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#422A21] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E58B52]" />
                <span>{language === 'en' ? 'Quick Questions' : 'விரைவு கேள்விகள்'}</span>
              </span>
              <button
                onClick={() => setShowQuickMenu(false)}
                className="p-1 text-[#8C7A6B] hover:text-[#422A21] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(topic.query)}
                  className="px-2.5 py-2 text-xs rounded-xl bg-[#FAF5EE] hover:bg-[#E58B52] hover:text-white border border-[#E8DFD5] text-[#422A21] font-medium text-left transition-colors cursor-pointer truncate"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━
            6. MESSAGE COMPOSER
            ━━━━━━━━━━━━━━━━━━━━ */}
        <footer className="bg-[#FAF5EE] border-t border-[#E8DFD5] p-2 sm:p-2.5 shrink-0 z-20 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-end gap-1.5 sm:gap-2 max-w-full"
          >
            {/* [ + ] Quick topic launcher button */}
            <button
              type="button"
              onClick={() => setShowQuickMenu((prev) => !prev)}
              title={language === 'en' ? 'Quick questions' : 'விரைவு கேள்விகள்'}
              aria-label="Quick questions"
              className={`p-2.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                showQuickMenu
                  ? 'bg-[#422A21] text-white'
                  : 'bg-white text-[#7D6B5D] hover:text-[#422A21] border border-[#E8DFD5]'
              }`}
            >
              <Plus className={`w-4 h-4 transition-transform ${showQuickMenu ? 'rotate-45' : ''}`} />
            </button>

            {/* Input bar */}
            <div className="flex-1 bg-white rounded-2xl border border-[#E8DFD5] focus-within:border-[#E58B52] focus-within:ring-1 focus-within:ring-[#E58B52]/40 transition-all flex items-center px-3.5 py-1.5 shadow-2xs">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder={
                  language === 'en'
                    ? 'Type your message...'
                    : 'செய்தியைத் தட்டச்சு செய்யவும்...'
                }
                disabled={isThinking}
                className="w-full text-[13.5px] text-[#2C1810] placeholder-[#A08E7E] bg-transparent resize-none focus:outline-none max-h-28 leading-5 disabled:opacity-50"
              />
            </div>

            {/* [ Send ] button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              aria-label="Send Message"
              className="p-2.5 sm:p-3 bg-[#E58B52] hover:bg-[#D9773B] active:scale-95 text-white rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </footer>

      </div>
    </div>
  );
}
