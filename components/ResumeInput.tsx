
import React, { useState } from 'react';
import { UserProfile, InterviewMode } from '../types';
import { Button } from './common/Button';
import { INTERVIEW_MODES_CONFIG } from '../constants';

interface ResumeInputProps {
  onStart: (user: UserProfile, mode: InterviewMode) => void;
}

export const ResumeInput: React.FC<ResumeInputProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [resume, setResume] = useState('');
  const [mode, setMode] = useState<InterviewMode>(InterviewMode.FAANG_TECHNICAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !resume) return;
    onStart({ name, targetRole: role, resumeText: resume }, mode);
  };

  return (
    <div className="min-h-screen bg-[#06080a] text-white py-8 px-4 md:px-12 flex flex-col items-center">
      {/* Header Section - Star-blink enabled title */}
      <div className="w-full max-w-4xl mb-8 text-center select-none">
        <h1 className="text-[42px] md:text-[68px] font-black italic tracking-tighter leading-[0.85] mb-4 bg-gradient-to-r from-[#6e8efb] via-[#a777e3] to-[#eb3349] bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] animate-vortex-star-blink">
          VORTEX AI
        </h1>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] md:text-lg font-black uppercase tracking-[0.4em] text-white flex flex-wrap justify-center gap-x-3">
            SIMULATE THE <span className="text-[#00f2ff] drop-shadow-[0_0_12px_rgba(0,242,255,0.6)]">IMPOSSIBLE</span>
            SECURE THE <span className="text-[#ff00ff] drop-shadow-[0_0_12px_rgba(255,0,255,0.6)]">UNSTOPPABLE</span>
          </p>
          
          <div className="w-32 md:w-[350px] h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-[#ff00ff] opacity-60 rounded-full mt-1" />
        </div>
      </div>

      {/* Interface Container - Reduced padding and width */}
      <div className="w-full max-w-[1100px] bg-[#0d1117] border border-zinc-800/50 rounded-[32px] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        
        {/* Simulation Selector - Minimized Box and Font Size */}
        <div className="mb-8 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-4xl">
            {(Object.entries(INTERVIEW_MODES_CONFIG) as [InterviewMode, any][]).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`group flex flex-col justify-between h-20 p-3.5 text-left rounded-[14px] border-2 transition-all duration-500 relative overflow-hidden ${
                  mode === key 
                    ? 'border-[#00f2ff] bg-[#00f2ff]/5 ring-4 ring-[#00f2ff]/5 shadow-[0_0_30px_rgba(0,242,255,0.15)]' 
                    : 'border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-800/30'
                }`}
              >
                {mode === key && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00f2ff] shadow-[0_2px_8px_rgba(0,242,255,0.4)]" />
                )}

                <div className="space-y-0 z-10">
                  <h3 className={`text-[13px] md:text-[15px] font-black leading-tight tracking-tight uppercase whitespace-pre-wrap ${
                    mode === key ? 'text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]' : 'text-zinc-100'
                  }`}>
                    {config.name}
                  </h3>
                </div>
                
                <div className="space-y-1 z-10 mt-auto">
                  <div className={`text-[7px] font-black uppercase tracking-[0.2em] ${
                    mode === key ? 'text-cyan-400' : 'text-zinc-600'
                  }`}>
                    {config.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Neural Input System - Tighter layout */}
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#00f2ff] uppercase tracking-[0.3em] block pl-1 opacity-90">
                TARGET ROLE DESIGNATION
              </label>
              <input 
                required
                className="w-full bg-black/50 border border-zinc-800/50 rounded-xl p-5 text-lg text-white focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/30 focus:outline-none transition-all placeholder:text-zinc-900 font-bold uppercase tracking-widest shadow-xl"
                placeholder="SYSTEM ARCHITECT"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#ff00ff] uppercase tracking-[0.3em] block pl-1 opacity-90">
                CANDIDATE FORENSIC DATA
              </label>
              <input 
                required
                className="w-full bg-black/50 border border-zinc-800/50 rounded-xl p-5 text-lg text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff]/30 focus:outline-none transition-all placeholder:text-zinc-900 font-bold uppercase tracking-widest shadow-xl"
                placeholder="IDENTIFICATION TAG"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 group">
            <div className="flex justify-between items-end pl-1">
              <label className="text-[11px] font-black text-white uppercase tracking-[0.4em] block group-hover:text-[#00f2ff] transition-colors">
                EXPERIENCE MATRIX <span className="text-[#00f2ff] ml-1 opacity-80">(RESUME)</span>
              </label>
              <div className="flex items-center gap-2 pr-1 mb-1">
                 <span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest animate-pulse">Link Ready</span>
                 <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
            </div>
            <div className="relative">
              <textarea 
                required
                className="w-full h-28 bg-black/60 border border-zinc-800 rounded-[20px] p-6 text-base text-white focus:border-[#00f2ff] focus:ring-2 focus:ring-[#00f2ff]/5 focus:outline-none transition-all duration-500 resize-none font-medium leading-relaxed shadow-inner placeholder:text-zinc-800 group-hover:border-zinc-700"
                placeholder="Inject candidate experience data..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center gap-6">
            <Button 
              type="submit" 
              className="w-full max-w-lg py-4 text-lg font-black uppercase tracking-[0.2em] rounded-xl bg-gradient-to-r from-[#00aee8] via-[#2b5ae7] to-[#a329cc] hover:shadow-[0_0_40px_rgba(43,90,231,0.4)] transition-all duration-500 transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 border-b-4 border-black/30"
            >
              IGNITE SESSION
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </Button>

            {/* Feature Highlights - Smaller and tighter */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center p-5 rounded-[24px] hover:bg-zinc-900/40 transition-all duration-500">
                <h4 className="text-[11px] font-black text-[#00f2ff] uppercase tracking-[0.4em] mb-2">
                  NEURAL LOGIC
                </h4>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                  DEEP ANALYSIS OF CLAIMS.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-5 rounded-[24px] hover:bg-zinc-900/40 transition-all duration-500">
                <h4 className="text-[11px] font-black text-[#ff00ff] uppercase tracking-[0.4em] mb-2">
                  AGGRESSIVE PROBE
                </h4>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                  IDENTIFY CEILINGS.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-5 rounded-[24px] hover:bg-zinc-900/40 transition-all duration-500">
                <h4 className="text-[11px] font-black text-[#10b981] uppercase tracking-[0.4em] mb-2">
                  BIOMETRIC SYNC
                </h4>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">
                  STRESS SIMULATION.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 opacity-20 mt-4">
              <div className="h-[1px] w-24 bg-gradient-to-l from-zinc-800 to-transparent" />
              <p className="text-[9px] text-zinc-400 uppercase tracking-[0.4em] font-black">
                PROTOCOL V4.2
              </p>
              <div className="h-[1px] w-24 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes vortex-star-blink {
          0%, 100% { 
            opacity: 1; 
            filter: brightness(1) drop-shadow(0 0 10px rgba(110,142,251,0.4)); 
            transform: scale(1);
          }
          20% { 
            opacity: 0.85; 
            filter: brightness(1.6) drop-shadow(0 0 35px rgba(167,119,227,0.9)); 
            transform: scale(1.015);
          }
          40% { 
            opacity: 0.95; 
            filter: brightness(1.1) drop-shadow(0 0 15px rgba(235,51,73,0.5)); 
            transform: scale(1.005);
          }
          60% { 
            opacity: 0.8; 
            filter: brightness(1.8) drop-shadow(0 0 45px rgba(0,242,255,1)); 
            transform: scale(1.02);
          }
          80% { 
            opacity: 1; 
            filter: brightness(1.3) drop-shadow(0 0 20px rgba(255,0,255,0.6)); 
            transform: scale(1.01);
          }
        }
        .animate-vortex-star-blink {
          animation: vortex-star-blink 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
