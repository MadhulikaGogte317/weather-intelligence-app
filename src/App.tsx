/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WeatherDashboard } from './components/WeatherDashboard';
import { CloudSun } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-100 flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-8 py-6 bg-slate-900/50 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20 transition-transform hover:scale-105">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold font-display tracking-tight uppercase">Meteo <span className="text-sky-400">Intel</span></h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <WeatherDashboard />
      </main>

      {/* Footer / Status Bar */}
      <footer className="px-6 md:px-8 py-4 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Open-Meteo API Online</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Geocoding Service Active</span>
        </div>
        <div>
          Data powered by Open-Meteo • 2024 Meteor Intelligence Systems
        </div>
      </footer>
    </div>
  );
}
