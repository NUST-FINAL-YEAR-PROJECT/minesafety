import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, AlertCircle, CheckCircle } from "lucide-react";

const ComplianceSection = () => {
  const complianceItems = [
    {
      title: "Automated Compliance Reports",
      icon: FileText,
      status: "completed",
      description: "All reports generated"
    },
    {
      title: "AI-Suggested Corrective Actions",
      icon: Shield,
      status: "in-progress",
      description: "3 actions pending"
    },
    {
      title: "Emergency Protocol Dashboard",
      icon: AlertCircle,
      status: "active",
      description: "All systems operational"
    },
    {
      title: "Automated Corrective Actions",
      icon: CheckCircle,
      status: "completed",
      description: "5 actions completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      case "active":
        return "bg-info text-info-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Compliance & Safety Measures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {complianceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(item.status)}`}>
                  {item.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceSection;