import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Send, CheckCircle2, BookOpen } from 'lucide-react';

export const StudentHelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How does HighOrbit protect my private journal reflections?',
      a: 'Your reflections are encrypted and strictly confidential to your student account. They are designed as a safe sanctuary for honest self-discovery and emotional regulation.',
    },
    {
      q: 'How does the Parent Bridge work?',
      a: 'The Parent Bridge is a collaborative window where parents can view high-level milestone achievements, active developmental goals, and celebratory streaks, without micromanaging your private notes.',
    },
    {
      q: 'What should I do if I fall behind on my habit streak?',
      a: 'HighOrbit is designed with non-punitive resilience. Streaks are guides, not tests. If you miss a day, simply resume the next morning without guilt. Progress is cumulative.',
    },
    {
      q: 'How do I use the Box Breathing tool when feeling overwhelmed?',
      a: 'Navigate to Focus & Wellness and activate Box Breathing. Follow the 4-second inhale, 4-second hold, 4-second exhale, and 4-second hold rhythm for 3 to 4 cycles to recalibrate your nervous system.',
    },
  ];

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSubmitted(true);
    setSupportMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className=" text-2xl sm:text-3xl font-bold text-[#1b1831] tracking-tight">
          Help & Support Center
        </h2>
        <p className="text-xs sm:text-sm text-[#6A6678] mt-1">
          Guidance on making the most of your HighOrbit sanctuary and personal growth tools.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs transition-all space-y-4">
        <h3 className=" text-xl font-bold text-[#1b1831] border-b border-[#E6DEFF] pb-3">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E6DEFF] hover:border-primary/40 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#FCF8FF] hover:bg-[#F3EFFF] transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#1b1831]">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6A6678] transition-transform ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-[#6A6678] leading-relaxed border-t border-[#E6DEFF]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support Note */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6DEFF] hover:border-primary/40 shadow-xs transition-all space-y-4">
        <h3 className=" text-xl font-bold text-[#1b1831] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <span>Ask a Question or Share Feedback</span>
        </h3>
        <p className="text-xs text-[#6A6678]">
          Have questions about your goals or suggestions for your dashboard? Send a message to our support guides.
        </p>

        <form onSubmit={handleSupportSubmit} className="space-y-3">
          <textarea
            rows={3}
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            placeholder="Type your message or question here..."
            className="w-full p-3.5 rounded-2xl bg-[#FCF8FF] border border-[#E6DEFF] hover:border-primary/40 text-xs sm:text-sm text-[#1b1831] placeholder-[#737A73] focus:outline-none focus:border-black shadow-2xs transition-all resize-none"
          />

          {submitted && (
            <div className="p-2.5 rounded-xl bg-[#EBE5FF] border border-[#E6DEFF] text-primary text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! Your message has been received by the HighOrbit team.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!supportMessage.trim()}
            className="py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-primary hover:bg-primary-container border border-[#E6DEFF] hover:border-primary/40 disabled:opacity-50 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentHelpPage;
