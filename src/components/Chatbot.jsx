import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, MinusCircle } from 'lucide-react';
import { chatbotData } from '../data/chatbotData';
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chatbot on first homepage visit
  useEffect(() => {
    if (location.pathname === '/' && !hasShownWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            content: 'Welcome to Cargo Connect! 👋 I\'m CC, your AI assistant, here to help you with exports. Feel free to ask me anything about orders, shipments, or documentation.'
          }
        ]);
        setHasShownWelcome(true);
      }, 1500); // Show after 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasShownWelcome]);

  const findBestMatch = (query) => {
    return chatbotData.reduce((best, current) => {
      const currentScore = calculateSimilarity(query.toLowerCase(), current.question.toLowerCase());
      if (currentScore > best.score) {
        return { answer: current.answer, score: currentScore };
      }
      return best;
    }, { answer: "I'm sorry, I couldn't find a specific answer to your question. Please try rephrasing or contact our support team for assistance.", score: 0 });
  };

  const calculateSimilarity = (str1, str2) => {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue
    };

    const bestMatch = findBestMatch(inputValue);
    const botMessage = {
      type: 'bot',
      content: bestMatch.answer
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#FF9900] text-white p-4 rounded-full shadow-lg hover:bg-[#FF9900]/90 transition-all duration-200 animate-bounce"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl transition-all duration-200 ${isMinimized ? 'h-14' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-[#232F3E] text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span className="font-medium">CC - AI Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:text-[#FF9900] transition-colors"
          >
            <MinusCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-[#FF9900] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="p-4 h-[480px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#FF9900] text-white'
                      : 'bg-gray-100 text-gray-800'
                  } max-w-[80%]`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#FF9900]"
              />
              <button
                onClick={handleSend}
                className="bg-[#FF9900] text-white p-2 rounded-lg hover:bg-[#FF9900]/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
