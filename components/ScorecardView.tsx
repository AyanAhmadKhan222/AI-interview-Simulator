
import React from 'react';
import { Scorecard } from '../types';
import { Button } from './common/Button';

export const ScorecardView: React.FC<{ scorecard: Scorecard; onReset: () => void }> = ({ scorecard, onReset }) => {
  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('STRONG_HIRE')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/50';
    if (verdict.includes('HIRE')) return 'text-sky-400 bg-sky-500/10 border-sky-500/50';
    return 'text-rose-500 bg-rose-500/10 border-rose-500/50';
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div /> {/* Removed heading content */}
        <div className={`px-8 py-4 rounded-2xl border-2 font-black text-2xl tracking-tight uppercase shadow-xl ${getVerdictColor(scorecard.verdict)}`}>
          {scorecard.verdict.replace('_', ' ')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] text-center shadow-lg backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-400 to-violet-500" />
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Master Score</div>
            <div className="text-7xl font-black bg-gradient-to-br from-emerald-400 via-sky-400 to-violet-600 bg-clip-text text-transparent italic">
              {scorecard.overallScore}%
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] space-y-6 shadow-md backdrop-blur-sm">
            <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-800/50 pb-3">
              Capability Flux
            </h3>
            {scorecard.metrics.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em]">
                  <span className="text-zinc-500">{m.category}</span>
                  <span className="text-white">{m.score}/10</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-sky-500 rounded-full" 
                    style={{ width: `${m.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Analysis */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] shadow-xl">
             <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text mb-8 uppercase tracking-tight">
               Insight Stream
             </h3>
             <div className="space-y-10">
               {scorecard.metrics.map((m, i) => (
                 <div key={i} className="space-y-4 group">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="text-[10px] font-black text-sky-400 uppercase tracking-[0.15em]">{m.category}</div>
                   </div>
                   <p className="text-base text-zinc-200 leading-relaxed font-semibold italic border-l-2 border-emerald-900/50 pl-6 py-1">
                     "{m.observation}"
                   </p>
                   <div className="bg-black/30 p-5 rounded-xl border border-zinc-800/50">
                     <div className="text-[9px] text-zinc-600 uppercase font-black mb-2 tracking-[0.2em]">Extraction Metadata</div>
                     <div className="text-xs text-zinc-400 leading-relaxed font-medium">{m.evidence}</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem]">
              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6 border-b border-zinc-800/50 pb-3">Strategic Assets</h4>
              <ul className="space-y-4">
                {scorecard.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-3 font-bold">
                    <span className="text-emerald-500 font-black">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem]">
              <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-6 border-b border-zinc-800/50 pb-3">Critical Vectors</h4>
              <ul className="space-y-4">
                {scorecard.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-3 font-bold">
                    <span className="text-rose-600 font-black">!</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-sky-500/20 p-10 rounded-[2.5rem] shadow-xl">
            <h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 bg-clip-text mb-8 uppercase tracking-tighter">
              Roadmap
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {scorecard.actionableFeedback.map((step, i) => (
                <div key={i} className="flex gap-5 p-5 bg-zinc-950/40 rounded-2xl border border-white/5 shadow-inner">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-violet-600 flex items-center justify-center text-white font-black text-lg">
                    {i + 1}
                  </div>
                  <div className="text-sm text-zinc-300 leading-relaxed font-bold flex items-center">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex justify-center pb-12">
            <Button variant="secondary" onClick={onReset} className="px-12 py-4 font-black uppercase tracking-[0.1em] text-xs rounded-xl">
              New Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
