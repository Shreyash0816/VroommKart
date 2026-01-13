
import React, { useState } from 'react';
import { Sparkles, Search, Zap, Trophy, History, TrendingUp, Cpu, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AiStudio: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCollectible = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Act as a world-class diecast car and toy expert. Analyze this item: "${query}". 
        Provide a detailed report in a professional collector tone. Include:
        1. Rarity Score (out of 10)
        2. Historical Significance
        3. Market Value Trend (Increasing/Stable/Decreasing)
        4. Collector Tip.
        Format the response as a clear structured analysis. Keep it concise.`,
      });

      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult("I couldn't analyze this item. Please try checking the model name again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">Next-Gen Collector AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black mb-6 tracking-tighter">
            COLLECTOR'S <span className="text-blue-500">STUDIO</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our proprietary AI analyzes your diecast models and rare toys to provide rarity scores, history, and market insights.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-[40px] shadow-2xl mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-20 h-20" />
          </div>
          <div className="relative z-10">
            <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Identify Your Treasure</label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Hot Wheels 1968 Custom Camaro"
                  className="w-full bg-gray-950 border border-gray-800 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                />
              </div>
              <button 
                onClick={analyzeCollectible}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                <span>{isLoading ? 'Scanning...' : 'Start Scan'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        {result ? (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-blue-600/5 border border-blue-500/20 rounded-[40px] p-10 backdrop-blur-sm relative">
              <div className="absolute top-10 right-10">
                <Trophy className="w-12 h-12 text-blue-500/20" />
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-black uppercase tracking-tight m-0">Analysis Report</h2>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-medium text-lg">
                  {result}
                </div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
               <FeatureBadge icon={<History className="w-5 h-5 text-blue-400" />} title="Deep History" desc="Traces production runs" />
               <FeatureBadge icon={<TrendingUp className="w-5 h-5 text-green-400" />} title="Value Tracking" desc="Real-time market trends" />
               <FeatureBadge icon={<Trophy className="w-5 h-5 text-yellow-400" />} title="Rarity Check" desc="Limited edition detection" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all cursor-default">
             <div className="p-8 border border-gray-800 rounded-3xl text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">Identify</h4>
                <p className="text-xs text-gray-500">AI recognizes thousands of diecast variations.</p>
             </div>
             <div className="p-8 border border-gray-800 rounded-3xl text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">Value</h4>
                <p className="text-xs text-gray-500">Know the actual worth of your collection.</p>
             </div>
             <div className="p-8 border border-gray-800 rounded-3xl text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-bold mb-2">Verify</h4>
                <p className="text-xs text-gray-500">Spot rare error cards and limited runs.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureBadge: React.FC<{ icon: any, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl flex items-center space-x-4">
    <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-black text-sm uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

export default AiStudio;
