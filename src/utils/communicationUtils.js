import { io } from 'socket.io-client';
import axios from 'axios';

// Socket connection for real-time communication
const socket = io('http://localhost:3001', {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Video Conference
export const initializeVideoCall = async (roomId) => {
  try {
    // Mock WebRTC connection (replace with actual WebRTC implementation)
    return {
      roomId,
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
      constraints: {
        audio: true,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        },
      },
    };
  } catch (error) {
    console.error('Error initializing video call:', error);
    throw error;
  }
};

// Chat System
export const connectToChat = () => {
  socket.connect();
  return socket;
};

export const disconnectFromChat = () => {
  socket.disconnect();
};

export const sendMessage = (message) => {
  socket.emit('message', message);
};

export const joinRoom = (roomId, userId) => {
  socket.emit('join-room', { roomId, userId });
};

export const leaveRoom = (roomId, userId) => {
  socket.emit('leave-room', { roomId, userId });
};

// Translation Service
export const translateText = async (text, fromLang, toLang) => {
  try {
    // Mock translation (replace with actual translation API)
    const commonPhrases = {
      'en-hi': {
        'Hello': 'नमस्ते',
        'How are you?': 'आप कैसे हैं?',
        'Thank you': 'धन्यवाद',
        'Shipping status': 'शिपिंग स्थिति',
        'Order confirmed': 'आदेश की पुष्टि की',
      },
      'hi-en': {
        'नमस्ते': 'Hello',
        'आप कैसे हैं?': 'How are you?',
        'धन्यवाद': 'Thank you',
        'शिपिंग स्थिति': 'Shipping status',
        'आदेश की पुष्टि की': 'Order confirmed',
      },
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const langPair = `${fromLang}-${toLang}`;
    if (commonPhrases[langPair] && commonPhrases[langPair][text]) {
      return {
        translatedText: commonPhrases[langPair][text],
        confidence: 0.95,
        detectedLanguage: fromLang,
      };
    }

    // For unknown phrases, return a simulated translation
    return {
      translatedText: text, // In real implementation, this would be the translated text
      confidence: 0.8,
      detectedLanguage: fromLang,
    };
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

// Language Detection
export const detectLanguage = async (text) => {
  try {
    // Mock language detection (replace with actual language detection API)
    const commonPatterns = {
      en: /^[a-zA-Z\s.,!?]+$/,
      hi: /[\u0900-\u097F]/,
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    for (const [lang, pattern] of Object.entries(commonPatterns)) {
      if (pattern.test(text)) {
        return {
          language: lang,
          confidence: 0.9,
        };
      }
    }

    return {
      language: 'en', // Default to English
      confidence: 0.6,
    };
  } catch (error) {
    console.error('Error detecting language:', error);
    throw error;
  }
};

// Real-time Status Updates
export const subscribeToStatus = (userId, callback) => {
  socket.on(`status-${userId}`, callback);
  return () => socket.off(`status-${userId}`, callback);
};

// Presence System
export const updatePresence = (userId, status) => {
  socket.emit('presence', { userId, status });
};

export const subscribeToPresence = (callback) => {
  socket.on('presence-update', callback);
  return () => socket.off('presence-update', callback);
};
