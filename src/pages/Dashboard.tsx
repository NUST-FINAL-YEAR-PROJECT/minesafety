import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Wind, 
  Settings, 
  Shield, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  Eye,
  Zap,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="p-6 space-y-6">
      {/* Emergency Alert Banner */}
      <Alert className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-destructive font-medium">
          <strong>CRITICAL ALERT:</strong> Oxygen levels below threshold in Level 3 - Emergency protocols active
          <Badge className="ml-2 bg-destructive text-destructive-foreground animate-pulse">
            ACTIVE
          </Badge>
        </AlertDescription>
      </Alert>
      
      {/* Header with Time */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mine Safety Overview</h1>
          <p className="text-muted-foreground">Comprehensive monitoring and control center</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span>Current Time</span>
          </div>
          <div className="text-lg font-mono font-semibold">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <Link to={stat.link}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {stat.value}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div key={index} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <Badge className={`text-xs ${
                        alert.type === "Critical" ? "bg-destructive/20 text-destructive" :
                        alert.type === "Warning" ? "bg-warning/20 text-warning" :
                        "bg-info/20 text-info"
                      }`}>
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
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                  <Wind className="h-6 w-6" />
                  <span className="text-sm">Gas Monitoring</span>
                </Button>
              </Link>
              
              <Link to="/workers">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Worker Tracking</span>
                </Button>
              </Link>
              
              <Link to="/equipment">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Equipment</span>
                </Button>
              </Link>
              
              <Link to="/emergency">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
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
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <p className="text-2xl font-bold text-success">98.5%</p>
              </div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-info" />
                <p className="text-2xl font-bold text-info">24/7</p>
              </div>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <p className="text-2xl font-bold text-warning">3</p>
              </div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Eye className="h-4 w-4 text-success" />
                <p className="text-2xl font-bold text-success">15</p>
              </div>
              <p className="text-sm text-muted-foreground">Cameras Online</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Wind className="h-4 w-4 text-info" />
                <p className="text-2xl font-bold text-info">2.5k</p>
              </div>
              <p className="text-sm text-muted-foreground">CFM Airflow</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <p className="text-2xl font-bold text-success">Normal</p>
              </div>
              <p className="text-sm text-muted-foreground">All Zones</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;