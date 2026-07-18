import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Read Firebase configuration from environment variables safely
const envApiKey = (import.meta as any).env?.VITE_FIREBASE_API_KEY || '';
const envProjectId = (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || '';

const isEnvConfigValid = 
  envApiKey && 
  envProjectId && 
  !envApiKey.includes('your-') && 
  !envProjectId.includes('your-');

const firebaseConfig = isEnvConfigValid 
  ? {
      apiKey: envApiKey,
      authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: envProjectId,
      storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || '',
    }
  : {
      apiKey: "AIzaSyAN9f3pohIvVzAz1IJ6xVZ5pPEToiZOX24",
      authDomain: "offc-vivek.firebaseapp.com",
      projectId: "offc-vivek",
      storageBucket: "offc-vivek.firebasestorage.app",
      messagingSenderId: "835216749254",
      appId: "1:835216749254:web:8470190009d98dddf3ddc7",
    };

// Initialize Firebase App safely (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// Verify and log connection details in development mode only
if ((import.meta as any).env?.DEV) {
  if (app) {
    console.log("Firebase App initialized successfully.");
  }
  if (db) {
    console.log("Firestore initialized successfully.");
  }
  console.log(`Connected Firebase project ID: ${firebaseConfig.projectId}`);
}

export const firebaseSetup = {
  isConfigured: true,
  config: {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
  }
};


