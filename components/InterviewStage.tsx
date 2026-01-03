import React, { useState, useEffect, useRef } from 'react';
import { InterviewSession, ChatMessage } from '../types';
import { getInterviewerTurn, InterviewerResponse } from '../services/geminiService';
import { Button } from './common/Button';

interface InterviewStageProps {
  session: InterviewSession;
  onUpdateHistory: (history: ChatMessage[]) => void;
  onFinish: () => void;
}

export const InterviewStage: React.FC<InterviewStageProps> = ({ session, onUpdateHistory, onFinish }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session.history.length === 0) {
      handleNextTurn([]);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.history, thought]);

  const handleNextTurn = async (history: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const turn: InterviewerResponse = await getInterviewerTurn(
        session.mode,
        session.user.resumeText,
        session.user.targetRole,
        history
      );
      
      const newHistory: ChatMessage[] = [
        ...history,
        { role: 'interviewer', content: turn.interviewer_text, timestamp: Date.now() }
      ];
      
      setThought(turn.internal_thought);
      onUpdateHistory(newHistory);
    } catch (err) {
      alert("System interruption. Attempting reconnection...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'candidate', content: userInput, timestamp: Date.now() };
    const updatedHistory = [...session.history, userMsg];
    onUpdateHistory(updatedHistory);
    setUserInput('');
    
    await handleNextTurn(updatedHistory);
  };

  const renderThoughtText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="text-[#00f2ff] font-black drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] px-1">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#06080a]">
      {/* Header - Minimal */}
      <header className="border-b border-zinc-800/50 px-6 py-2.5 bg-[#0d1117]/80 backdrop-blur-2xl flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-[#00f2ff] rounded-full animate-ping absolute opacity-40" />
            <div className="w-2.5 h-2.5 bg-[#00f2ff] rounded-full relative z-10 shadow-[0_0_15px_rgba(0,242,255,0.8)]" />
          </div>
          <div>
            <h2 className="text-sm font-black text-transparent bg-gradient-to-r from-[#00f2ff] via-sky-400 to-[#ff00ff] bg-clip-text uppercase tracking-[0.2em] leading-none mb-0.5">
              Neural Vortex Active
            </h2>
            <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="text-[#00f2ff]/60">CORE_v4.2</span>
            </p>
          </div>
        </div>
        <Button 
          variant="primary" 
          className="text-[12px] font-black py-2.5 px-6 bg-blue-600 border border-blue-400 text-white rounded-lg uppercase tracking-[0.15em] hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] transition-all shadow-[0_0_20px_rgba(37,99,235,0.6)] active:scale-95" 
          onClick={onFinish}
        >
          FINALIZE
        </Button>
      </header>

      {/* Transcript Area - Increased width for more rectangular feel */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth">
        <div className="max-w-5xl mx-auto space-y-5">
          {session.history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'interviewer' ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-full max-w-[95%] md:max-w-[92%] p-4 rounded-[12px] relative transition-all duration-500 ${
                msg.role === 'interviewer' 
                  ? 'bg-[#0d1117] border border-zinc-800 text-zinc-100 shadow-xl' 
                  : 'bg-zinc-900 border border-[#ff00ff]/20 text-white shadow-lg'
              }`}>
                <div className={`text-[7.5px] uppercase font-black mb-1.5 tracking-[0.3em] flex items-center gap-2 ${msg.role === 'interviewer' ? 'text-zinc-500' : 'text-[#ff00ff]'}`}>
                   {msg.role === 'interviewer' ? 'NEURAL INTERROGATOR' : 'CANDIDATE UPLINK'}
                </div>
                <div className="text-[14px] leading-relaxed whitespace-pre-wrap font-bold tracking-tight">{msg.content}</div>
              </div>
            </div>
          ))}

          {thought && !isLoading && (
            <div className="flex justify-start w-full animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="bg-[#080a0c]/80 border border-zinc-800/40 p-5 rounded-[12px] w-full max-w-4xl shadow-2xl relative overflow-hidden backdrop-blur-md">
                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6366f1] via-[#00f2ff] to-transparent opacity-40" />
                 
                 <div className="text-[9px] uppercase font-black mb-2.5 text-[#6366f1] tracking-[0.4em] flex items-center gap-3">
                   CORE LOGIC
                 </div>
                 
                 <div className="text-sm md:text-base font-medium text-zinc-300 italic leading-relaxed tracking-tight antialiased">
                   {renderThoughtText(thought)}
                 </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start items-center gap-4">
              <div className="bg-[#0d1117] border border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[#00f2ff] rounded-full animate-bounce [animation-duration:0.8s]" />
                  <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-[#ff00ff] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Mapping...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input Area - Matches transcript width */}
      <div className="p-3 md:p-4 border-t border-zinc-800/50 bg-[#0d1117]/80 backdrop-blur-3xl">
        <div className="max-w-5xl mx-auto relative group">
          <textarea
            className="w-full bg-black/40 border border-zinc-800 group-hover:border-zinc-700 rounded-[12px] p-3.5 pr-32 text-[15px] text-white focus:border-[#00f2ff] focus:ring-2 focus:ring-[#00f2ff]/5 focus:outline-none min-h-[54px] max-h-[200px] transition-all font-bold leading-normal shadow-inner resize-none"
            placeholder="Relay response..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="absolute bottom-3 right-3">
             <Button 
                variant="primary" 
                className="py-1.5 px-5 text-[11px] font-black uppercase tracking-[0.2em] rounded-md bg-gradient-to-r from-[#00aee8] to-[#2b5ae7] shadow-lg" 
                onClick={handleSend}
                isLoading={isLoading}
                disabled={!userInput.trim()}
             >
               TRANSMIT
             </Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-2 flex justify-between items-center px-1">
          <p className="text-[7px] text-zinc-700 uppercase tracking-[0.3em] font-black">CMD UPLINK — SHIFT+ENTER MULTILINE</p>
        </div>
      </div>
    </div>
  );
};