import WorkerTracking from "@/components/Dashboard/WorkerTracking";
import EquipmentTracking from "@/components/Dashboard/EquipmentTracking";
import VideoFeed from "@/components/Dashboard/VideoFeed";

const WorkerTrackingPage = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Worker Safety & Tracking</h1>
        <p className="text-muted-foreground">Personnel monitoring and location tracking systems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WorkerTracking />
          <EquipmentTracking />
        </div>
        
        <div className="space-y-6">
          <VideoFeed title="Main Shaft CCTV" type="cctv" status="active" />
          <VideoFeed title="Tunnel A Camera" type="cctv" status="active" />
        </div>
      </div>
    </div>
  );
};

export default WorkerTrackingPage;