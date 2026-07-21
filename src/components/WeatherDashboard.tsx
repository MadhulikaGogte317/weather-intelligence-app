import React, { useState, useEffect } from 'react';
import { Search, Loader2, MapPin, AlertCircle } from 'lucide-react';
import { Location, WeatherData, searchLocation, getWeather } from '../lib/api';
import { generateRecommendations } from '../lib/utils';
import { WeatherCard } from './WeatherCard';
import { ForecastList } from './ForecastList';
import { Recommendations } from './Recommendations';
import { WeatherChart } from './WeatherChart';

export function WeatherDashboard() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchResults([]);
    
    try {
      const results = await searchLocation(query);
      if (results.length === 0) {
        setError('No city found. Please try a different name.');
      } else {
        // Automatically select the first result to save a click, or show a list if multiple.
        // For simplicity and speed, we will auto-select the first one.
        handleSelectLocation(results[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to search location.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = async (location: Location) => {
    setSelectedLocation(location);
    setIsLoadingWeather(true);
    setError(null);
    setWeatherData(null);
    
    try {
      const data = await getWeather(location.latitude, location.longitude);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Pre-load a default city to show something initially (optional)
  useEffect(() => {
    setQuery('London');
    const loadDefault = async () => {
      try {
        const results = await searchLocation('London');
        if (results.length > 0) {
          handleSelectLocation(results[0]);
        }
      } catch (e) {
        // Ignore initial load error
      }
    };
    loadDefault();
  }, []);

  const locationLabel = selectedLocation 
    ? `${selectedLocation.name}${selectedLocation.admin1 ? `, ${selectedLocation.admin1}` : ''}, ${selectedLocation.country}`
    : '';

  // Get max probability of rain today for recommendations
  const maxRainProbToday = weatherData ? weatherData.daily.precipitation_probability_max[0] : 0;
  
  const recommendations = weatherData 
    ? generateRecommendations(
        weatherData.current_weather.temperature, 
        maxRainProbToday,
        weatherData.current_weather.windspeed
      )
    : [];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col h-full">
      {/* Search Header */}
      <div className="mb-8 max-w-xl mx-auto w-full">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city (e.g. San Francisco)..."
            className="w-full bg-slate-800 border border-slate-700 text-white px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder-slate-500 shadow-inner group-hover:border-slate-600"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-2 bottom-2 px-6 bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-xl text-sm transition-colors flex items-center disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
          </button>
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoadingWeather && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-sky-500" />
          <p>Fetching latest weather...</p>
        </div>
      )}

      {/* Main Content */}
      {!isLoadingWeather && weatherData && selectedLocation && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-center gap-2 mb-6 text-slate-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">{locationLabel}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
              <WeatherCard 
                locationName={selectedLocation.name} 
                currentWeather={weatherData.current_weather} 
              />
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-6 h-full">
              <Recommendations recommendations={recommendations} />
              <WeatherChart daily={weatherData.daily} />
              <ForecastList daily={weatherData.daily} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
