import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wind, Search, Filter } from "lucide-react";
import MonitoringCard from "./MonitoringCard";

const SensorData = () => {
  return (
    <div className="space-y-4">
      <MonitoringCard title="Wearable & IoT Sensors" status="active">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-destructive" />
              <span className="text-sm">Heat Rate</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">55 PPM</p>
              <p className="text-xs text-muted-foreground">24°C</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-warning" />
              <span className="text-sm">Gas Level</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">10 PPM</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span className="text-xs text-muted-foreground">Alert</span>
              </div>
            </div>
          </div>
        </div>
      </MonitoringCard>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search & Filter</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search & Filter</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorData;