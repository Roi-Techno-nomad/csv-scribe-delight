import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { CSVViewer } from "@/components/CSVViewer";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";

export default function Index() {
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleDownload = () => {
    if (!csvData.length) return;
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateConflictAnalysisCSV = () => {
    const conflictParameters = [
      [
        'Country',
        'State_Intention',
        'History_of_War',
        'Neighbor_Relations',
        'Geopolitical_Affiliation',
        'Superpower_Interest',
        'Conflict_Intensity',
        'Casualties',
        'Displacement',
        'Actors_Involved',
        'Geographical_Spread',
        'Economic_Damage',
        'International_Involvement',
        'Media_Coverage',
        'Weapon_Use',
        'Economic_Status',
        'Military_Capability',
        'Political_Stability',
        'Socio_Cultural',
        'External_Influence',
        'Environmental_Factors'
      ],
      [
        'India',
        'Global Power Aspirations',
        'Border Conflicts/Internal',
        'Complex/Strategic',
        'Strategic Autonomy',
        'Very High',
        'Low to Moderate',
        'Limited/Sporadic',
        'Internal Migration',
        'State/Separatist/Terror',
        'Border/Internal Regions',
        'Limited Impact',
        'Strategic Partnerships',
        'High Global Interest',
        'Advanced/Nuclear',
        'Major Economy',
        'Self-Reliant/Nuclear',
        'Democratic/Stable',
        'Highly Diverse',
        'Balanced/Strategic',
        'Climate/Water Stress'
      ],
      [
        'Pakistan',
        'Regional Security',
        'Multiple Wars/Ongoing',
        'India-Centric/Complex',
        'China-Allied',
        'High Strategic',
        'Moderate to High',
        'Significant/Ongoing',
        'Border/Internal',
        'State/Non-State/Terror',
        'Border/Tribal Areas',
        'Significant Impact',
        'China/US Interest',
        'Regional Focus',
        'Nuclear/Conventional',
        'Economic Challenges',
        'Nuclear/Limited Conv.',
        'Political Transitions',
        'Islamic Republic',
        'Strong External',
        'Floods/Drought'
      ],
      [
        'Bangladesh',
        'Economic Development',
        'Independence War',
        'Regional Cooperation',
        'Balanced Approach',
        'Moderate',
        'Very Low',
        'Historical',
        'Climate Migration',
        'Political Parties',
        'Urban/Coastal',
        'Climate Related',
        'Development Aid',
        'Development Focus',
        'Basic Military',
        'Fast Growing',
        'Limited/Defensive',
        'Democratic/Stable',
        'Bengali/Islamic',
        'Development Partners',
        'Sea Level/Floods'
      ],
      [
        'Afghanistan',
        'Internal Consolidation',
        'Continuous Conflict',
        'Regional Tension',
        'Currently Isolated',
        'Declining Interest',
        'High Internal',
        'Significant Historic',
        'Large Scale/Ongoing',
        'Multiple Factions',
        'Nationwide/Variable',
        'Severe/Chronic',
        'Limited Current',
        'Reduced Coverage',
        'Light Weapons',
        'Humanitarian Crisis',
        'Irregular Forces',
        'Transitional Phase',
        'Tribal/Religious',
        'Regional Powers',
        'Drought/Resource'
      ],
      [
        'Nepal',
        'Stability Focus',
        'Civil War History',
        'India-China Balance',
        'Non-Aligned',
        'Low',
        'Very Low',
        'Post-Conflict',
        'Labor Migration',
        'Political Groups',
        'Mountainous Regions',
        'Development Needs',
        'Aid Dependent',
        'Limited Coverage',
        'Basic Security',
        'Developing',
        'Limited Mountain',
        'Federal Democracy',
        'Multi-Ethnic',
        'India/China Influence',
        'Mountain/Glacial'
      ],
      [
        'Sri Lanka',
        'Economic Recovery',
        'Civil War Ended',
        'Regional Trade',
        'Non-Aligned',
        'Moderate',
        'Post-Conflict',
        'Historical',
        'Return Migration',
        'Political/Economic',
        'Island-Wide',
        'Economic Crisis',
        'IMF/Regional',
        'Economic Focus',
        'Internal Security',
        'Recovery Phase',
        'Self-Defense',
        'Democratic/Crisis',
        'Multi-Ethnic',
        'Regional/Global',
        'Coastal/Climate'
      ],
      [
        'Bhutan',
        'Sustainable Development',
        'Limited Conflict',
        'India Partnership',
        'India Protected',
        'Very Low',
        'None Current',
        'Minimal',
        'Controlled',
        'State Actors',
        'Mountainous',
        'Limited',
        'Development Aid',
        'Minimal',
        'Basic Defense',
        'Developing',
        'India Supported',
        'Monarchy/Stable',
        'Buddhist/Traditional',
        'India Guided',
        'Mountain Ecology'
      ],
      [
        'Maldives',
        'Climate Survival',
        'No Major Conflicts',
        'Regional Trade',
        'Strategic Maritime',
        'Growing',
        'None',
        'None',
        'Climate Threat',
        'Political Parties',
        'Archipelagic',
        'Climate Impact',
        'Climate Aid',
        'Climate Focus',
        'Coast Guard',
        'Tourism Based',
        'Maritime Security',
        'Democratic',
        'Island Muslim',
        'Regional Powers',
        'Sea Level Rise'
      ]
    ];
    
    setCsvData(conflictParameters);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CSV File Viewer</h1>
        
        {!csvData.length ? (
          <div className="space-y-6">
            <FileUpload onFileLoad={setCsvData} />
            <div className="flex justify-center">
              <Button 
                onClick={generateConflictAnalysisCSV}
                variant="outline"
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Generate Conflict Analysis Sample
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {csvData.length - 1} rows • {csvData[0]?.length || 0} columns
              </div>
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCsvData([])}
                >
                  Upload New File
                </Button>
                <Button
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              </div>
            </div>
            <CSVViewer data={csvData} />
          </div>
        )}
      </div>
    </div>
  );
}
