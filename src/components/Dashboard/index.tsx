import DashboardHeader from "./DashboardHeader";
import VideoFeed from "./VideoFeed";
import SensorData from "./SensorData";
import RiskChart from "./RiskChart";
import IncidentLog from "./IncidentLog";
import ComplianceSection from "./ComplianceSection";
import GasMonitoring from "./GasMonitoring";
import WorkerTracking from "./WorkerTracking";
import EquipmentStatus from "./EquipmentStatus";
import EmergencySystem from "./EmergencySystem";
import EnvironmentalMonitoring from "./EnvironmentalMonitoring";
import { Button } from "@/components/ui/button";
import { HelpCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
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
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Environmental & Gas Monitoring */}
          <div className="col-span-3 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Environmental Safety</h2>
            
            <GasMonitoring />
            <EnvironmentalMonitoring />
            <SensorData />
          </div>

          {/* Middle Column - Real-Time Monitoring & Risk Analysis */}
          <div className="col-span-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Real-Time Mine Monitoring</h2>
            
            {/* Video Feeds Row */}
            <div className="grid grid-cols-2 gap-4">
              <VideoFeed title="Main Shaft CCTV" type="cctv" status="active" />
              <VideoFeed title="Tunnel Surveillance" type="cctv" status="active" />
            </div>
            
            {/* Risk Analysis & Incident Management */}
            <div className="grid grid-cols-3 gap-4">
              <RiskChart />
              <IncidentLog />
            </div>
            
            {/* Worker Tracking */}
            <WorkerTracking />
          </div>

          {/* Right Column - Equipment & Emergency Systems */}
          <div className="col-span-3 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Equipment & Emergency</h2>
            
            <EmergencySystem />
            <EquipmentStatus />
            <ComplianceSection />
          </div>
        </div>

        {/* Bottom Statistics Panel */}
        <div className="mt-8 pt-6 border-t">
          <div className="grid grid-cols-6 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">247</p>
              <p className="text-sm text-muted-foreground">Workers Underground</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-info">12</p>
              <p className="text-sm text-muted-foreground">Active Equipment</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">Safety Alerts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">1</p>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">98.5%</p>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-info">24/7</p>
              <p className="text-sm text-muted-foreground">Monitoring Active</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Support & Emergency Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button className="rounded-full h-12 w-12 shadow-lg bg-destructive hover:bg-destructive/90">
          <AlertTriangle className="h-5 w-5" />
        </Button>
        <Button className="rounded-full h-12 w-12 shadow-lg bg-info hover:bg-info/90">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;