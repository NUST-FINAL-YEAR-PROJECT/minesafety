import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Truck, 
  Drill, 
  Zap, 
  Thermometer, 
  Gauge,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings
} from "lucide-react";

const EquipmentTracking = () => {
  const equipment = [
    {
      id: "EQ-001",
      name: "Excavator Alpha",
      type: "excavator",
      location: "Tunnel A - Section 3",
      operator: "Mike Chen",
      status: "operational",
      utilization: 87,
      temperature: 85,
      fuelLevel: 68,
      lastMaintenance: "3 days ago",
      nextMaintenance: "4 days",
      workingHours: "6.5h",
      alerts: []
    },
    {
      id: "EQ-002", 
      name: "Drill Unit Beta",
      type: "drill",
      location: "Main Shaft - Level 2",
      operator: "Sarah Williams",
      status: "maintenance",
      utilization: 0,
      temperature: 45,
      fuelLevel: 92,
      lastMaintenance: "Today",
      nextMaintenance: "2 weeks",
      workingHours: "0h",
      alerts: ["Scheduled maintenance in progress"]
    },
    {
      id: "EQ-003",
      name: "Transport Gamma",
      type: "transport",
      location: "Equipment Bay",
      operator: "David Rodriguez", 
      status: "warning",
      utilization: 45,
      temperature: 102,
      fuelLevel: 23,
      lastMaintenance: "1 week ago",
      nextMaintenance: "Tomorrow",
      workingHours: "4.2h",
      alerts: ["High temperature", "Low fuel"]
    },
    {
      id: "EQ-004",
      name: "Generator Delta",
      type: "generator",
      location: "Power Station",
      operator: "Auto Mode",
      status: "operational",
      utilization: 65,
      temperature: 78,
      fuelLevel: 89,
      lastMaintenance: "5 days ago", 
      nextMaintenance: "1 week",
      workingHours: "24h",
      alerts: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "maintenance":
        return "bg-info text-info-foreground";
      case "offline":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case "excavator": return Truck;
      case "drill": return Drill;
      case "transport": return Truck;
      case "generator": return Zap;
      default: return Wrench;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return "text-success";
    if (utilization >= 50) return "text-warning";
    return "text-muted-foreground";
  };

  const getTempColor = (temp: number) => {
    if (temp >= 100) return "text-destructive";
    if (temp >= 90) return "text-warning";
    return "text-success";
  };

  const getFuelColor = (fuel: number) => {
    if (fuel <= 25) return "text-destructive";
    if (fuel <= 50) return "text-warning";
    return "text-success";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Wrench className="h-4 w-4" />
            Equipment Tracking & Status
          </CardTitle>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.map((item) => {
            const Icon = getEquipmentIcon(item.type);
            
            return (
              <div key={item.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status === "operational" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {item.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {item.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Location and Operator */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Op: {item.operator}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Gauge className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className={`text-sm font-medium ${getUtilizationColor(item.utilization)}`}>
                      {item.utilization}%
                    </p>
                    <p className="text-xs text-muted-foreground">Usage</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Thermometer className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className={`text-sm font-medium ${getTempColor(item.temperature)}`}>
                      {item.temperature}°C
                    </p>
                    <p className="text-xs text-muted-foreground">Temp</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className={`text-sm font-medium ${getFuelColor(item.fuelLevel)}`}>
                      {item.fuelLevel}%
                    </p>
                    <p className="text-xs text-muted-foreground">Fuel</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{item.workingHours}</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>

                {/* Maintenance Info */}
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-muted-foreground">
                    Last: {item.lastMaintenance}
                  </span>
                  <span className="text-muted-foreground">
                    Next: {item.nextMaintenance}
                  </span>
                </div>

                {/* Alerts */}
                {item.alerts.length > 0 && (
                  <div className="space-y-1">
                    {item.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-warning/10 rounded text-xs">
                        <AlertTriangle className="h-3 w-3 text-warning" />
                        <span className="text-warning">{alert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Summary Stats */}
          <div className="pt-3 border-t">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-success">3</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-warning">1</p>
                <p className="text-xs text-muted-foreground">Warning</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-info">1</p>
                <p className="text-xs text-muted-foreground">Maintenance</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-muted-foreground">74%</p>
                <p className="text-xs text-muted-foreground">Avg Usage</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentTracking;