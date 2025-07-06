import DashboardHeader from "./DashboardHeader";
import VideoFeed from "./VideoFeed";
import SensorData from "./SensorData";
import RiskChart from "./RiskChart";
import IncidentLog from "./IncidentLog";
import ComplianceSection from "./ComplianceSection";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Real-Time Safety Monitoring */}
          <div className="col-span-3 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Real-Time Safety Monitoring</h2>
            
            <VideoFeed title="CCTV Camera" type="cctv" status="active" />
            <VideoFeed title="Drone Feed" type="drone" status="active" />
            <SensorData />
          </div>

          {/* Middle Column - AI-Powered Risk Analysis */}
          <div className="col-span-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">AI-Powered Risk Analysis & Alerts</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <RiskChart />
              <IncidentLog />
            </div>
          </div>

          {/* Right Column - Compliance & Safety Measures */}
          <div className="col-span-3 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Compliance & Safety Measures</h2>
            
            <ComplianceSection />
            
            {/* Support Button */}
            <div className="fixed bottom-6 right-6">
              <Button className="rounded-full h-12 w-12 shadow-lg bg-info hover:bg-info/90">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;