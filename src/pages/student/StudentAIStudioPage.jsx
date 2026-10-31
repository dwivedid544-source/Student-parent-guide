import React, { useState } from 'react';
import { Cpu, Send, Sparkles, BookOpen, Brain, Clock, ShieldCheck, Check } from 'lucide-react';

export const StudentAIStudioPage = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to your HighOrbit AI Learning Studio. I am here to help you deconstruct complex academic topics, prepare for exams with active recall, or structure your personal growth reflections. What are you studying or navigating today?',
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const presetPrompts = [
    'Break down a complex academic concept using simple analogies',
    'Generate 3 active recall testing questions on my topic',
    'Structure an outline for a persuasive research essay',
    'Help me create a prioritized study schedule for this week',
  ];

  const handleSend = (textToSend = prompt) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsGenerating(true);

    setTimeout(() => {
      let responseContent = '';
      if (text.toLowerCase().includes('analogy') || text.toLowerCase().includes('break down')) {
        responseContent = `Here is a structured first-principles breakdown:\n\n1. **Core Mechanism:** Strip away jargon. Focus on the single primary cause-and-effect relationship.\n2. **Everyday Analogy:** Imagine this system like a water reservoir: pressure builds up, flows through regulatory valves, and distributes evenly to maintain equilibrium.\n3. **Practical Application:** In your upcoming assessment, explain this starting with the fundamental principle before introducing technical terminology.`;
      } else if (text.toLowerCase().includes('recall') || text.toLowerCase().includes('question')) {
        responseContent = `Here are 3 active-recall self-testing questions:\n\n1. *Foundational:* What is the exact definition of your core concept in your own words without checking your notes?\n2. *Application:* If condition X changes by 20%, what secondary effect occurs on the outcome?\n3. *Critique:* What is the strongest counter-argument or limitation to this principle?`;
      } else {
        responseContent = `**Strategic Roadmap for "${text}":**\n\n• **Priority Focus:** Allocate your first 25-minute Pomodoro sprint solely to organizing reference materials.\n• **Synthesize:** Write a 3-sentence summary of the main objective.\n• **Action Item:** Complete one concrete draft or 5 practice problems before taking a short 5-minute break.`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: responseContent }]);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202923] tracking-tight">
          AI Learning Studio
        </h2>
        <p className="text-xs sm:text-sm text-[#737A73] mt-1">
          An intentional, ad-free study assistant designed for active recall, essay synthesis, and deep comprehension.
        </p>
      </div>

      {/* Preset Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {presetPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="text-xs font-semibold px-3.5 py-2 rounded-full bg-white border border-black/30 hover:border-black/50 text-[#202923] hover:bg-[#EDF2EC] transition-all text-left cursor-pointer shadow-xs"
          >
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/30 hover:border-black/50 shadow-xs flex flex-col h-[460px] justify-between gap-4 transition-all">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#EDF2EC] text-[#193F30] border border-black/20 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                  m.role === 'user'
                    ? 'bg-[#193F30] text-white rounded-tr-xs border border-black/30'
                    : 'bg-[#F8F7F2] text-[#202923] border border-black/25 rounded-tl-xs'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center gap-2 text-xs text-[#737A73] pl-11">
              <Sparkles className="w-4 h-4 animate-spin text-[#193F30]" />
              <span>Formulating study synthesis...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-3 border-t border-black/20"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question or describe a topic to explore..."
            className="flex-1 py-3 px-4 text-xs sm:text-sm rounded-full bg-[#F8F7F2] border border-black/30 hover:border-black/50 text-[#202923] placeholder-[#737A73] focus:outline-none focus:border-black shadow-2xs transition-all"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="p-3 rounded-full bg-[#193F30] hover:bg-[#204936] text-white border border-black/30 hover:border-black/50 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentAIStudioPage;
