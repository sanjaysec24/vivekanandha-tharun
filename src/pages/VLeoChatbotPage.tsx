import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, Phone, Mail, Globe, MapPin, Copy, Check, RotateCcw, 
  ThumbsUp, ThumbsDown, ArrowLeft, Bot, Sparkles, MessageSquare
} from 'lucide-react';
import Markdown from 'react-markdown';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter, Link } from '../lib/router';
import { Message, ChatbotCMSData } from '../components/VLeoChatbot';

const DEFAULT_QUICK_ACTIONS = [
  { label: 'Admissions 2027', labelTa: 'சேர்க்கை', query: 'Tell me about the admission process and eligibility for 2027' },
  { label: 'Fee Structure', labelTa: 'கட்டணம்', query: 'What is the fee structure at Vivekanandha School?' },
  { label: 'Academics & Grades', labelTa: 'பாடத்திட்டம்', query: 'What grades and curriculum do you offer?' },
  { label: 'School Transport', labelTa: 'பேருந்து', query: 'What are the school transport routes and facilities?' },
  { label: 'Campus Tour', labelTa: 'நேரில் வர', query: 'How can I book a campus visit to Vivekanandha School?' },
  { label: 'Contact Office', labelTa: 'தொடர்பு', query: 'What is the office address, phone number and email?' },
];

