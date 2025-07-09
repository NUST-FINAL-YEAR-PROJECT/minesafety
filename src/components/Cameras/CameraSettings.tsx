import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Camera, Mic, Video, Maximize } from "lucide-react";

interface CameraSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CameraConfig;
  onSettingsChange: (settings: CameraConfig) => void;
}

export interface CameraConfig {
  resolution: string;
  frameRate: number;
  audioEnabled: boolean;
  videoQuality: string;
  facingMode: string;
  nightVision: boolean;
  motionDetection: boolean;
  autoRecord: boolean;
  recordingQuality: string;
}

export const CameraSettings = ({ isOpen, onClose, settings, onSettingsChange }: CameraSettingsProps) => {
  const [localSettings, setLocalSettings] = useState<CameraConfig>(settings);

  const resolutionOptions = [
    { value: "640x480", label: "480p (640×480)" },
    { value: "1280x720", label: "720p HD (1280×720)" },
    { value: "1920x1080", label: "1080p FHD (1920×1080)" },
    { value: "3840x2160", label: "4K UHD (3840×2160)" },
  ];

  const qualityOptions = [
    { value: "low", label: "Low Quality" },
    { value: "medium", label: "Medium Quality" },
    { value: "high", label: "High Quality" },
    { value: "max", label: "Maximum Quality" },
  ];

  const facingModeOptions = [
    { value: "user", label: "Front Camera" },
    { value: "environment", label: "Rear Camera" },
    { value: "left", label: "Left Camera" },
    { value: "right", label: "Right Camera" },
  ];

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: CameraConfig = {
      resolution: "1920x1080",
      frameRate: 30,
      audioEnabled: true,
      videoQuality: "high",
      facingMode: "user",
      nightVision: false,
      motionDetection: true,
      autoRecord: false,
      recordingQuality: "high",
    };
    setLocalSettings(defaultSettings);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Camera Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Video className="w-4 h-4" />
                Video Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Resolution</Label>
                  <Select 
                    value={localSettings.resolution} 
                    onValueChange={(value) => setLocalSettings({...localSettings, resolution: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutionOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Camera Direction</Label>
                  <Select 
                    value={localSettings.facingMode} 
                    onValueChange={(value) => setLocalSettings({...localSettings, facingMode: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {facingModeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Frame Rate: {localSettings.frameRate} FPS</Label>
                <Slider
                  value={[localSettings.frameRate]}
                  onValueChange={(value) => setLocalSettings({...localSettings, frameRate: value[0]})}
                  min={15}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Video Quality</Label>
                <Select 
                  value={localSettings.videoQuality} 
                  onValueChange={(value) => setLocalSettings({...localSettings, videoQuality: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Mic className="w-4 h-4" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="audio-enabled">Enable Audio Recording</Label>
                <Switch
                  id="audio-enabled"
                  checked={localSettings.audioEnabled}
                  onCheckedChange={(checked) => setLocalSettings({...localSettings, audioEnabled: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Safety Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Camera className="w-4 h-4" />
                Mine Safety Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="night-vision">Night Vision Mode</Label>
                  <p className="text-xs text-muted-foreground">Enhanced visibility in low light conditions</p>
                </div>
                <Switch
                  id="night-vision"
                  checked={localSettings.nightVision}
                  onCheckedChange={(checked) => setLocalSettings({...localSettings, nightVision: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="motion-detection">Motion Detection</Label>
                  <p className="text-xs text-muted-foreground">Automatically detect movement and alert</p>
                </div>
                <Switch
                  id="motion-detection"
                  checked={localSettings.motionDetection}
                  onCheckedChange={(checked) => setLocalSettings({...localSettings, motionDetection: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-record">Auto-Record Incidents</Label>
                  <p className="text-xs text-muted-foreground">Automatically start recording during alerts</p>
                </div>
                <Switch
                  id="auto-record"
                  checked={localSettings.autoRecord}
                  onCheckedChange={(checked) => setLocalSettings({...localSettings, autoRecord: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label>Recording Quality</Label>
                <Select 
                  value={localSettings.recordingQuality} 
                  onValueChange={(value) => setLocalSettings({...localSettings, recordingQuality: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};