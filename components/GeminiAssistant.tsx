
import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, Send, Loader2, Rocket } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = { role: 'user' as const, content: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: `You are the Vroomm Smart Buddy! 🏎️ Your job is to make shopping for toys and diecast cars super fun.
          Catalog info: ${JSON.stringify(MOCK_PRODUCTS)}. 
          Tone: Very energetic, helpful, and use LOTS of emojis. 
          If a kid is asking, be like a cool older brother/sister. If a parent is asking, be a gift-giving expert.
          Always mention specific products from the catalog if they match. 
          Use terms like "Zooming", "Awesome", "Super-rare", and "Collector's Prize".`
        }
      });

      const aiMsg = { role: 'assistant' as const, content: response.text || "Oops! My engines stalled! Try again! 🏎️" };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "My rocket engine needs a quick fix! Try in a minute! 🚀" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-[2.5rem] shadow-2xl w-80 md:w-96 flex flex-col overflow-hidden border-4 border-blue-500 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl">
                <Rocket className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-black uppercase tracking-widest text-sm">Vroomm Buddy!</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto max-h-[400px] space-y-4 bg-gray-50 no-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 float-anim">
                  <Sparkles className="w-10 h-10 text-blue-600" />
                </div>
                <h4 className="font-black text-gray-900 mb-2">HEY BUDDY! 🏎️</h4>
                <p className="text-gray-500 text-sm font-medium">Want to find the coolest Hot Wheels or a super cool Anime figure? Just ask me!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-bold shadow-sm ${
                  msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border-2 border-blue-50'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm border-2 border-blue-50">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t-2 border-gray-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell me a cool car story..."
              className="flex-1 bg-gray-100 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl disabled:opacity-50 shadow-lg shadow-blue-500/20 active:scale-90 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-3 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <MessageSquare className="w-7 h-7" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black uppercase tracking-widest text-xs">Chat with Buddy!</span>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
