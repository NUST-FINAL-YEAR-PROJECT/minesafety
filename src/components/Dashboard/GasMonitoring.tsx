import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Wind, Zap } from "lucide-react";

const GasMonitoring = () => {
  const gasLevels = [
    {
      name: "Methane (CH4)",
      level: 0.8,
      limit: 1.0,
      unit: "%",
      status: "normal",
      location: "Tunnel A"
    },
    {
      name: "Carbon Monoxide",
      level: 35,
      limit: 50,
      unit: "ppm",
      status: "warning", 
      location: "Shaft B"
    },
    {
      name: "Oxygen (O2)",
      level: 18.5,
      limit: 19.5,
      unit: "%",
      status: "critical",
      location: "Level 3"
    },
    {
      name: "Hydrogen Sulfide",
      level: 8,
      limit: 10,
      unit: "ppm", 
      status: "normal",
      location: "Main Drift"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "normal":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive";
      case "warning":
        return "bg-warning";
      case "normal":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Wind className="h-4 w-4" />
          Gas Monitoring System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gasLevels.map((gas, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{gas.name}</p>
                  <p className="text-xs text-muted-foreground">{gas.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {gas.level} {gas.unit}
                  </p>
                  <Badge className={`text-xs ${getStatusColor(gas.status)}`}>
                    {gas.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(gas.status)}`}
                  style={{ width: `${(gas.level / gas.limit) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 {gas.unit}</span>
                <span>Limit: {gas.limit} {gas.unit}</span>
              </div>
            </div>
          ))}
          
          {gasLevels.some(gas => gas.status === "critical") && (
            <Alert className="border-destructive/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Critical gas levels detected! Emergency ventilation activated.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GasMonitoring;