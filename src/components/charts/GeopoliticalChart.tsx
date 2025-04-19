
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';
import { southAsiaData } from '@/data/southAsiaConflictData';

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981', '#6366F1', '#F59E0B', '#EC4899'];

const data = southAsiaData.map(country => ({
  name: country.Country,
  value: mapRelationsToValue(country.Geopolitical_Affiliation),
}));

function mapRelationsToValue(affiliation: string): number {
  const baseValue = 1;
  const multiplier = affiliation.includes('Strategic') ? 1.5 :
                    affiliation.includes('Protected') ? 1.2 :
                    affiliation.includes('Balanced') ? 1 : 0.8;
  return baseValue * multiplier;
}

export function GeopoliticalChart() {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-semibold mb-4">Geopolitical Affiliations</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
