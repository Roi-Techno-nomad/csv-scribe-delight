
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
      // South Asia
      [
        'India',
        'Regional Power',
        'Multiple',
        'Complex',
        'Non-aligned',
        'High',
        'Moderate',
        'Low',
        'Limited',
        'State/Non-state',
        'Regional',
        'Moderate',
        'Significant',
        'High',
        'Conventional',
        'Growing',
        'Strong',
        'Stable',
        'Diverse',
        'Moderate',
        'Climate Change'
      ],
      [
        'Pakistan',
        'Security',
        'Multiple',
        'Strained',
        'China-aligned',
        'High',
        'Moderate',
        'Moderate',
        'Significant',
        'Multiple',
        'Regional',
        'Significant',
        'High',
        'Moderate',
        'Conventional',
        'Struggling',
        'Nuclear-capable',
        'Unstable',
        'Complex',
        'High',
        'Water Scarcity'
      ],
      [
        'Bangladesh',
        'Development',
        'Historical',
        'Mixed',
        'Non-aligned',
        'Low',
        'Low',
        'Low',
        'Environmental',
        'Limited',
        'Localized',
        'Moderate',
        'Limited',
        'Low',
        'Limited',
        'Developing',
        'Limited',
        'Stable',
        'Homogeneous',
        'Moderate',
        'Flooding'
      ],
      [
        'Afghanistan',
        'Internal Control',
        'Extensive',
        'Tense',
        'Isolated',
        'Moderate',
        'High',
        'High',
        'Massive',
        'Multiple',
        'Nationwide',
        'Severe',
        'Reduced',
        'Moderate',
        'Conventional',
        'Poor',
        'Limited',
        'Fragile',
        'Traditional',
        'High',
        'Drought'
      ],
      // Europe
      [
        'Ukraine',
        'Territorial Defense',
        'Recent',
        'Mixed',
        'Western-aligned',
        'Very High',
        'High',
        'Significant',
        'Large-scale',
        'State/Non-state',
        'Regional',
        'Extensive',
        'Global',
        'Extensive',
        'Conventional',
        'Developing',
        'Growing',
        'Challenged',
        'Unified',
        'Major',
        'Agricultural Impact'
      ],
      [
        'Poland',
        'NATO Defense',
        'Historical',
        'Supportive',
        'EU/NATO',
        'High',
        'Low',
        'None',
        'Immigration',
        'State',
        'Border',
        'Minor',
        'Active',
        'Moderate',
        'Defensive',
        'Strong',
        'Modern',
        'Stable',
        'Homogeneous',
        'Significant',
        'Industrial'
      ],
      [
        'Serbia',
        'Regional Influence',
        'Recent',
        'Tense',
        'Russia-aligned',
        'Moderate',
        'Low',
        'None',
        'Historical',
        'State',
        'Regional',
        'Low',
        'Limited',
        'Moderate',
        'Limited',
        'Developing',
        'Moderate',
        'Stable',
        'Mixed',
        'Significant',
        'Urban'
      ],
      [
        'Belarus',
        'Regime Control',
        'None Recent',
        'Allied',
        'Russia-aligned',
        'Moderate',
        'Low',
        'None',
        'Political',
        'State',
        'National',
        'Moderate',
        'Limited',
        'Low',
        'Limited',
        'Strained',
        'Moderate',
        'Authoritarian',
        'Unified',
        'High',
        'Industrial'
      ],
      [
        'Moldova',
        'Sovereignty',
        'Limited',
        'Cautious',
        'EU-leaning',
        'Growing',
        'Low',
        'None',
        'Limited',
        'State',
        'Regional',
        'Moderate',
        'Growing',
        'Low',
        'Limited',
        'Developing',
        'Limited',
        'Stable',
        'Mixed',
        'High',
        'Agricultural'
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
