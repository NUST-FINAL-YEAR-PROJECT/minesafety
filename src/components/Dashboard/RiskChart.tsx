import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";

const RiskChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Predictive Risk Grafts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Heat map visualization */}
          <div className="grid grid-cols-8 gap-1 h-32">
            {Array.from({ length: 64 }, (_, i) => {
              const intensity = Math.random();
              let bgColor = "bg-green-200";
              if (intensity > 0.7) bgColor = "bg-red-400";
              else if (intensity > 0.4) bgColor = "bg-yellow-300";
              else if (intensity > 0.2) bgColor = "bg-green-300";
              
              return (
                <div
                  key={i}
                  className={`${bgColor} rounded-sm`}
                  style={{ opacity: 0.3 + intensity * 0.7 }}
                />
              );
            })}
          </div>
          
          {/* Risk indicators */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span className="text-muted-foreground">Gas leak detected at loc. 3</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span className="text-muted-foreground">Fall hazard identified near Equipment A</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span className="text-muted-foreground">Unsafe behavior by worker in zone 2</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskChart;