export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; // state/province
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  weathercode: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyForecast;
  timezone: string;
}

export async function searchLocation(query: string): Promise<Location[]> {
  if (!query.trim()) return [];
  
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );
  
  if (!response.ok) {
    throw new Error('Network failure while searching for location.');
  }
  
  const data = await response.json();
  return data.results || [];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Weather API is currently unavailable.');
  }
  
  const data = await response.json();
  return data;
}
