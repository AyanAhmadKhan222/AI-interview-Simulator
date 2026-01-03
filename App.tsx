
import React, { useState } from 'react';
import { InterviewSession, UserProfile, InterviewMode, Scorecard, ChatMessage } from './types';
import { ResumeInput } from './components/ResumeInput';
import { InterviewStage } from './components/InterviewStage';
import { ScorecardView } from './components/ScorecardView';
import { generateFinalScorecard } from './services/geminiService';

const App: React.FC = () => {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const startInterview = (user: UserProfile, mode: InterviewMode) => {
    const newSession: InterviewSession = {
      id: Math.random().toString(36).substring(7),
      mode,
      user,
      history: [],
      records: [],
      status: 'ACTIVE',
      startTime: Date.now(),
    };
    setSession(newSession);
    setScorecard(null);
  };

  const updateHistory = (history: ChatMessage[]) => {
    if (session) {
      setSession({ ...session, history });
    }
  };

  const finishInterview = async () => {
    if (!session) return;
    
    setIsEvaluating(true);
    setSession({ ...session, status: 'EVALUATING' });
    
    try {
      const results = await generateFinalScorecard(
        session.user.resumeText,
        session.user.targetRole,
        session.history
      );
      setScorecard(results);
      setSession({ ...session, status: 'COMPLETED' });
    } catch (err) {
      alert("Evaluation engine encountered an error. Please check your transcript.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const reset = () => {
    setSession(null);
    setScorecard(null);
    setIsEvaluating(false);
  };

  if (isEvaluating) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-center p-8 overflow-hidden select-none">
        <h2 className="text-7xl md:text-8xl font-black italic tracking-tighter mb-8 bg-gradient-to-r from-[#38bdae] via-[#9166ff] to-[#d946ef] bg-clip-text text-transparent">
          Synchronizing
        </h2>
        
        <div className="flex flex-col items-center gap-6">
          <p className="text-[11px] text-[#38bdae] font-black uppercase tracking-[0.6em] opacity-90">
            BUFFERING
          </p>
          
          {/* Buffering Animation */}
          <div className="relative w-48 h-[1px] bg-white/5 rounded-full overflow-hidden">
            <div className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-[#38bdae] to-transparent animate-buffering-scan shadow-[0_0_10px_rgba(56,189,174,0.5)]" />
          </div>
        </div>

        <style>{`
          @keyframes buffering-scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          .animate-buffering-scan {
            animation: buffering-scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>
      </div>
    );
  }

  if (scorecard) {
    return <ScorecardView scorecard={scorecard} onReset={reset} />;
  }

  if (session && session.status === 'ACTIVE') {
    return (
      <InterviewStage 
        session={session} 
        onUpdateHistory={updateHistory} 
        onFinish={finishInterview}
      />
    );
  }

  return <ResumeInput onStart={startInterview} />;
};

export default App;
