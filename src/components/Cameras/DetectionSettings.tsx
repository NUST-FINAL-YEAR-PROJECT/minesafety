import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, RefreshCw, BarChart3, AlertTriangle } from "lucide-react";
import type { ObjectDetectionConfig, DetectionStats } from "@/hooks/useObjectDetection";

interface DetectionSettingsProps {
  config: ObjectDetectionConfig;
  stats: DetectionStats;
  isModelLoaded: boolean;
  modelLoadError: string | null;
  onConfigChange: (config: Partial<ObjectDetectionConfig>) => void;
  onResetStats: () => void;
  onRetryLoad: () => void;
}

export const DetectionSettings: React.FC<DetectionSettingsProps> = ({
  config,
  stats,
  isModelLoaded,
  modelLoadError,
  onConfigChange,
  onResetStats,
  onRetryLoad,
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          AI Detection Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Status */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Model Status</Label>
          <div className="flex items-center gap-2">
            <Badge 
              variant={modelLoadError ? "destructive" : isModelLoaded ? "default" : "secondary"}
              className={
                modelLoadError ? "bg-destructive/20 text-destructive" :
                isModelLoaded ? "bg-success/20 text-success" :
                "bg-warning/20 text-warning"
              }
            >
              {modelLoadError ? "ERROR" : isModelLoaded ? "LOADED" : "LOADING"}
            </Badge>
            {modelLoadError && (
              <Button size="sm" variant="outline" onClick={onRetryLoad}>
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            )}
          </div>
          {modelLoadError && (
            <p className="text-xs text-muted-foreground">{modelLoadError}</p>
          )}
        </div>

        <Separator />

        {/* Detection Configuration */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Configuration</Label>
          
          {/* Confidence Threshold */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="threshold" className="text-xs">Confidence Threshold</Label>
              <span className="text-xs text-muted-foreground">{Math.round(config.threshold * 100)}%</span>
            </div>
            <Slider
              id="threshold"
              min={0.1}
              max={0.9}
              step={0.05}
              value={[config.threshold]}
              onValueChange={(value) => onConfigChange({ threshold: value[0] })}
              className="w-full"
            />
          </div>

          {/* Detection Interval */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interval" className="text-xs">Detection Interval</Label>
              <span className="text-xs text-muted-foreground">{config.interval}ms</span>
            </div>
            <Slider
              id="interval"
              min={500}
              max={5000}
              step={250}
              value={[config.interval]}
              onValueChange={(value) => onConfigChange({ interval: value[0] })}
              className="w-full"
            />
          </div>

          {/* Alert Threshold */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="alertThreshold" className="text-xs">Alert Threshold</Label>
              <span className="text-xs text-muted-foreground">{Math.round(config.alertThreshold * 100)}%</span>
            </div>
            <Slider
              id="alertThreshold"
              min={0.5}
              max={0.95}
              step={0.05}
              value={[config.alertThreshold]}
              onValueChange={(value) => onConfigChange({ alertThreshold: value[0] })}
              className="w-full"
            />
          </div>

          {/* Enable Alerts Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="alerts" className="text-xs">Safety Alerts</Label>
            <Switch
              id="alerts"
              checked={config.enableAlerts}
              onCheckedChange={(checked) => onConfigChange({ enableAlerts: checked })}
            />
          </div>
        </div>

        <Separator />

        {/* Statistics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Statistics
            </Label>
            <Button size="sm" variant="outline" onClick={onResetStats}>
              <RefreshCw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-muted-foreground">Total Detections</div>
              <div className="font-medium">{stats.totalDetections}</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">High Priority</div>
              <div className="font-medium text-red-500 flex items-center gap-1">
                {stats.highPriorityCount > 0 && <AlertTriangle className="w-3 h-3" />}
                {stats.highPriorityCount}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Avg Confidence</div>
              <div className="font-medium">{Math.round(stats.averageConfidence * 100)}%</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Detection Rate</div>
              <div className="font-medium">{stats.detectionRate.toFixed(1)}/s</div>
            </div>
          </div>

          {stats.lastDetectionTime > 0 && (
            <div className="text-xs text-muted-foreground">
              Last detection: {new Date(stats.lastDetectionTime).toLocaleTimeString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};