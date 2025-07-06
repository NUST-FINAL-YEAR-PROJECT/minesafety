import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const IncidentLog = () => {
  const incidents = [
    {
      id: "INC-001",
      status: "In Progress",
      time: "14:21",
      priority: "High"
    },
    {
      id: "INC-002", 
      status: "Resolved",
      time: "12:35",
      priority: "Medium"
    },
    {
      id: "INC-003",
      status: "Acknowledged",
      time: "8:30",
      priority: "Low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-warning text-warning-foreground";
      case "Resolved":
        return "bg-success text-success-foreground";
      case "Acknowledged":
        return "bg-info text-info-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-destructive";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Incident Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground mb-2">Response Status</div>
          {incidents.map((incident, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded border">
              <div className="flex items-center gap-3">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">{incident.id}</p>
                  <p className="text-xs text-muted-foreground">{incident.time}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`text-xs mb-1 ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </Badge>
                <p className={`text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                  {incident.priority}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Automated Risk</h4>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Elevated Alert</span>
            <Badge className="bg-info text-info-foreground text-xs">In Progress</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentLog;