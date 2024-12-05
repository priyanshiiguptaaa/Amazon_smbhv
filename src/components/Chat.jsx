import React, { useState, useEffect, useRef } from 'react';
import { Send, Globe, X, Minimize2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Chat = ({ userId, userName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const translateMessage = async (text, fromLang, toLang) => {
    try {
      const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_CLOUD_API_KEY}`,
        {
          q: text,
          source: fromLang,
          target: toLang,
          format: 'text'
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  };

  const detectLanguage = async (text) => {
    try {
      const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${GOOGLE_CLOUD_API_KEY}`,
        { q: text }
      );
      return response.data.data.detections[0][0].language;
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en'; // Fallback to English
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const detectedLang = await detectLanguage(newMessage);
      const message = {
        id: Date.now(),
        userId,
        userName,
        content: newMessage,
        language: detectedLang,
        timestamp: new Date().toISOString(),
      };

      // If translation is enabled and the message is not in preferred language,
      // translate it before adding to messages
      if (isTranslating && detectedLang !== preferredLanguage) {
        const translatedContent = await translateMessage(
          newMessage,
          detectedLang,
          preferredLanguage
        );
        message.translatedContent = translatedContent;
      }

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const toggleTranslation = () => {
    setIsTranslating(!isTranslating);
    toast.success(
      isTranslating ? 'Translation disabled' : 'Translation enabled'
    );
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 cursor-pointer"
           onClick={() => setIsMinimized(false)}>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Chat</span>
          <Maximize2 className="w-4 h-4 text-gray-500" />
        </div>
        <div className="text-sm text-gray-500">
          {messages.length} messages
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg flex flex-col">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">Chat Support</h3>
          <button
            onClick={toggleTranslation}
            className={`p-1 rounded ${
              isTranslating ? 'text-blue-600' : 'text-gray-400'
            }`}
            title={isTranslating ? 'Disable translation' : 'Enable translation'}
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.userId === userId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.userId === userId
                  ? 'bg-blue-600 text-white'
                  : message.userId === 'system'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.userId !== userId && message.userId !== 'system' && (
                <div className="text-xs text-gray-600 mb-1">{message.userName}</div>
              )}
              <div>{message.translatedContent || message.content}</div>
              {message.translatedContent && (
                <div className="text-xs mt-1 opacity-75">
                  Original: {message.content}
                </div>
              )}
              <div className="text-xs opacity-75 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
