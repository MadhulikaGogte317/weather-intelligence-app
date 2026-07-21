import React from 'react';
import { CurrentWeather } from '../lib/api';
import { getWeatherDescription, formatTime } from '../lib/utils';
import { WeatherIcon } from './WeatherIcon';
import { Wind, Thermometer, Clock } from 'lucide-react';

interface WeatherCardProps {
  locationName: string;
  currentWeather: CurrentWeather;
}

export function WeatherCard({ locationName, currentWeather }: WeatherCardProps) {
  const { text, icon } = getWeatherDescription(currentWeather.weathercode);
  
  return (
    <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-[32px] p-8 shadow-2xl shadow-blue-900/40 relative overflow-hidden flex flex-col h-full min-h-[350px] transition-transform duration-500 hover:scale-[1.02]">
      {/* Decorative background circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/70 font-medium uppercase tracking-widest text-xs mb-1">Current Weather</p>
            <h2 className="text-3xl font-bold font-display text-white tracking-tight">{locationName}</h2>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-4 mb-6 transition-transform duration-500 hover:scale-105">
          <span className="text-[80px] sm:text-[100px] font-bold font-display text-white leading-none tracking-tighter drop-shadow-lg">
            {Math.round(currentWeather.temperature)}°
          </span>
          <p className="text-xl font-medium text-sky-100 flex items-center gap-2 mt-2">
            {text}
            <WeatherIcon iconName={icon} className="w-6 h-6" />
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center">
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><Wind className="w-3 h-3" /> Wind Speed</p>
            <p className="text-xl font-semibold text-white">{currentWeather.windspeed} <span className="text-sm font-medium text-white/70">km/h</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center">
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</p>
            <p className="text-xl font-semibold text-white">{formatTime(currentWeather.time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
