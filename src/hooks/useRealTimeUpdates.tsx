
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ConflictUpdate {
  country: string;
  type: 'conflict' | 'economic' | 'geopolitical' | 'news';
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  description: string;
  source: string;
  sourceUrl: string;
  region: 'South Asia' | 'East Asia' | 'Europe' | 'Central Asia';
}

export function useRealTimeUpdates() {
  const [updates, setUpdates] = useState<ConflictUpdate[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const mockUpdate: ConflictUpdate = generateMockUpdate();
      setUpdates(prev => [mockUpdate, ...prev].slice(0, 50));
      
      toast({
        title: `${mockUpdate.type.charAt(0).toUpperCase() + mockUpdate.type.slice(1)} Update`,
        description: mockUpdate.description,
        variant: mockUpdate.severity === 'high' ? 'destructive' : 'default',
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return { updates };
}

function generateMockUpdate(): ConflictUpdate {
  const regions = {
    'South Asia': ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka', 'Bhutan', 'Maldives'],
    'East Asia': ['China', 'Japan', 'South Korea', 'North Korea', 'Mongolia', 'Taiwan', 'Vietnam', 'Thailand', 'Philippines', 'Indonesia', 'Malaysia', 'Singapore', 'Myanmar', 'Cambodia', 'Laos'],
    'Europe': ['Germany', 'France', 'UK', 'Italy', 'Spain', 'Poland', 'Ukraine', 'Russia', 'Sweden', 'Finland', 'Norway', 'Denmark', 'Netherlands', 'Belgium', 'Portugal', 'Ireland', 'Greece', 'Austria', 'Switzerland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Serbia', 'Croatia', 'Slovakia', 'Slovenia', 'Estonia', 'Latvia', 'Lithuania', 'Belarus', 'Moldova'],
    'Central Asia': ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Azerbaijan', 'Armenia', 'Georgia']
  };

  const sources = {
    conflict: [
      { name: 'UN Security Council', url: 'https://www.un.org/securitycouncil/' },
      { name: 'NATO Command', url: 'https://www.nato.int/' },
      { name: 'Defense Intelligence Agency', url: 'https://www.dia.mil/' },
      { name: 'Regional Security Forum', url: 'https://aseanregionalforum.asean.org/' },
      { name: 'International Crisis Group', url: 'https://www.crisisgroup.org/' }
    ],
    economic: [
      { name: 'World Bank', url: 'https://www.worldbank.org/' },
      { name: 'IMF', url: 'https://www.imf.org/' },
      { name: 'Regional Development Bank', url: 'https://www.adb.org/' },
      { name: 'Bloomberg', url: 'https://www.bloomberg.com/' },
      { name: 'Reuters Economics', url: 'https://www.reuters.com/business/' }
    ],
    geopolitical: [
      { name: 'UN General Assembly', url: 'https://www.un.org/en/ga/' },
      { name: 'EU Commission', url: 'https://ec.europa.eu/' },
      { name: 'ASEAN Secretariat', url: 'https://asean.org/' },
      { name: 'Diplomatic Sources', url: 'https://foreignpolicy.com/' },
      { name: 'Council on Foreign Relations', url: 'https://www.cfr.org/' }
    ],
    news: [
      { name: 'Reuters', url: 'https://www.reuters.com/' },
      { name: 'Associated Press', url: 'https://apnews.com/' },
      { name: 'AFP', url: 'https://www.afp.com/en' },
      { name: 'Regional News Networks', url: 'https://www.aljazeera.com/' },
      { name: 'BBC World', url: 'https://www.bbc.com/news/world' }
    ]
  };

  const types: ConflictUpdate['type'][] = ['conflict', 'economic', 'geopolitical', 'news'];
  const severities: ConflictUpdate['severity'][] = ['low', 'medium', 'high'];
  
  const updates = {
    conflict: [
      'Border tensions reported',
      'Military movement detected',
      'Diplomatic crisis escalating',
      'Security alert issued',
      'Defense forces mobilized',
      'Naval exercises conducted',
      'Airspace violations reported',
      'Increased military presence',
      'Cross-border incidents reported',
      'Peacekeeping mission requested'
    ],
    economic: [
      'Currency fluctuation observed',
      'Trade relations shifting',
      'Economic sanctions imposed',
      'Market volatility increasing',
      'Trade deficit widening',
      'Investment patterns changing',
      'Economic reform announced',
      'Resource disputes emerging',
      'Financial regulations tightened',
      'Economic corridor development'
    ],
    geopolitical: [
      'Political alliance formed',
      'International agreement signed',
      'Regional cooperation initiative',
      'Diplomatic ties strained',
      'Strategic partnership announced',
      'Territorial disputes escalating',
      'Maritime claims contested',
      'Regional summit scheduled',
      'Diplomatic mission established',
      'Bilateral relations normalized'
    ],
    news: [
      'Breaking development reported',
      'Policy change announced',
      'Strategic shift detected',
      'Major reform implemented',
      'Critical announcement made',
      'Election results impacting relations',
      'Leadership change affecting policy',
      'Public opinion shift noted',
      'Protests affecting governance',
      'Media regulation changes'
    ]
  };

  const regionKeys = Object.keys(regions) as (keyof typeof regions)[];
  const selectedRegion = regionKeys[Math.floor(Math.random() * regionKeys.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const country = regions[selectedRegion][Math.floor(Math.random() * regions[selectedRegion].length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const updateText = updates[type][Math.floor(Math.random() * updates[type].length)];
  const sourceData = sources[type][Math.floor(Math.random() * sources[type].length)];

  return {
    country,
    type,
    severity,
    timestamp: new Date(),
    description: `${country}: ${updateText}`,
    source: sourceData.name,
    sourceUrl: sourceData.url,
    region: selectedRegion
  };
}
