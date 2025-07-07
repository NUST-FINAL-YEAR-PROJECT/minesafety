import EmergencySystem from "@/components/Dashboard/EmergencySystem";
import IncidentLog from "@/components/Dashboard/IncidentLog";
import RiskChart from "@/components/Dashboard/RiskChart";

const EmergencyPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Response Center</h1>
        <p className="text-muted-foreground">Emergency protocols, incident management, and risk analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EmergencySystem />
          <RiskChart />
        </div>
        
        <div>
          <IncidentLog />
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;