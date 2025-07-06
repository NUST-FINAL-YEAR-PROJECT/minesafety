import MonitoringCard from "./MonitoringCard";
import { Badge } from "@/components/ui/badge";
import { Cctv } from "lucide-react";

interface VideoFeedProps {
  title: string;
  type: "cctv" | "drone";
  status: "active" | "warning" | "error" | "normal";
}

const VideoFeed = ({ title, type, status }: VideoFeedProps) => {
  return (
    <MonitoringCard title={title} status={status}>
      <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
        {/* Placeholder for video feed */}
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
          <div className="text-center">
            {type === "cctv" ? (
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Cctv className="w-8 h-8 text-primary/60" />
                </div>
                <p className="text-xs text-muted-foreground">CCTV Feed</p>
                <p className="text-xs text-muted-foreground">Zone A - Construction Site</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary/40 rounded-full"></div>
                </div>
                <p className="text-xs text-muted-foreground">Drone Feed</p>
                <p className="text-xs text-muted-foreground">Aerial Surveillance</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
            <div className={`w-2 h-2 rounded-full ${
              status === "active" ? "bg-success animate-pulse" : 
              status === "warning" ? "bg-warning" : 
              status === "error" ? "bg-destructive" : "bg-muted"
            }`}></div>
            <span className="text-xs text-white">LIVE</span>
          </div>
        </div>
      </div>
    </MonitoringCard>
  );
};

export default VideoFeed;