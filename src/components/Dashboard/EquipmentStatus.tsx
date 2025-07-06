import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, Zap, Wind, Truck, Drill } from "lucide-react";

const EquipmentStatus = () => {
  const equipment = [
    {
      name: "Ventilation System A",
      location: "Main Shaft",
      status: "operational",
      efficiency: 95,
      icon: Wind,
      lastMaintenance: "2 days ago",
      nextMaintenance: "In 5 days"
    },
    {
      name: "Conveyor Belt #3",
      location: "Level 2 Transport",
      status: "maintenance",
      efficiency: 0,
      icon: Truck,
      lastMaintenance: "Today",
      nextMaintenance: "In 30 days"
    },
    {
      name: "Drilling Equipment",
      location: "Tunnel B",
      status: "operational",
      efficiency: 87,
      icon: Drill,
      lastMaintenance: "1 week ago",
      nextMaintenance: "In 2 weeks"
    },
    {
      name: "Power Generator #2",
      location: "Power Station",
      status: "warning",
      efficiency: 72,
      icon: Zap,
      lastMaintenance: "3 days ago",
      nextMaintenance: "Tomorrow"
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
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "bg-success";
    if (efficiency >= 70) return "bg-warning";
    if (efficiency > 0) return "bg-destructive";
    return "bg-muted";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Settings className="h-4 w-4" />
          Equipment Status Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.map((item, index) => {
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
                  
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Efficiency</span>
                    <span className="text-xs font-medium">{item.efficiency}%</span>
                  </div>
                  
                  <Progress 
                    value={item.efficiency} 
                    className="h-2"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Last Service</p>
                      <p className="font-medium">{item.lastMaintenance}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Service</p>
                      <p className="font-medium">{item.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-3 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-success">
                  {equipment.filter(e => e.status === "operational").length}
                </p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-warning">
                  {equipment.filter(e => e.status === "warning").length}
                </p>
                <p className="text-xs text-muted-foreground">Warning</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-info">
                  {equipment.filter(e => e.status === "maintenance").length}
                </p>
                <p className="text-xs text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentStatus;