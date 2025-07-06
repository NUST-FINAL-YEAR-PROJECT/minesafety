import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Wind, 
  Settings, 
  Shield, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const quickStats = [
    {
      title: "Workers Underground",
      value: "247",
      status: "normal",
      icon: Users,
      link: "/workers"
    },
    {
      title: "Gas Levels",
      value: "1 Critical",
      status: "critical",
      icon: Wind,
      link: "/gas-monitoring"
    },
    {
      title: "Equipment Status",
      value: "12 Active",
      status: "normal",
      icon: Settings,
      link: "/equipment"
    },
    {
      title: "Emergency Systems",
      value: "All Ready",
      status: "ready",
      icon: Shield,
      link: "/emergency"
    }
  ];

  const recentAlerts = [
    {
      time: "14:32",
      type: "Critical",
      message: "Oxygen levels below threshold in Level 3",
      location: "Tunnel Section B"
    },
    {
      time: "13:45", 
      type: "Warning",
      message: "Worker heart rate elevated - Maria Garcia",
      location: "Shaft B - Level 1"
    },
    {
      time: "12:15",
      type: "Info",
      message: "Ventilation system maintenance completed",
      location: "Main Shaft"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "ready":
      case "normal":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "text-destructive";
      case "Warning":
        return "text-warning";
      default:
        return "text-info";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      {/* Emergency Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              Mine Safety Alert: Oxygen levels critical in Level 3 - Emergency protocols active
            </span>
          </div>
          <Badge className="bg-destructive text-destructive-foreground animate-pulse">
            ACTIVE
          </Badge>
        </div>
      </div>
      
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mine Safety Overview</h1>
          <p className="text-muted-foreground">Comprehensive monitoring and control center</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={stat.link}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Icon className="h-8 w-8 text-muted-foreground" />
                        <Badge className={`text-xs ${getStatusColor(stat.status)}`}>
                          {stat.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <Badge className={`text-xs ${getAlertColor(alert.type)}`}>
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/gas-monitoring">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2">
                    <Wind className="h-6 w-6" />
                    <span className="text-sm">Gas Monitoring</span>
                  </Button>
                </Link>
                
                <Link to="/workers">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Worker Tracking</span>
                  </Button>
                </Link>
                
                <Link to="/equipment">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2">
                    <Settings className="h-6 w-6" />
                    <span className="text-sm">Equipment</span>
                  </Button>
                </Link>
                
                <Link to="/emergency">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Emergency</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-success">98.5%</p>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-info">24/7</p>
                <p className="text-sm text-muted-foreground">Monitoring</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">15</p>
                <p className="text-sm text-muted-foreground">Cameras Online</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-info">2.5k</p>
                <p className="text-sm text-muted-foreground">CFM Airflow</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">Normal</p>
                <p className="text-sm text-muted-foreground">All Zones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;