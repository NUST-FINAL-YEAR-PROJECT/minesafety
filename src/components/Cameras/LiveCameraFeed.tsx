import { useRef, useEffect, forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { useObjectDetection } from "@/hooks/useObjectDetection";
import ObjectDetectionOverlay from "./ObjectDetectionOverlay";

interface LiveCameraFeedProps {
  stream: MediaStream | null;
  isStreaming: boolean;
  isRecording: boolean;
  zoom: number;
  onVideoReady?: () => void;
  enableObjectDetection?: boolean;
}

export const LiveCameraFeed = forwardRef<HTMLVideoElement, LiveCameraFeedProps>(
  ({ stream, isStreaming, isRecording, zoom, onVideoReady, enableObjectDetection = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {
      detections,
      isModelLoaded,
      isDetecting,
      config: detectionConfig,
      setConfig: setDetectionConfig,
      startDetection,
      stopDetection,
      toggleDetection,
    } = useObjectDetection();

    useEffect(() => {
      const videoElement = ref as React.MutableRefObject<HTMLVideoElement>;
      
      if (stream && videoElement?.current) {
        const video = videoElement.current;
        
        // Set the stream
        video.srcObject = stream;
        
        // Configure video element
        video.muted = true; // Start muted to avoid autoplay issues
        video.playsInline = true;
        video.controls = false;
        
        // Handle video events
        const handleLoadedMetadata = () => {
          console.log("Video metadata loaded:", {
            width: video.videoWidth,
            height: video.videoHeight,
            duration: video.duration
          });
          onVideoReady?.();
          
          // Start object detection if enabled
          if (enableObjectDetection && detectionConfig.enabled) {
            startDetection(video);
          }
        };

        const handleCanPlay = async () => {
          console.log("Video can play");
          try {
            await video.play();
            console.log("Video started playing successfully");
          } catch (playError) {
            console.warn("Video play failed:", playError);
          }
        };

        const handleError = (error: Event) => {
          console.error("Video error:", error);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);

        // Force load
        video.load();

        return () => {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
          video.removeEventListener('canplay', handleCanPlay);
          video.removeEventListener('error', handleError);
          stopDetection();
        };
      }
    }, [stream, ref, onVideoReady, enableObjectDetection, detectionConfig.enabled, startDetection, stopDetection]);

    // Update object detection when configuration changes
    useEffect(() => {
      if (enableObjectDetection) {
        setDetectionConfig(prev => ({ ...prev, enabled: true }));
      } else {
        setDetectionConfig(prev => ({ ...prev, enabled: false }));
        stopDetection();
      }
    }, [enableObjectDetection, setDetectionConfig, stopDetection]);

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {isStreaming && stream ? (
              <>
                <video
                  ref={ref}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                />
                
                 {/* Live indicator */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded px-3 py-1">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      {isRecording ? "RECORDING" : "LIVE"}
                    </span>
                    {zoom > 1 && (
                      <span className="text-white text-xs ml-2">
                        {Math.round(zoom * 100)}%
                      </span>
                    )}
                    {enableObjectDetection && (
                      <span className="text-white text-xs ml-2">
                        {isModelLoaded ? (isDetecting ? "🔍 DETECTING" : "🤖 AI ON") : "⏳ LOADING AI"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Object Detection Overlay */}
                <ObjectDetectionOverlay
                  detections={detections}
                  videoWidth={ref && (ref as React.MutableRefObject<HTMLVideoElement>).current?.videoWidth || 0}
                  videoHeight={ref && (ref as React.MutableRefObject<HTMLVideoElement>).current?.videoHeight || 0}
                  isEnabled={enableObjectDetection && detectionConfig.enabled}
                />

                {/* Hidden canvas for snapshots */}
                <canvas ref={canvasRef} className="hidden" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <Camera className="w-10 h-10 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Camera Feed Offline</p>
                    <p className="text-sm text-muted-foreground/70">
                      {isStreaming ? "Connecting to camera..." : "Click 'Start Camera' to begin streaming"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);