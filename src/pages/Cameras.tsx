import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, CameraOff, Monitor, Radio, RotateCcw, Settings, Maximize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CamerasPage = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      console.log("Requesting camera access...");
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });
      
      console.log("Camera stream obtained:", mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Ensure video plays
        await videoRef.current.play();
        console.log("Video element playing");
      }
      
      setStream(mediaStream);
      setIsStreaming(true);
      
      toast({
        title: "Camera Connected",
        description: "PC camera is now streaming",
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      let errorMessage = "Unable to access PC camera.";
      
      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          errorMessage = "Camera permission denied. Please allow camera access.";
        } else if (error.name === "NotFoundError") {
          errorMessage = "No camera found on this device.";
        } else if (error.name === "NotSupportedError") {
          errorMessage = "Camera not supported in this browser.";
        }
      }
      
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
      
      toast({
        title: "Camera Disconnected",
        description: "PC camera has been stopped",
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Mock data for additional cameras
  const mockCameras = [
    { id: 1, name: "Tunnel A - East", status: "online", location: "Zone A", type: "Fixed" },
    { id: 2, name: "Main Shaft", status: "online", location: "Central", type: "PTZ" },
    { id: 3, name: "Equipment Bay", status: "warning", location: "Zone B", type: "Fixed" },
    { id: 4, name: "Emergency Exit", status: "offline", location: "Zone C", type: "Fixed" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Camera System</h1>
        <p className="text-muted-foreground">Real-time surveillance and monitoring system</p>
      </div>

      {/* PC Camera Section */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              PC Camera
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isStreaming ? "default" : "secondary"} className="bg-success/20 text-success">
                {isStreaming ? "LIVE" : "OFFLINE"}
              </Badge>
              <Button
                onClick={isStreaming ? stopCamera : startCamera}
                variant={isStreaming ? "destructive" : "default"}
                size="sm"
              >
                {isStreaming ? (
                  <>
                    <CameraOff className="w-4 h-4 mr-2" />
                    Stop Camera
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Start Camera
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {isStreaming ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <Camera className="w-10 h-10 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">PC Camera Offline</p>
                    <p className="text-sm text-muted-foreground/70">Click "Start Camera" to begin streaming</p>
                  </div>
                </div>
              </div>
            )}
            
            {isStreaming && (
              <>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded px-3 py-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">LIVE</span>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Mock Camera Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Mine Surveillance Cameras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCameras.map((camera) => (
            <Card key={camera.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{camera.name}</CardTitle>
                  <Badge 
                    variant={camera.status === "online" ? "default" : camera.status === "warning" ? "secondary" : "destructive"}
                    className={
                      camera.status === "online" ? "bg-success/20 text-success" :
                      camera.status === "warning" ? "bg-warning/20 text-warning" :
                      "bg-destructive/20 text-destructive"
                    }
                  >
                    {camera.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>📍 {camera.location}</span>
                  <span>📹 {camera.type}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                    {camera.status === "online" ? (
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                          <Radio className="w-6 h-6 text-primary/60" />
                        </div>
                        <p className="text-xs text-muted-foreground">Streaming...</p>
                      </div>
                    ) : camera.status === "warning" ? (
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto bg-warning/20 rounded-full flex items-center justify-center">
                          <RotateCcw className="w-6 h-6 text-warning/60" />
                        </div>
                        <p className="text-xs text-muted-foreground">Connection Issues</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
                          <CameraOff className="w-6 h-6 text-destructive/60" />
                        </div>
                        <p className="text-xs text-muted-foreground">Offline</p>
                      </div>
                    )}
                  </div>
                  
                  {camera.status === "online" && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                        <span className="text-xs text-white">LIVE</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CamerasPage;