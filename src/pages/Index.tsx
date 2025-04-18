
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

  const generateSSFParametersCSV = () => {
    const ssfParameters = [
      ['Parameter', 'Setting', 'Unit', 'Recommended Range', 'Notes'],
      ['Temperature', '28', '°C', '25-30', 'Optimal for most fungi'],
      ['pH', '5.5', 'pH units', '4.5-6.5', 'Varies by microorganism'],
      ['Moisture Content', '65', '%', '60-70', 'Critical for growth'],
      ['Substrate Type', 'Rice Bran', '-', '-', 'Agricultural waste preferred'],
      ['Particle Size', '2-5', 'mm', '1-5', 'Affects aeration and surface area'],
      ['Aeration Rate', '0.5', 'vvm', '0.1-1.0', 'Low for fungal cultures'],
      ['Inoculum Size', '10', '%', '5-15', 'Percentage of substrate'],
      ['Incubation Time', '7', 'days', '5-14', 'Depends on target product'],
      ['Agitation Frequency', '2', 'times/day', '1-3', 'Prevents heat buildup'],
      ['Bed Height', '5', 'cm', '3-10', 'Affects heat transfer'],
      ['Substrate Pretreatment', 'Autoclaved', '-', '-', 'For sterilization'],
      ['Nitrogen Source', 'Ammonium Sulfate', '-', '-', 'Supplementation if needed'],
      ['C:N Ratio', '15:1', '-', '10:1-30:1', 'Optimizes microbial growth'],
      ['Water Activity', '0.98', 'aw', '0.95-0.99', 'Critical parameter'],
      ['Fermentation Scale', 'Lab', '-', '-', 'Lab/Pilot/Industrial'],
      ['Supplementation', 'Mineral Salts', '-', '-', 'As required by strain'],
      ['Recovery Method', 'Solvent Extraction', '-', '-', 'Product dependent'],
      ['Relative Humidity', '85', '%', '80-95', 'Environmental control'],
      ['Light Conditions', 'Dark', '-', '-', 'Species dependent']
    ];
    
    setCsvData(ssfParameters);
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
                onClick={generateSSFParametersCSV}
                variant="outline"
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Generate SSF Parameters Sample
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
