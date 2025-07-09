import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Wifi, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraDevice {
  deviceId: string;
  label: string;
  groupId: string;
  kind: MediaDeviceKind;
}

interface CameraDetectionProps {
  onCameraSelect: (deviceId: string) => void;
  selectedCamera?: string;
}

export const CameraDetection = ({ onCameraSelect, selectedCamera }: CameraDetectionProps) => {
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt" | "unknown">("unknown");
  const { toast } = useToast();

  const detectCameras = async () => {
    setIsDetecting(true);
    try {
      // Request permissions first
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after permission
      
      // Get all devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput') as CameraDevice[];
      
      setCameras(videoDevices);
      setPermissionStatus("granted");
      
      toast({
        title: "Camera Detection Complete",
        description: `Found ${videoDevices.length} camera(s)`,
      });
    } catch (error) {
      console.error("Camera detection failed:", error);
      setPermissionStatus("denied");
      toast({
        title: "Camera Detection Failed",
        description: "Unable to access camera devices",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const checkPermissions = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setPermissionStatus(permission.state);
      
      permission.addEventListener('change', () => {
        setPermissionStatus(permission.state);
      });
    } catch (error) {
      console.warn("Permission API not supported");
    }
  };

  useEffect(() => {
    checkPermissions();
    detectCameras();
  }, []);

  const getStatusIcon = () => {
    switch (permissionStatus) {
      case "granted":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "denied":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Camera className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (permissionStatus) {
      case "granted":
        return "Camera access granted";
      case "denied":
        return "Camera access denied";
      case "prompt":
        return "Camera permission required";
      default:
        return "Checking camera permissions...";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Wifi className="w-4 h-4 text-primary" />
          Camera Hardware Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm text-muted-foreground">{getStatusText()}</span>
          </div>
          <Badge variant={permissionStatus === "granted" ? "default" : "secondary"}>
            {cameras.length} device(s)
          </Badge>
        </div>

        {cameras.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Camera Device:</label>
            <Select value={selectedCamera} onValueChange={onCameraSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose camera..." />
              </SelectTrigger>
              <SelectContent>
                {cameras.map((camera) => (
                  <SelectItem key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${camera.deviceId.slice(0, 8)}...`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          onClick={detectCameras} 
          disabled={isDetecting}
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          {isDetecting ? "Detecting..." : "Refresh Camera List"}
        </Button>
      </CardContent>
    </Card>
  );
};