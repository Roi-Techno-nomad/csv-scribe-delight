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
        'Syria',
        'Regime Survival',
        'Multiple',
        'Strained',
        'Non-aligned',
        'High',
        'Severe',
        'High',
        'Massive',
        'Multiple',
        'Nationwide',
        'Severe',
        'Extensive',
        'High',
        'Conventional/Chemical',
        'Low',
        'Moderate',
        'Unstable',
        'Complex',
        'Significant',
        'Urban Destruction'
      ],
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
        'Yemen',
        'Power Control',
        'Ongoing',
        'Complex',
        'Regional',
        'Moderate',
        'High',
        'High',
        'Significant',
        'Multiple Factions',
        'Widespread',
        'Severe',
        'Regional',
        'Moderate',
        'Mixed',
        'Poor',
        'Limited',
        'Fragmented',
        'Divided',
        'Regional',
        'Drought/Famine'
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
