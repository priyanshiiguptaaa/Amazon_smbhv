import { io } from 'socket.io-client';
import axios from 'axios';

// Google Cloud Translation API configuration
const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
const TRANSLATION_API_URL = 'https://translation.googleapis.com/language/translate/v2';

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

// Translation Service using Google Cloud Translation REST API
export const translateText = async (text, fromLang, toLang) => {
  try {
    const response = await axios.post(`${TRANSLATION_API_URL}?key=${GOOGLE_CLOUD_API_KEY}`, {
      q: text,
      source: fromLang,
      target: toLang,
      format: 'text'
    });

    return {
      translatedText: response.data.data.translations[0].translatedText,
      confidence: 1.0,
      detectedLanguage: fromLang,
    };
  } catch (error) {
    console.error('Error translating text:', error);
    // Fallback to original text if translation fails
    return {
      translatedText: text,
      confidence: 0,
      detectedLanguage: fromLang,
      error: error.message,
    };
  }
};

// Language Detection using Google Cloud Translation REST API
export const detectLanguage = async (text) => {
  try {
    const response = await axios.post(
      `${TRANSLATION_API_URL}/detect?key=${GOOGLE_CLOUD_API_KEY}`,
      { q: text }
    );

    const detection = response.data.data.detections[0][0];
    return {
      language: detection.language,
      confidence: detection.confidence,
    };
  } catch (error) {
    console.error('Error detecting language:', error);
    // Fallback to English if detection fails
    return {
      language: 'en',
      confidence: 0,
      error: error.message,
    };
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
