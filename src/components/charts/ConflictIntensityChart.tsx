
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';
import { southAsiaData } from '@/data/southAsiaConflictData';

const data = southAsiaData.map(country => ({
  name: country.Country,
  intensity: mapIntensityToNumber(country.Conflict_Intensity),
}));

function mapIntensityToNumber(intensity: string): number {
  const intensityMap: Record<string, number> = {
    'None': 0,
    'Very Low': 1,
    'Low to Moderate': 2,
    'Moderate': 3,
    'Moderate to High': 4,
    'High Internal': 5,
  };
  return intensityMap[intensity] || 0;
}

export function ConflictIntensityChart() {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-semibold mb-4">Conflict Intensity by Country</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="intensity" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