export default function VLeoChatbotPage() {
  const { path } = useRouter();
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Feedback State
  const [activeFeedbackMsgId, setActiveFeedbackMsgId] = useState<string | null>(null);
  const [feedbackCommentText, setFeedbackCommentText] = useState('');

  // CMS Settings & Live Context
  const [cmsAiSettings, setCmsAiSettings] = useState<ChatbotCMSData | null>(null);
  const [cmsChatbotSettings, setCmsChatbotSettings] = useState<ChatbotCMSData | null>(null);
  const [cmsContextData, setCmsContextData] = useState<Record<string, any>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const botNameEn = cmsData?.assistantName || cmsData?.botName || 'V-Leo AI';
  const botNameTa = cmsData?.assistantNameTa || 'வி-லியோ AI';
  const currentBotName = language === 'en' ? botNameEn : botNameTa;

  const defaultWelcomeEn = `Hello 👋
I'm V-Leo, your official AI School Companion at Vivekanandha School, Uthiramerur!

I am here to guide you with:
• Admissions & Eligibility for 2027
• Fee details & Inquiry assistance
• Academic curriculum & holistic activities
• School transport routes
• Campus visits & Office contact details

How can I help you today?`;

  const defaultWelcomeTa = `வணக்கம் 👋
நான் வி-லியோ (V-Leo), விவேகானந்தா பள்ளியின் AI வழிகாட்டி!

நான் உங்களுக்கு பின்வருவனவற்றில் உதவ முடியும்:
• 2027 சேர்க்கை விவரங்கள்
• கட்டண விவரங்கள்
• கல்வி முறை மற்றும் செயல்பாடுகள்
• பள்ளி பேருந்து வசதி
• வளாக வருகை மற்றும் தொடர்பு விவரங்கள்

நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?`;

  const currentWelcome = language === 'en' 
    ? (cmsData?.welcomeMessage || cmsData?.welcomeMessageEn || defaultWelcomeEn)
    : (cmsData?.welcomeMessageTa || defaultWelcomeTa);

  useEffect(() => {
    setMessages((prev) => {
      const hasUser = prev.some((m) => m.sender === 'user');
      if (!hasUser) {
        return [
          {
            id: 'welcome',
            sender: 'bot',
            text: currentWelcome,
            timestamp: formatTime(),
          },
        ];
      }
      return prev;
    });
  }, [language, currentWelcome]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isThinking) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    const historyLimit = Number(cmsData?.conversationHistoryLength) || 15;
    const history = messages.slice(-historyLimit).map((m) => ({
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
            message: textToSend,
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
            message: textToSend,
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
        throw new Error(`Chat error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || 'I am here to help with all questions about Vivekanandha School!',
        timestamp: formatTime(),
        suggestedQuestions: data.suggestedQuestions || [],
        shouldEscalate: data.shouldEscalate || false,
        userPrompt: textToSend,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('V-Leo Chat Error:', err);
      const botMessage: Message = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: language === 'en'
          ? 'I am temporarily unable to connect to the AI service. Please contact our admissions team directly at **+91 94445 47474**.'
          : 'AI சேவையை தற்போது தொடர்பு கொள்ள முடியவில்லை. தயவுசெய்து **+91 94445 47474** என்ற எண்ணில் பள்ளி அலுவலகத்தை தொடர்பு கொள்ளவும்.',
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

  const handleFeedbackClick = (msgId: string, type: 'helpful' | 'unhelpful') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedbackSubmitted: type } : m))
    );
    setActiveFeedbackMsgId(msgId);
  };

  const handleSaveFeedbackComment = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedbackComment: feedbackCommentText } : m))
    );
    setActiveFeedbackMsgId(null);
    setFeedbackCommentText('');
  };

  return (
    <div className="min-h-screen bg-[#F4F0EA] pt-24 pb-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C7A6B] hover:text-[#E78F68] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Bilingual Switcher */}
          <button
            onClick={() => setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'))}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E6DCCF] text-xs font-bold text-[#4A2C21] hover:border-[#E78F68] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#E78F68]" />
            <span>{language === 'en' ? 'தமிழ் இடைமுகம்' : 'English Interface'}</span>
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="bg-gradient-to-r from-[#4A2C21] via-[#5D382A] to-[#3B231A] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E78F68]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Robot Mascot Frame */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-white rounded-2xl p-1.5 border-2 border-[#E78F68] shadow-lg flex items-center justify-center overflow-hidden"
          >
            <img
              src="/images/vleo_peeking_launcher.png"
              alt="V-Leo Robot Mascot"
              className="w-full h-full object-contain"
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-[#25D366] rounded-full border-2 border-white" />
          </motion.div>

          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Official School AI Guide</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-bungee">
              {currentBotName}
            </h1>
            <p className="text-sm sm:text-base text-[#F4F0EA]/85 font-light leading-relaxed max-w-xl">
              {language === 'en'
                ? 'Ask anything about Vivekanandha School admissions, curriculum, term fees, school buses, or scheduling a visit.'
                : 'விவேகானந்தா பள்ளியின் சேர்க்கை, பாடத்திட்டம், கட்டணம் மற்றும் பேருந்து வசதிகள் குறித்து கேளுங்கள்.'}
            </p>
          </div>
        </div>

        {/* Main Chat Interface Container */}
        <div className="bg-white rounded-3xl border border-[#E6DCCF] shadow-xl overflow-hidden flex flex-col h-[650px] sm:h-[700px]">
          {/* Chat Window Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF7F2]/50">
            {messages.map((msg, index) => {
              const isLastBotMsg = msg.sender === 'bot' && index === messages.length - 1;

              return (
                <div key={msg.id} className="space-y-2">
                  <div
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E78F68]/40 shadow-xs flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                        <img
                          src="/images/vleo_peeking_launcher.png"
                          alt="V-Leo Avatar"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#E78F68] text-white rounded-tr-xs'
                          : 'bg-white text-[#3A2318] border border-[#E6DCCF] rounded-tl-xs'
                      }`}
                    >
                      {msg.sender === 'bot' ? (
                        <div className="space-y-2 select-text">
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

                      {/* Timestamp & Actions */}
                      <div
                        className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${
                          msg.sender === 'user'
                            ? 'border-white/20 text-white/80'
                            : 'border-[#E6DCCF]/60 text-[#8C7A6B]'
                        }`}
                      >
                        <span>{msg.timestamp}</span>

                        {msg.sender === 'bot' && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              className="p-1 hover:bg-black/5 rounded transition-colors text-[#8C7A6B] hover:text-[#4A2C21]"
                              title="Copy Message"
                            >
                              {copiedMsgId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>

                            <button
                              onClick={() => handleFeedbackClick(msg.id, 'helpful')}
                              className={`p-1 rounded transition-colors ${
                                msg.feedbackSubmitted === 'helpful'
                                  ? 'text-emerald-600 font-bold bg-emerald-50'
                                  : 'text-[#8C7A6B] hover:text-emerald-600 hover:bg-black/5'
                              }`}
                              title="Helpful"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleFeedbackClick(msg.id, 'unhelpful')}
                              className={`p-1 rounded transition-colors ${
                                msg.feedbackSubmitted === 'unhelpful'
                                  ? 'text-rose-600 font-bold bg-rose-50'
                                  : 'text-[#8C7A6B] hover:text-rose-600 hover:bg-black/5'
                              }`}
                              title="Not helpful"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Feedback Comment Box */}
                      {activeFeedbackMsgId === msg.id && (
                        <div className="mt-2.5 pt-2 border-t border-[#E6DCCF] space-y-1.5">
                          <p className="text-[10px] font-bold text-[#4A2C21]">
                            Thank you! Optional comment:
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
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Follow-up Questions */}
                  {msg.sender === 'bot' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-col gap-1.5 ml-10 mt-1">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="self-start text-[12px] text-[#E78F68] hover:text-[#4A2C21] bg-white hover:bg-[#E78F68]/10 border border-[#E78F68]/30 px-3 py-1.5 rounded-full transition-all text-left flex items-center gap-1.5 shadow-2xs active:scale-95"
                        >
                          <span>{q}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Escalation Direct Action Cards */}
                  {msg.sender === 'bot' && msg.shouldEscalate && (
                    <div className="ml-10 mt-2 p-3.5 bg-gradient-to-br from-[#FFF9F5] to-[#FFF0E6] border border-[#E78F68]/40 rounded-2xl shadow-xs space-y-2.5 max-w-[85%] sm:max-w-[75%]">
                      <p className="text-[11.5px] font-bold text-[#4A2C21]">
                        📞 Connect Directly with School Admissions:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <a
                          href="tel:+919444547474"
                          className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-[#E6DCCF] hover:border-[#E78F68] text-[#3A2318] font-medium shadow-2xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#E78F68]" />
                          <span>+91 94445 47474</span>
                        </a>
                        <a
                          href="https://wa.me/919444547474"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-[#25D366]/10 rounded-xl border border-[#25D366]/30 text-[#128C7E] font-medium hover:bg-[#25D366]/20 transition-colors"
                        >
                          <span>💬 WhatsApp Office</span>
                        </a>
                        <a
                          href="mailto:admissions@vivekanandhaschool.edu.in"
                          className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-[#E6DCCF] hover:border-[#E78F68] text-[#3A2318] font-medium shadow-2xs transition-colors sm:col-span-2"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#E78F68]" />
                          <span>admissions@vivekanandhaschool.edu.in</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E78F68]/40 shadow-xs flex items-center justify-center shrink-0 p-0.5">
                  <img
                    src="/images/vleo_peeking_launcher.png"
                    alt="V-Leo Avatar"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white border border-[#E6DCCF] px-4 py-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E78F68] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#E78F68] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#E78F68] animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Scroll Bar */}
          <div className="bg-[#FAF7F2] border-t border-[#E6DCCF] px-4 py-2.5 shrink-0">
            <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#8C7A6B] mb-1.5">
              {language === 'en' ? 'Suggested Questions' : 'விரைவு உதவி'}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {DEFAULT_QUICK_ACTIONS.map((act, idx) => {
                const label = language === 'ta' ? act.labelTa : act.label;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(act.query)}
                    className="shrink-0 text-[11.5px] font-bold bg-white hover:bg-[#E78F68] text-[#4A2C21] hover:text-white px-3.5 py-1.5 rounded-full border border-[#E6DCCF] shadow-2xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Form Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2 p-3 sm:p-4 bg-white border-t border-[#E6DCCF] shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={language === 'en' ? 'Ask V-Leo anything...' : 'வி-லியோவிடம் ஏதேனும் கேட்கவும்...'}
              disabled={isThinking}
              className="flex-1 px-4 py-2.5 text-sm text-[#3A2318] placeholder-[#A39281] bg-[#FAF7F2] border border-[#E6DCCF] rounded-full focus:outline-none focus:border-[#4A2C21] focus:ring-1 focus:ring-[#4A2C21] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              aria-label="Send Message"
              className="p-3 bg-[#E78F68] text-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm active:scale-95 hover:brightness-110"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
