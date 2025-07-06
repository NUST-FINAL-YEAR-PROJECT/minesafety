import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Activity,
  TrendingUp,
  TrendingDown 
} from "lucide-react";

const EnvironmentalMonitoring = () => {
  const environmentalData = [
    {
      name: "Temperature",
      value: 18.5,
      unit: "°C",
      status: "normal",
      trend: "stable",
      icon: Thermometer,
      min: 15,
      max: 25,
      location: "Main Tunnel"
    },
    {
      name: "Humidity",
      value: 78,
      unit: "%",
      status: "high",
      trend: "increasing",
      icon: Droplets,
      min: 40,
      max: 70,
      location: "Level 2"
    },
    {
      name: "Air Pressure",
      value: 1.02,
      unit: "atm",
      status: "normal",
      trend: "stable",
      icon: Gauge,
      min: 0.95,
      max: 1.05,
      location: "Deep Section"
    },
    {
      name: "Noise Level",
      value: 85,
      unit: "dB",
      status: "warning",
      trend: "decreasing",
      icon: Activity,
      min: 0,
      max: 90,
      location: "Equipment Area"
    }
  ];

  const ventilationData = [
    {
      location: "Main Intake",
      airflow: 2500,
      unit: "CFM",
      status: "optimal"
    },
    {
      location: "Tunnel A Exhaust", 
      airflow: 1800,
      unit: "CFM",
      status: "normal"
    },
    {
      location: "Level 2 Intake",
      airflow: 1200,
      unit: "CFM",
      status: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "normal":
        return "bg-success text-success-foreground";
      case "warning":
      case "high":
        return "bg-warning text-warning-foreground";
      case "low":
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-3 w-3 text-warning" />;
      case "decreasing":
        return <TrendingDown className="h-3 w-3 text-info" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-muted" />;
    }
  };

  const getProgressValue = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Activity className="h-4 w-4" />
          Environmental Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Environmental Parameters */}
          <div className="space-y-4">
            {environmentalData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="text-lg font-semibold">
                          {item.value} {item.unit}
                        </p>
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={getProgressValue(item.value, item.min, item.max)}
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.min} {item.unit}</span>
                      <span>{item.max} {item.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ventilation System */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Ventilation Airflow</h4>
            {ventilationData.map((vent, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded border">
                <div>
                  <p className="text-sm font-medium">{vent.location}</p>
                  <p className="text-xs text-muted-foreground">
                    {vent.airflow} {vent.unit}
                  </p>
                </div>
                <Badge className={`text-xs ${getStatusColor(vent.status)}`}>
                  {vent.status.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>

          {/* Environmental Summary */}
          <div className="pt-3 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-success">
                  {environmentalData.filter(e => e.status === "normal").length}
                </p>
                <p className="text-xs text-muted-foreground">Normal</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-warning">
                  {environmentalData.filter(e => e.status === "warning" || e.status === "high").length}
                </p>
                <p className="text-xs text-muted-foreground">Warnings</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-info">
                  {ventilationData.filter(v => v.status === "optimal").length}
                </p>
                <p className="text-xs text-muted-foreground">Optimal Vents</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalMonitoring;