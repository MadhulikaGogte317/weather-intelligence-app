import React from 'react';
import { Lightbulb } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
        Weather Intelligence Recommendations
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-2xl flex items-start gap-4 hover:bg-sky-500/20 transition-all duration-300">
            <div className="bg-sky-500 p-2 rounded-lg shrink-0 shadow-lg shadow-sky-500/30">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-sky-400 font-bold text-sm leading-tight mb-1">Insight</h4>
              <p className="text-xs text-slate-300">{rec}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
