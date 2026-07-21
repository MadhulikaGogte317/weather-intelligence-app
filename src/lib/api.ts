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
  
  let response;
  try {
    response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
  } catch (error) {
    throw new Error('Network error occurred. Please check your internet connection.');
  }
  
  if (!response.ok) {
    throw new Error('Weather API is currently unavailable.');
  }
  
  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Received invalid data from the Weather API.');
  }
  return data.results || [];
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
  
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error('Network error occurred. Please check your internet connection.');
  }
  
  if (!response.ok) {
    throw new Error('Weather API is currently unavailable.');
  }
  
  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Received invalid data from the Weather API.');
  }

  if (!data || !data.daily || !data.daily.time || data.daily.time.length === 0) {
    throw new Error('No forecast data is returned for this location.');
  }

  return data;
}
