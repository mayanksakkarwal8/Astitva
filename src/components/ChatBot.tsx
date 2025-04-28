
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  content: string;
  isUser: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! I'm your cultural guide to India. Ask me about festivals, monuments, or places to visit!", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { content: input, isUser: true }]);
    
    // Process the message and generate a response
    const response = generateResponse(input);
    
    // Add bot response after a short delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { content: response, isUser: false }]);
    }, 600);
    
    // Clear input
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('delhi') || lowerCaseMessage.includes('best place') || lowerCaseMessage.includes('visit in delhi')) {
      return "In Delhi, you must visit the Red Fort, Qutub Minar, Humayun's Tomb, and India Gate. The Lotus Temple and Akshardham Temple are also magnificent. For cultural experiences, explore Chandni Chowk and Dilli Haat for traditional crafts and food.";
    } else if (lowerCaseMessage.includes('festival')) {
      return "India celebrates many festivals! Diwali (Festival of Lights), Holi (Festival of Colors), Navratri, Durga Puja, Eid, Christmas, and Onam are some major ones. Each region has its unique celebrations too.";
    } else if (lowerCaseMessage.includes('food') || lowerCaseMessage.includes('cuisine')) {
      return "Indian cuisine varies widely by region. Try butter chicken and chaat in North India, dosa and idli in South India, fish curry in coastal regions, and momos in Northeast India. Street food like pani puri and vada pav is a must-try experience!";
    } else if (lowerCaseMessage.includes('monument') || lowerCaseMessage.includes('heritage')) {
      return "India has 40 UNESCO World Heritage sites. The Taj Mahal, Red Fort, Qutub Minar, Ajanta & Ellora Caves, and Hampi are must-visit monuments. Each tells a unique story of India's rich history.";
    } else if (lowerCaseMessage.includes('art') || lowerCaseMessage.includes('craft')) {
      return "India's traditional arts include Madhubani painting (Bihar), Warli art (Maharashtra), Pattachitra (Odisha), Tanjore painting (Tamil Nadu), and Phulkari embroidery (Punjab). Each region has unique crafts passed down through generations.";
    } else if (lowerCaseMessage.includes('dance') || lowerCaseMessage.includes('music')) {
      return "Classical dance forms include Bharatanatyam, Kathak, Odissi, and Kathakali. For music, explore Hindustani and Carnatic classical traditions. Folk music and dance forms vary by region and are deeply connected to local culture.";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Namaste! How can I help you explore India's cultural heritage today?";
    } else {
      return "That's an interesting question about Indian culture! While I'm still learning, I'd be happy to help you discover more about India's festivals, monuments, arts, or regional traditions. Could you specify what you'd like to know more about?";
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`p-3 rounded-full shadow-lg transition-colors ${
          isOpen ? 'bg-gray-200 text-gray-800' : 'bg-terracotta text-white'
        }`}
        aria-label="Chat with cultural guide"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Chat header */}
          <div className="bg-terracotta text-white p-3 flex items-center justify-between">
            <h3 className="font-medium">Cultural Guide AI</h3>
            <button onClick={toggleChat} className="text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about India's culture..."
              className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              variant="outline" 
              disabled={!input.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
