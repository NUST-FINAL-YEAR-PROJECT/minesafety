import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import GasMonitoring from "@/components/Dashboard/GasMonitoring";
import EnvironmentalMonitoring from "@/components/Dashboard/EnvironmentalMonitoring";
import SensorData from "@/components/Dashboard/SensorData";

const GasMonitoringPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gas & Environmental Monitoring</h1>
          <p className="text-muted-foreground">Real-time atmospheric monitoring and safety systems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <GasMonitoring />
            <SensorData />
          </div>
          
          <div>
            <EnvironmentalMonitoring />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GasMonitoringPage;