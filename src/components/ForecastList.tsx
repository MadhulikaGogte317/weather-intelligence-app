import React from 'react';
import { DailyForecast } from '../lib/api';
import { formatDate, getWeatherDescription } from '../lib/utils';
import { WeatherIcon } from './WeatherIcon';
import { Droplets } from 'lucide-react';

interface ForecastListProps {
  daily: DailyForecast;
}

export function ForecastList({ daily }: ForecastListProps) {
  // Open-Meteo returns up to 7 days, let's take up to 7
  const daysCount = Math.min(daily.time.length, 7);
  const indices = Array.from({ length: daysCount }, (_, i) => i);

  return (
    <section className="flex-1 flex flex-col min-h-0">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Extended 7-Day Forecast</h3>
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {indices.map(i => {
          const { icon } = getWeatherDescription(daily.weathercode[i]);
          return (
            <div key={daily.time[i]} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between shadow-lg hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-300">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{formatDate(daily.time[i]).split(',')[0]}</p>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center my-2 shrink-0 group-hover:bg-slate-700 transition-colors">
                <WeatherIcon iconName={icon} className="w-5 h-5 text-sky-400" />
              </div>
              
              <div className="text-center">
                <p className="text-sm font-bold text-white">{Math.round(daily.temperature_2m_max[i])}°</p>
                <p className="text-[10px] text-slate-500">{Math.round(daily.temperature_2m_min[i])}°</p>
              </div>
              
              <div className="mt-2 pt-2 border-t border-slate-800 w-full text-center">
                <p className="text-[10px] font-medium text-sky-500 flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3" />
                  {daily.precipitation_probability_max[i]}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
