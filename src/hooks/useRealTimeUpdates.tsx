
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ConflictUpdate {
  country: string;
  type: 'conflict' | 'economic' | 'geopolitical' | 'news';
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  description: string;
  source: string;
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
    'East Asia': ['China', 'Japan', 'South Korea', 'North Korea', 'Mongolia', 'Taiwan'],
    'Europe': ['Germany', 'France', 'UK', 'Italy', 'Spain', 'Poland', 'Ukraine', 'Russia'],
    'Central Asia': ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan']
  };

  const sources = {
    conflict: ['UN Security Council', 'NATO Command', 'Defense Intelligence Agency', 'Regional Security Forum'],
    economic: ['World Bank', 'IMF', 'Regional Development Bank', 'Bloomberg', 'Reuters Economics'],
    geopolitical: ['UN General Assembly', 'EU Commission', 'ASEAN Secretariat', 'Diplomatic Sources'],
    news: ['Reuters', 'Associated Press', 'AFP', 'Regional News Networks']
  };

  const types: ConflictUpdate['type'][] = ['conflict', 'economic', 'geopolitical', 'news'];
  const severities: ConflictUpdate['severity'][] = ['low', 'medium', 'high'];
  
  const updates = {
    conflict: [
      'Border tensions reported',
      'Military movement detected',
      'Diplomatic crisis escalating',
      'Security alert issued',
      'Defense forces mobilized'
    ],
    economic: [
      'Currency fluctuation observed',
      'Trade relations shifting',
      'Economic sanctions imposed',
      'Market volatility increasing',
      'Trade deficit widening'
    ],
    geopolitical: [
      'Political alliance formed',
      'International agreement signed',
      'Regional cooperation initiative',
      'Diplomatic ties strained',
      'Strategic partnership announced'
    ],
    news: [
      'Breaking development reported',
      'Policy change announced',
      'Strategic shift detected',
      'Major reform implemented',
      'Critical announcement made'
    ]
  };

  const regionKeys = Object.keys(regions) as (keyof typeof regions)[];
  const selectedRegion = regionKeys[Math.floor(Math.random() * regionKeys.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const country = regions[selectedRegion][Math.floor(Math.random() * regions[selectedRegion].length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const updateText = updates[type][Math.floor(Math.random() * updates[type].length)];
  const source = sources[type][Math.floor(Math.random() * sources[type].length)];

  return {
    country,
    type,
    severity,
    timestamp: new Date(),
    description: `${country}: ${updateText}`,
    source,
    region: selectedRegion
  };
}

