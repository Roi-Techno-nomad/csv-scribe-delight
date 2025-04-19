
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ConflictUpdate {
  country: string;
  type: 'conflict' | 'economic' | 'geopolitical' | 'news';
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  description: string;
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
  const countries = ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'];
  const types: ConflictUpdate['type'][] = ['conflict', 'economic', 'geopolitical', 'news'];
  const severities: ConflictUpdate['severity'][] = ['low', 'medium', 'high'];
  
  const updates = {
    conflict: [
      'Border tensions reported',
      'Military movement detected',
      'Diplomatic crisis escalating'
    ],
    economic: [
      'Currency fluctuation observed',
      'Trade relations shifting',
      'Economic sanctions imposed'
    ],
    geopolitical: [
      'Political alliance formed',
      'International agreement signed',
      'Regional cooperation initiative'
    ],
    news: [
      'Breaking development reported',
      'Policy change announced',
      'Strategic shift detected'
    ]
  };

  const type = types[Math.floor(Math.random() * types.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const updateText = updates[type][Math.floor(Math.random() * updates[type].length)];

  return {
    country,
    type,
    severity,
    timestamp: new Date(),
    description: `${country}: ${updateText}`
  };
}
