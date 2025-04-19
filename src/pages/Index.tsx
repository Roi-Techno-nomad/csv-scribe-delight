import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { CSVViewer } from "@/components/CSVViewer";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, ChartBar } from "lucide-react";
import { generateCSVData } from "@/data/southAsiaConflictData";
import { ConflictIntensityChart } from "@/components/charts/ConflictIntensityChart";
import { GeopoliticalChart } from "@/components/charts/GeopoliticalChart";
import { StabilityRadarChart } from "@/components/charts/StabilityRadarChart";
import { LiveUpdates } from "@/components/LiveUpdates";

export default function Index() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [showCharts, setShowCharts] = useState(false);

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

  const generateSouthAsiaCSV = () => {
    setCsvData(generateCSVData());
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">South Asian Conflict Analysis Viewer</h1>
        
        {!csvData.length ? (
          <div className="space-y-6">
            <FileUpload onFileLoad={setCsvData} />
            <div className="flex justify-center">
              <Button 
                onClick={generateSouthAsiaCSV}
                variant="outline"
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Generate South Asia Analysis Data
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
                  variant="outline"
                  onClick={() => setShowCharts(!showCharts)}
                  className="gap-2"
                >
                  <ChartBar className="h-4 w-4" />
                  {showCharts ? 'Hide Charts' : 'Show Charts'}
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
            
            {showCharts && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <ConflictIntensityChart />
                <GeopoliticalChart />
                <StabilityRadarChart />
              </div>
            )}
            
            <LiveUpdates />
            
            <CSVViewer data={csvData} />
          </div>
        )}
      </div>
    </div>
  );
}
