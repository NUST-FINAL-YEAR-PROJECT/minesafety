import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Shield, 
  Siren, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const EmergencySystem = () => {
  const emergencyProtocols = [
    {
      name: "Gas Leak Protocol",
      status: "standby",
      lastTested: "Yesterday",
      responseTime: "< 2 min"
    },
    {
      name: "Cave-in Response",
      status: "active",
      lastTested: "3 days ago", 
      responseTime: "< 5 min"
    },
    {
      name: "Fire Suppression",
      status: "standby",
      lastTested: "1 week ago",
      responseTime: "< 3 min"
    },
    {
      name: "Evacuation System",
      status: "ready",
      lastTested: "Today",
      responseTime: "< 10 min"
    }
  ];

  const evacuationRoutes = [
    {
      route: "Route A - Main Shaft",
      status: "clear",
      capacity: "150 workers",
      estimatedTime: "8 minutes"
    },
    {
      route: "Route B - Emergency Shaft",
      status: "clear", 
      capacity: "100 workers",
      estimatedTime: "12 minutes"
    },
    {
      route: "Route C - Service Tunnel",
      status: "blocked",
      capacity: "75 workers",
      estimatedTime: "N/A"
    }
  ];

  const getProtocolStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-destructive text-destructive-foreground";
      case "ready":
        return "bg-success text-success-foreground";
      case "standby":
        return "bg-info text-info-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRouteStatusColor = (status: string) => {
    switch (status) {
      case "clear":
        return "bg-success text-success-foreground";
      case "blocked":
        return "bg-destructive text-destructive-foreground";
      case "restricted":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Shield className="h-4 w-4" />
          Emergency Response System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Emergency Alert */}
          {emergencyProtocols.some(p => p.status === "active") && (
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm">
                <strong>ACTIVE EMERGENCY:</strong> Cave-in Response Protocol activated in Tunnel Section B
              </AlertDescription>
            </Alert>
          )}

          {/* Emergency Controls */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="destructive" className="h-12">
              <Siren className="h-4 w-4 mr-2" />
              Emergency Alert
            </Button>
            <Button variant="outline" className="h-12">
              <Phone className="h-4 w-4 mr-2" />
              Call Rescue Team
            </Button>
          </div>

          {/* Protocol Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Emergency Protocols</h4>
            {emergencyProtocols.map((protocol, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    protocol.status === "active" ? "bg-destructive animate-pulse" :
                    protocol.status === "ready" ? "bg-success" :
                    "bg-info"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{protocol.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Tested: {protocol.lastTested} • Response: {protocol.responseTime}
                    </p>
                  </div>
                </div>
                <Badge className={`text-xs ${getProtocolStatusColor(protocol.status)}`}>
                  {protocol.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* Evacuation Routes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Evacuation Routes</h4>
            {evacuationRoutes.map((route, index) => (
              <div key={index} className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{route.route}</p>
                  </div>
                  <Badge className={`text-xs ${getRouteStatusColor(route.status)}`}>
                    {route.status === "clear" ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                     route.status === "blocked" ? <XCircle className="h-3 w-3 mr-1" /> : null}
                    {route.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div>
                    <p>Capacity: {route.capacity}</p>
                  </div>
                  <div>
                    <p>Est. Time: {route.estimatedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Statistics */}
          <div className="pt-3 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-success">2</p>
                <p className="text-xs text-muted-foreground">Routes Available</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-info">250</p>
                <p className="text-xs text-muted-foreground">Total Capacity</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencySystem;