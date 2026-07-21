import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { DailyForecast } from '../lib/api';
import { formatDate } from '../lib/utils';

interface WeatherChartProps {
  daily: DailyForecast;
}

export function WeatherChart({ daily }: WeatherChartProps) {
  const daysCount = Math.min(daily.time.length, 7);
  const data = Array.from({ length: daysCount }).map((_, i) => ({
    name: formatDate(daily.time[i]).split(',')[0], // e.g., 'Mon'
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
  }));

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl w-full h-[300px] flex flex-col">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Temperature Trend</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} 
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="max" 
              name="Max Temp" 
              stroke="#38bdf8" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
              activeDot={{ r: 6, fill: '#38bdf8' }}
            />
            <Line 
              type="monotone" 
              dataKey="min" 
              name="Min Temp" 
              stroke="#94a3b8" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
              activeDot={{ r: 6, fill: '#94a3b8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
