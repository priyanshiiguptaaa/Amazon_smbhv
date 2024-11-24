import React, { useState, useEffect, useRef } from 'react';
import { 
  connectToChat, 
  disconnectFromChat, 
  sendMessage, 
  translateText, 
  detectLanguage 
} from '../utils/communicationUtils';
import { Send, Globe, X, Minimize2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Chat = ({ userId, userName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Connect to chat server
    socket.current = connectToChat();

    // Listen for incoming messages
    socket.current.on('message', async (message) => {
      if (isTranslating && message.language !== preferredLanguage) {
        try {
          const translatedMessage = await translateText(
            message.content,
            message.language,
            preferredLanguage
          );
          message.translatedContent = translatedMessage.translatedText;
        } catch (error) {
          console.error('Translation error:', error);
          toast.error('Failed to translate message');
        }
      }
      setMessages(prev => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      disconnectFromChat();
    };
  }, [isTranslating, preferredLanguage]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const detectedLang = await detectLanguage(newMessage);
      const message = {
        id: Date.now(),
        userId,
        userName,
        content: newMessage,
        language: detectedLang.language,
        timestamp: new Date().toISOString(),
      };

      sendMessage(message);
      setNewMessage('');
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
        <h3 className="font-semibold">Chat</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTranslation}
            className={`p-2 rounded-full ${
              isTranslating ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Toggle translation"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.userId === userId ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm text-gray-600">{message.userName}</span>
              <span className="text-xs text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div
              className={`rounded-lg p-3 max-w-[80%] ${
                message.userId === userId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              {message.translatedContent && (
                <p className="mt-1 text-sm text-gray-200 border-t border-gray-300 pt-1">
                  {message.translatedContent}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
