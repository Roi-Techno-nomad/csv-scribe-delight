
import { useRealTimeUpdates, ConflictUpdate } from "@/hooks/useRealTimeUpdates";
import { AlertCircle, TrendingUp, Globe, Newspaper } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function LiveUpdates() {
  const { updates } = useRealTimeUpdates();

  const getIcon = (type: ConflictUpdate['type']) => {
    switch (type) {
      case 'conflict':
        return <AlertCircle className="h-4 w-4" />;
      case 'economic':
        return <TrendingUp className="h-4 w-4" />;
      case 'geopolitical':
        return <Globe className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Live Updates</h3>
      <div className="space-y-2">
        {updates.map((update, index) => (
          <Alert
            key={index}
            variant={update.severity === 'high' ? 'destructive' : 'default'}
            className="flex items-center"
          >
            {getIcon(update.type)}
            <div className="ml-3">
              <AlertTitle className="text-sm font-medium">
                {update.country} - {update.type.charAt(0).toUpperCase() + update.type.slice(1)} Update
              </AlertTitle>
              <AlertDescription className="text-sm mt-1">
                {update.description}
              </AlertDescription>
              <p className="text-xs text-muted-foreground mt-1">
                {update.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
}
