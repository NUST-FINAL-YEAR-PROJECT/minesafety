import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle,
  Users,
  Clock,
  Target,
  Download,
  Filter
} from "lucide-react";

const Analytics = () => {
  const kpiData = [
    {
      title: "Safety Score",
      value: "94.2%",
      change: "+2.3%",
      trend: "up",
      color: "text-success"
    },
    {
      title: "Incident Rate",
      value: "0.12/1000hrs",
      change: "-15%",
      trend: "down", 
      color: "text-success"
    },
    {
      title: "Equipment Uptime",
      value: "98.7%",
      change: "+1.2%",
      trend: "up",
      color: "text-success"
    },
    {
      title: "Response Time",
      value: "2.4 min",
      change: "-8%",
      trend: "down",
      color: "text-success"
    }
  ];

  const safetyMetrics = [
    { metric: "Near Miss Reports", value: 23, target: 30, percentage: 77 },
    { metric: "Safety Training Completion", value: 187, target: 200, percentage: 94 },
    { metric: "PPE Compliance", value: 96, target: 100, percentage: 96 },
    { metric: "Emergency Drill Participation", value: 178, target: 200, percentage: 89 }
  ];

  const riskAreas = [
    {
      area: "Tunnel Section B",
      riskLevel: "High",
      incidents: 3,
      trend: "increasing",
      lastIncident: "2 days ago"
    },
    {
      area: "Main Shaft",
      riskLevel: "Medium", 
      incidents: 1,
      trend: "stable",
      lastIncident: "1 week ago"
    },
    {
      area: "Equipment Bay",
      riskLevel: "Low",
      incidents: 0,
      trend: "decreasing", 
      lastIncident: "3 weeks ago"
    }
  ];

  const workerAnalytics = [
    {
      department: "Mining Operations",
      totalWorkers: 89,
      activeShift: 45,
      safetyScore: 92,
      incidents: 2
    },
    {
      department: "Equipment Maintenance", 
      totalWorkers: 34,
      activeShift: 12,
      safetyScore: 97,
      incidents: 0
    },
    {
      department: "Safety & Security",
      totalWorkers: 18,
      activeShift: 6,
      safetyScore: 99,
      incidents: 0
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground"; 
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Safety metrics, performance analysis, and insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-success" />
                    )}
                    <span className={`text-xs ${kpi.color}`}>{kpi.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="safety" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="safety">Safety Metrics</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="workers">Worker Analytics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Safety Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.metric}</span>
                        <span>{metric.value}/{metric.target}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${metric.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{metric.percentage}% Complete</span>
                        <Badge variant="outline" className="text-xs">
                          {metric.percentage >= 90 ? "On Track" : "Needs Attention"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  Safety Incidents Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                    <p className="text-xs text-muted-foreground">Showing 30-day incident trend</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-success">5</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-warning">12</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-info">89</p>
                    <p className="text-xs text-muted-foreground">This Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                Risk Assessment by Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAreas.map((area, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{area.area}</h4>
                      <Badge className={getRiskColor(area.riskLevel)}>
                        {area.riskLevel} Risk
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Incidents</p>
                        <p className="font-medium">{area.incidents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Trend</p>
                        <p className="font-medium capitalize">{area.trend}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Incident</p>
                        <p className="font-medium">{area.lastIncident}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Workforce Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workerAnalytics.map((dept, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{dept.department}</h4>
                      <Badge className="bg-info text-info-foreground">
                        {dept.safetyScore}% Safety Score
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Workers</p>
                        <p className="font-medium">{dept.totalWorkers}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active Shift</p>
                        <p className="font-medium">{dept.activeShift}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Incidents</p>
                        <p className="font-medium">{dept.incidents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Utilization</p>
                        <p className="font-medium">{Math.round((dept.activeShift / dept.totalWorkers) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Response Time Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <TrendingDown className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Response times improving</p>
                    <p className="text-xs text-muted-foreground">Average: 2.4 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  Equipment Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Uptime increasing</p>
                    <p className="text-xs text-muted-foreground">Current: 98.7%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;