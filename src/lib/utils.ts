export function getWeatherDescription(code: number): { text: string; icon: string } {
  // WMO Weather interpretation codes
  // https://open-meteo.com/en/docs
  
  const codeMap: Record<number, { text: string; icon: string }> = {
    0: { text: 'Clear sky', icon: 'sun' },
    1: { text: 'Mainly clear', icon: 'sun-cloud' },
    2: { text: 'Partly cloudy', icon: 'cloud-sun' },
    3: { text: 'Overcast', icon: 'cloud' },
    45: { text: 'Fog', icon: 'fog' },
    48: { text: 'Depositing rime fog', icon: 'fog' },
    51: { text: 'Light drizzle', icon: 'cloud-drizzle' },
    53: { text: 'Moderate drizzle', icon: 'cloud-drizzle' },
    55: { text: 'Dense drizzle', icon: 'cloud-drizzle' },
    56: { text: 'Light freezing drizzle', icon: 'cloud-drizzle' },
    57: { text: 'Dense freezing drizzle', icon: 'cloud-drizzle' },
    61: { text: 'Slight rain', icon: 'cloud-rain' },
    63: { text: 'Moderate rain', icon: 'cloud-rain' },
    65: { text: 'Heavy rain', icon: 'cloud-rain' },
    66: { text: 'Light freezing rain', icon: 'cloud-rain' },
    67: { text: 'Heavy freezing rain', icon: 'cloud-rain' },
    71: { text: 'Slight snow fall', icon: 'cloud-snow' },
    73: { text: 'Moderate snow fall', icon: 'cloud-snow' },
    75: { text: 'Heavy snow fall', icon: 'cloud-snow' },
    77: { text: 'Snow grains', icon: 'cloud-snow' },
    80: { text: 'Slight rain showers', icon: 'cloud-rain' },
    81: { text: 'Moderate rain showers', icon: 'cloud-rain' },
    82: { text: 'Violent rain showers', icon: 'cloud-lightning' },
    85: { text: 'Slight snow showers', icon: 'cloud-snow' },
    86: { text: 'Heavy snow showers', icon: 'cloud-snow' },
    95: { text: 'Thunderstorm', icon: 'cloud-lightning' },
    96: { text: 'Thunderstorm with slight hail', icon: 'cloud-lightning' },
    99: { text: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' },
  };

  return codeMap[code] || { text: 'Unknown', icon: 'help-circle' };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function formatTime(timeString: string): string {
  const date = new Date(timeString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export function generateRecommendations(
  currentTemp: number, 
  maxRainProb: number
): string[] {
  const recommendations: string[] = [];

  if (maxRainProb > 60) {
    recommendations.push('Carry an umbrella.');
  }
  
  if (currentTemp > 35) {
    recommendations.push('Stay hydrated.');
  }

  if (maxRainProb < 20) {
    recommendations.push('Good day for outdoor activities.');
  }

  // A couple extra just for fun/logic
  if (currentTemp < 10) {
    recommendations.push('Wear a warm coat.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Enjoy your day!');
  }

  return recommendations;
}
