import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface MonitoringCardProps {
  title: string;
  children: ReactNode;
  status?: "active" | "warning" | "error" | "normal";
}

const MonitoringCard = ({ title, children, status = "normal" }: MonitoringCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "error":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Badge className={`text-xs px-2 py-1 ${getStatusColor()}`}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default MonitoringCard;