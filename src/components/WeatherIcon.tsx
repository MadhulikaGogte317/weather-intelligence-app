import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  HelpCircle 
} from 'lucide-react';

interface WeatherIconProps {
  iconName: string;
  className?: string;
}

export function WeatherIcon({ iconName, className }: WeatherIconProps) {
  switch (iconName) {
    case 'sun': return <Sun className={className} />;
    case 'sun-cloud': return <CloudSun className={className} />;
    case 'cloud': return <Cloud className={className} />;
    case 'fog': return <CloudFog className={className} />;
    case 'cloud-drizzle': return <CloudDrizzle className={className} />;
    case 'cloud-rain': return <CloudRain className={className} />;
    case 'cloud-snow': return <CloudSnow className={className} />;
    case 'cloud-lightning': return <CloudLightning className={className} />;
    default: return <HelpCircle className={className} />;
  }
}
