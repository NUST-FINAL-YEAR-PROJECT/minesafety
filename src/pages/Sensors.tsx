import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Radio, 
  Wifi, 
  Battery, 
  Thermometer, 
  Gauge, 
  Zap, 
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  MapPin
} from "lucide-react";

const SensorsPage = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Mock sensor data
  const gasDetectors = [
    { id: "GD001", name: "Methane Detector A", location: "Tunnel A-1", value: 0.02, unit: "% LEL", status: "normal", battery: 85, signal: 95 },
    { id: "GD002", name: "CO Detector B", location: "Shaft B-2", value: 15, unit: "ppm", status: "warning", battery: 67, signal: 88 },
    { id: "GD003", name: "H2S Detector C", location: "Zone C-3", value: 2, unit: "ppm", status: "normal", battery: 92, signal: 76 },
    { id: "GD004", name: "O2 Detector D", location: "Main Tunnel", value: 19.8, unit: "%", status: "critical", battery: 34, signal: 45 }
  ];

  const environmentalSensors = [
    { id: "ENV001", name: "Temperature Sensor", location: "Zone A", value: 24.5, unit: "°C", status: "normal", battery: 78, signal: 92 },
    { id: "ENV002", name: "Humidity Sensor", location: "Zone B", value: 67, unit: "%", status: "normal", battery: 89, signal: 84 },
    { id: "ENV003", name: "Pressure Sensor", location: "Shaft C", value: 1013, unit: "hPa", status: "warning", battery: 56, signal: 71 },
    { id: "ENV004", name: "Air Quality Monitor", location: "Central Hub", value: 156, unit: "AQI", status: "normal", battery: 91, signal: 98 }
  ];

  const structuralSensors = [
    { id: "STR001", name: "Vibration Monitor", location: "Support Beam A", value: 0.8, unit: "mm/s", status: "normal", battery: 73, signal: 89 },
    { id: "STR002", name: "Tilt Sensor", location: "Wall Section B", value: 1.2, unit: "degrees", status: "warning", battery: 82, signal: 76 },
    { id: "STR003", name: "Strain Gauge", location: "Roof Support C", value: 245, unit: "µε", status: "normal", battery: 95, signal: 93 },
    { id: "STR004", name: "Displacement Sensor", location: "Foundation D", value: 2.1, unit: "mm", status: "critical", battery: 28, signal: 52 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success/20 text-success";
      case "warning": return "bg-warning/20 text-warning";
      case "critical": return "bg-destructive/20 text-destructive";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      case "critical": return <Zap className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const SensorCard = ({ sensor, type }: { sensor: any, type: string }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {type === "gas" && <Radio className="w-4 h-4 text-primary" />}
            {type === "environmental" && <Thermometer className="w-4 h-4 text-primary" />}
            {type === "structural" && <Gauge className="w-4 h-4 text-primary" />}
            {sensor.name}
          </CardTitle>
          <Badge className={getStatusColor(sensor.status)}>
            {getStatusIcon(sensor.status)}
            {sensor.status.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {sensor.location}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {sensor.value} <span className="text-sm text-muted-foreground">{sensor.unit}</span>
          </div>
          <div className="text-xs text-muted-foreground">Current Reading</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Battery className="w-3 h-3" />
              Battery
            </div>
            <span className={sensor.battery > 30 ? "text-success" : "text-destructive"}>
              {sensor.battery}%
            </span>
          </div>
          <Progress value={sensor.battery} className="h-1.5" />
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              Signal
            </div>
            <span className={sensor.signal > 50 ? "text-success" : "text-warning"}>
              {sensor.signal}%
            </span>
          </div>
          <Progress value={sensor.signal} className="h-1.5" />
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Settings className="w-3 h-3 mr-1" />
            Config
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Activity className="w-3 h-3 mr-1" />
            History
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sensor Network</h1>
          <p className="text-muted-foreground">Real-time monitoring of mine safety sensors</p>
        </div>
        
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Online</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Warning</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center">
                <Radio className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">17</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Categories */}
      <Tabs defaultValue="gas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gas">Gas Detectors</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="structural">Structural</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gasDetectors.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} type="gas" />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="environmental" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {environmentalSensors.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} type="environmental" />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="structural" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {structuralSensors.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} type="structural" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SensorsPage;