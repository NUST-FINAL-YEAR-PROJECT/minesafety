import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Heart, AlertCircle, Phone } from "lucide-react";

const WorkerTracking = () => {
  const workers = [
    {
      id: "W001",
      name: "John Smith",
      location: "Tunnel A - Level 2",
      heartRate: 78,
      status: "active",
      lastUpdate: "2 min ago",
      emergencyContact: true
    },
    {
      id: "W002", 
      name: "Maria Garcia",
      location: "Shaft B - Level 1",
      heartRate: 95,
      status: "elevated",
      lastUpdate: "1 min ago",
      emergencyContact: false
    },
    {
      id: "W003",
      name: "David Chen",
      location: "Main Drift",
      heartRate: 65,
      status: "normal",
      lastUpdate: "30 sec ago",
      emergencyContact: false
    },
    {
      id: "W004",
      name: "Sarah Johnson",
      location: "Equipment Bay",
      heartRate: 0,
      status: "offline",
      lastUpdate: "10 min ago",
      emergencyContact: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "elevated":
        return "bg-warning text-warning-foreground";
      case "offline":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-info text-info-foreground";
    }
  };

  const getHeartRateStatus = (heartRate: number) => {
    if (heartRate === 0) return "offline";
    if (heartRate > 90) return "elevated";
    if (heartRate < 60) return "low";
    return "normal";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Users className="h-4 w-4" />
            Worker Location & Health
          </CardTitle>
          <Badge className="bg-info text-info-foreground">
            {workers.filter(w => w.status !== "offline").length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workers.map((worker) => (
            <div key={worker.id} className="p-3 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    worker.status === "active" ? "bg-success animate-pulse" :
                    worker.status === "elevated" ? "bg-warning" :
                    worker.status === "offline" ? "bg-destructive" : "bg-muted"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{worker.name}</p>
                    <p className="text-xs text-muted-foreground">{worker.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {worker.emergencyContact && (
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                      <Phone className="h-3 w-3" />
                    </Button>
                  )}
                  <Badge className={`text-xs ${getStatusColor(worker.status)}`}>
                    {worker.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{worker.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <Heart className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {worker.heartRate > 0 ? `${worker.heartRate} BPM` : "No Signal"}
                  </span>
                  {worker.heartRate > 90 && (
                    <AlertCircle className="h-3 w-3 text-warning" />
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Last update: {worker.lastUpdate}
                </p>
              </div>
            </div>
          ))}
          
          <div className="pt-3 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Workers Underground:</span>
              <span className="font-medium">{workers.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Emergency Alerts:</span>
              <span className="font-medium text-destructive">
                {workers.filter(w => w.status === "offline" || w.heartRate > 100).length}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerTracking;