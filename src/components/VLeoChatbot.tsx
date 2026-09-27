import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "../lib/router";

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  shouldEscalate?: boolean;
  userPrompt?: string;
  feedbackSubmitted?: "helpful" | "unhelpful" | null;
  feedbackComment?: string;
}

export interface PublishedLauncherConfig {
  launcherImageUrl?: string;
  launcherImage?: string;
  launcherPosition?: string;
  desktopSize?: number | string;
  mobileSize?: number | string;
  rightOffset?: number | string;
  bottomOffset?: number | string;
  leftOffset?: number | string;
  topOffset?: number | string;
  mobileRightOffset?: number | string;
  mobileBottomOffset?: number | string;
  animationEnabled?: boolean;
  animation?: string;
  launcherEnabled?: boolean;
  clickAction?: string;
  publishedAt?: any;
}

export interface ChatbotCMSData {
  // Launcher & Configurator
  launcherImageUrl?: string;
  launcherImage?: string;
  launcherIcon?: string;
  launcherIconUrl?: string;
  launcherPosition?: string;
  desktopSize?: number | string;
  mobileSize?: number | string;
  rightOffset?: number | string;
  bottomOffset?: number | string;
  leftOffset?: number | string;
  topOffset?: number | string;
  mobileRightOffset?: number | string;
  mobileBottomOffset?: number | string;
  animationEnabled?: boolean;
  animation?: string;
  launcherEnabled?: boolean;
  clickAction?: string;
  isPublished?: boolean;
  cmsStatus?: string;
  publishedLauncherConfig?: PublishedLauncherConfig;

  // Avatars
  avatar?: string;
  avatarUrl?: string;
  botAvatar?: string;
  headerAvatar?: string;
  header_avatar?: string;
  headerAvatarUrl?: string;
  mascotIcon?: string;

  // Names & Titles
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

  // Prompts & Knowledge
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
  welcomeTitle?: string;
  hoverGreeting?: string;
  hoverBubbles?: string[] | string;
  hover_bubbles?: string[] | string;

  // Capabilities & Quick Actions
  capabilities?: any[];
  capabilitiesList?: string[] | string;
  capabilitiesListTa?: string[] | string;
  suggestedQuestions?: string[];
  quickActions?: any[];
  quick_actions?: any[];

  // Input & Language
  inputPlaceholder?: string;
  inputPlaceholderTa?: string;
  languageButtonText?: string;
  languageButtonTa?: string;
  languageButton?: string;

  // Settings
  conversationHistoryLength?: number | string;
  maxHistoryLength?: number | string;
  position?: string;
  floatingPosition?: string;
  widgetSize?: string;

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
  appearance?: Record<string, any>;

  // Human Contact / Handoff
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapsUrl?: string;
}

const LOCAL_FALLBACK_IMAGE = "/images/vleo_peeking_launcher.png";
const SECONDARY_FALLBACK_IMAGE = "/images/vleo_mascot.png";

export default function VLeoChatbot() {
  const { path, navigate } = useRouter();

  // CMS Realtime State
  const [cmsChatbotData, setCmsChatbotData] = useState<ChatbotCMSData | null>(null);
  const [cmsAiData, setCmsAiData] = useState<ChatbotCMSData | null>(null);

  // Responsive state for screen width
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Image load error fallback state
  const [imgErrorLevel, setImgErrorLevel] = useState<number>(0);

  // 1. Subscribe to Website CMS Firestore documents in real time
  // Source of truth: website_cms/chatbot (Chatbot Branding & Widget Configurator)
  useEffect(() => {
    if (!db) return;

    const unsubChatbot = onSnapshot(
      doc(db, "website_cms", "chatbot"),
      (docSnap) => {
        if (docSnap.exists()) {
          setCmsChatbotData(docSnap.data() as ChatbotCMSData);
        }
      },
      (err) => {
        console.warn("website_cms/chatbot snapshot listener error:", err);
      }
    );

    const unsubAi = onSnapshot(
      doc(db, "website_cms", "ai"),
      (docSnap) => {
        if (docSnap.exists()) {
          setCmsAiData(docSnap.data() as ChatbotCMSData);
        }
      },
      (err) => {
        console.warn("website_cms/ai snapshot listener error:", err);
      }
    );

    return () => {
      unsubChatbot();
      unsubAi();
    };
  }, []);

  // 2. Window resize listener for responsive desktop / mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Listen for global open-vleo-chat custom events from anywhere on the website
  useEffect(() => {
    const handleOpenVLeo = (e: any) => {
      if (e?.detail?.query) {
        try {
          sessionStorage.setItem("vleo_initial_query", e.detail.query);
        } catch (_) {}
      }
      navigate("/vleo");
    };

    window.addEventListener("open-vleo-chat", handleOpenVLeo);
    return () => window.removeEventListener("open-vleo-chat", handleOpenVLeo);
  }, [navigate]);

  // If the user is currently on the dedicated V-Leo Chatbot page (/vleo or /chatbot),
  // hide the floating launcher to prevent duplicate mascot artwork on screen
  if (path === "/vleo" || path === "/chatbot") {
    return null;
  }

  // --- Published Config Extraction ---
  const pubConfig = cmsChatbotData?.publishedLauncherConfig || {};

  // Check if launcher is enabled
  const isLauncherEnabled =
    pubConfig.launcherEnabled !== false &&
    cmsChatbotData?.launcherEnabled !== false &&
    cmsChatbotData?.isPublished !== false;

  if (!isLauncherEnabled) {
    return null;
  }

  // Sizing: Desktop vs Mobile directly from published Admin CMS
  const desktopSize = Number(pubConfig.desktopSize || cmsChatbotData?.desktopSize || 130);
  const mobileSize = Number(pubConfig.mobileSize || cmsChatbotData?.mobileSize || 95);

  // Offsets directly from published Admin CMS
  const rawRightOffset =
    pubConfig.rightOffset !== undefined
      ? pubConfig.rightOffset
      : cmsChatbotData?.rightOffset !== undefined
        ? cmsChatbotData?.rightOffset
        : 20;
  const desktopRightOffset = Number(rawRightOffset);

  const rawBottomOffset =
    pubConfig.bottomOffset !== undefined
      ? pubConfig.bottomOffset
      : cmsChatbotData?.bottomOffset !== undefined
        ? cmsChatbotData?.bottomOffset
        : 20;
  const desktopBottomOffset = Number(rawBottomOffset);

  // Mobile offsets (support mobile-specific offset if present in CMS, otherwise cleanly inherit published offset)
  const mobileRightOffset = Number(
    pubConfig.mobileRightOffset !== undefined
      ? pubConfig.mobileRightOffset
      : cmsChatbotData?.mobileRightOffset !== undefined
        ? cmsChatbotData?.mobileRightOffset
        : desktopRightOffset
  );

  const mobileBottomOffset = Number(
    pubConfig.mobileBottomOffset !== undefined
      ? pubConfig.mobileBottomOffset
      : cmsChatbotData?.mobileBottomOffset !== undefined
        ? cmsChatbotData?.mobileBottomOffset
        : desktopBottomOffset
  );

  // Position from published Admin CMS (default: bottom-right)
  const positionSetting = (
    pubConfig.launcherPosition ||
    cmsChatbotData?.launcherPosition ||
    cmsAiData?.launcherPosition ||
    "bottom-right"
  ).toLowerCase();

  const isLeft = positionSetting.includes("left");
  const isTop = positionSetting.includes("top");

  // Animation setting
  const animationEnabled =
    pubConfig.animationEnabled !== undefined
      ? Boolean(pubConfig.animationEnabled)
      : cmsChatbotData?.animationEnabled !== undefined
        ? Boolean(cmsChatbotData?.animationEnabled)
        : true;

  // Published custom image URL
  const publishedImageUrl =
    pubConfig.launcherImageUrl ||
    cmsChatbotData?.launcherImageUrl ||
    pubConfig.launcherImage ||
    cmsChatbotData?.launcherImage ||
    cmsAiData?.launcherImageUrl ||
    cmsAiData?.launcherImage;

  // Determine current image source with graceful failover hierarchy
  let currentImageSrc: string = LOCAL_FALLBACK_IMAGE;
  if (imgErrorLevel === 0 && publishedImageUrl) {
    currentImageSrc = publishedImageUrl;
  } else if (imgErrorLevel <= 1) {
    currentImageSrc = LOCAL_FALLBACK_IMAGE;
  } else {
    currentImageSrc = SECONDARY_FALLBACK_IMAGE;
  }

  const handleImageError = () => {
    setImgErrorLevel((prev) => prev + 1);
  };

  // Click handler: Navigate to existing V-Leo chatbot page
  const handleLauncherClick = () => {
    navigate("/vleo");
  };

  // Dimensions & Offsets for current viewport (Desktop vs Mobile)
  const currentWidth = isMobile ? mobileSize : desktopSize;
  const currentRight = isMobile ? mobileRightOffset : desktopRightOffset;
  const currentBottom = isMobile ? mobileBottomOffset : desktopBottomOffset;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        bottom: isTop ? undefined : `${currentBottom}px`,
        top: isTop ? `${currentBottom}px` : undefined,
        right: isLeft ? undefined : `${currentRight}px`,
        left: isLeft ? `${currentRight}px` : undefined,
        pointerEvents: "auto",
        overflow: "visible",
      }}
      className="select-none font-sans overflow-visible"
    >
      <motion.button
        onClick={handleLauncherClick}
        animate={
          animationEnabled
            ? {
                y: [0, -6, 0],
              }
            : {
                y: 0,
              }
        }
        transition={
          animationEnabled
            ? {
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }
            : undefined
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask V-Leo AI School Assistant"
        className="group relative flex items-center justify-end cursor-pointer bg-transparent border-0 p-0 m-0 outline-none focus:outline-none overflow-visible"
        style={{
          width: `${currentWidth}px`,
          height: "auto",
        }}
      >
        <img
          src={currentImageSrc}
          onError={handleImageError}
          alt="V-Leo AI Assistant - Click Me!"
          loading="eager"
          decoding="async"
          className="w-full h-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-transform duration-200 pointer-events-none select-none"
        />
      </motion.button>
    </div>
  );
}
