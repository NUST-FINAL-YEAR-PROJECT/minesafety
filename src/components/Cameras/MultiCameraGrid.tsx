import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

interface MultiCameraGridProps {
  streams: MediaStream[];
  isStreaming: boolean;
  isRecording: boolean;
  zoom: number;
}

export const MultiCameraGrid = forwardRef<HTMLDivElement, MultiCameraGridProps>(
  ({ streams, isStreaming, isRecording, zoom }, ref) => {
    if (!isStreaming || streams.length === 0) {
      return (
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Camera className="w-10 h-10 text-primary/60" />
                </div>
                <p className="text-muted-foreground font-medium">No Camera Feeds Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const getGridClass = (count: number) => {
      if (count === 1) return "grid-cols-1";
      if (count <= 4) return "grid-cols-2";
      if (count <= 9) return "grid-cols-3";
      return "grid-cols-4";
    };

    return (
      <div ref={ref} className="space-y-4">
        <div className={`grid ${getGridClass(streams.length)} gap-4`}>
          {streams.map((stream, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                  <video
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: `scale(${zoom})` }}
                    ref={el => {
                      if (el && stream) {
                        el.srcObject = stream;
                      }
                    }}
                  />
                  
                  {/* Camera indicator */}
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">
                        CAM {index + 1}
                      </span>
                      {isRecording && (
                        <Badge className="text-xs bg-destructive/80 text-white">
                          REC
                        </Badge>
                      )}
                    </div>
                  </div>

                  {zoom > 1 && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="text-xs bg-black/70 text-white border-white/20">
                        {Math.round(zoom * 100)}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);