import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Monitor, Radio, RotateCcw, CameraOff } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";
import { CameraControls } from "@/components/Cameras/CameraControls";
import { CameraDetection } from "@/components/Cameras/CameraDetection";
import { LiveCameraFeed } from "@/components/Cameras/LiveCameraFeed";
import { MultiCameraGrid } from "@/components/Cameras/MultiCameraGrid";
import { CameraSettings } from "@/components/Cameras/CameraSettings";

const CamerasPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    isStreaming,
    isRecording,
    isAudioEnabled,
    zoom,
    stream,
    selectedCamera,
    cameraConfig,
    viewMode,
    currentViewIndex,
    multipleStreams,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    takeSnapshot,
    toggleAudio,
    adjustZoom,
    toggleFullscreen,
    switchView,
    switchCamera,
    setSelectedCamera,
    setCameraConfig,
  } = useCamera();

  // Auto-switch cameras in alternating mode
  useEffect(() => {
    if (viewMode === 'alternating' && multipleStreams.length > 1) {
      const interval = setInterval(() => {
        switchCamera('next');
      }, 3000); // Switch every 3 seconds

      return () => clearInterval(interval);
    }
  }, [viewMode, multipleStreams.length, switchCamera]);

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

      {/* Camera Detection and Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* PC Camera Section */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Live Camera Feed
              </CardTitle>
              <CameraControls
                isStreaming={isStreaming}
                isRecording={isRecording}
                isAudioEnabled={isAudioEnabled}
                zoom={zoom}
                viewMode={viewMode}
                currentViewIndex={currentViewIndex}
                totalCameras={multipleStreams.length}
                onStartCamera={startCamera}
                onStopCamera={stopCamera}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onToggleAudio={toggleAudio}
                onTakeSnapshot={takeSnapshot}
                onToggleFullscreen={toggleFullscreen}
                onZoomIn={() => adjustZoom('in')}
                onZoomOut={() => adjustZoom('out')}
                onOpenSettings={() => setShowSettings(true)}
                onSwitchView={switchView}
                onSwitchCamera={switchCamera}
              />
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? (
                <MultiCameraGrid
                  streams={multipleStreams}
                  isStreaming={isStreaming}
                  isRecording={isRecording}
                  zoom={zoom}
                />
              ) : (
                <LiveCameraFeed
                  ref={videoRef}
                  stream={stream}
                  isStreaming={isStreaming}
                  isRecording={isRecording}
                  zoom={zoom}
                />
              )}
              <canvas ref={canvasRef} className="hidden" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <CameraDetection
            onCameraSelect={setSelectedCamera}
            selectedCamera={selectedCamera}
          />
        </div>
      </div>

      {/* Camera Settings Dialog */}
      <CameraSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={cameraConfig}
        onSettingsChange={setCameraConfig}
      />

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