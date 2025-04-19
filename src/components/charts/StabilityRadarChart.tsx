
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { southAsiaData } from '@/data/southAsiaConflictData';

const getStabilityScore = (country: typeof southAsiaData[0]) => ({
  name: country.Country,
  political: mapStabilityToScore(country.Political_Stability),
  economic: mapStabilityToScore(country.Economic_Status),
  security: mapStabilityToScore(country.Internal_Security),
  diplomatic: mapStabilityToScore(country.Diplomatic_Relations),
  cyber: mapStabilityToScore(country.Cyber_Capabilities),
});

function mapStabilityToScore(status: string): number {
  if (status.includes('High') || status.includes('Strong') || status.includes('Stable')) return 5;
  if (status.includes('Moderate') || status.includes('Mixed')) return 3;
  if (status.includes('Low') || status.includes('Limited') || status.includes('Weak')) return 1;
  return 2;
}

const data = southAsiaData.map(getStabilityScore);

export function StabilityRadarChart() {
  return (
    <div className="h-[400px] w-full">
      <h3 className="text-lg font-semibold mb-4">Regional Stability Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          {['political', 'economic', 'security', 'diplomatic', 'cyber'].map((key, index) => (
            <Radar
              key={key}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
              dataKey={key}
              stroke={`hsl(${index * 60}, 70%, 50%)`}
              fill={`hsl(${index * 60}, 70%, 50%)`}
              fillOpacity={0.3}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
