import React from "react";
import type { Detection, DetectionStats } from "@/hooks/useObjectDetection";
import { AlertTriangle, Eye, TrendingUp, Clock } from "lucide-react";

interface ObjectDetectionOverlayProps {
  detections: Detection[];
  stats: DetectionStats;
  videoWidth: number;
  videoHeight: number;
  isEnabled: boolean;
  isDetecting: boolean;
  modelLoadError?: string | null;
  onRetryLoad?: () => void;
}

const ObjectDetectionOverlay: React.FC<ObjectDetectionOverlayProps> = ({
  detections,
  stats,
  videoWidth,
  videoHeight,
  isEnabled,
  isDetecting,
  modelLoadError,
  onRetryLoad,
}) => {
  if (!isEnabled) return null;

  // Mine safety specific color coding
  const getDetectionColor = (label: string, priority: 'HIGH' | 'MEDIUM' | 'LOW'): string => {
    switch (priority) {
      case 'HIGH':
        return "#dc2626"; // Red - High priority safety alert
      case 'MEDIUM':
        return "#f59e0b"; // Orange - Medium priority
      case 'LOW':
        return "#3b82f6"; // Blue - Low priority
      default:
        return "#6b7280"; // Gray - Unknown
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatRate = (rate: number) => {
    return rate.toFixed(1);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Error State */}
      {modelLoadError && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="bg-destructive/90 backdrop-blur-sm rounded-lg p-4 text-white text-center max-w-sm pointer-events-auto">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">AI Detection Error</h3>
            <p className="text-sm opacity-90 mb-3">{modelLoadError}</p>
            {onRetryLoad && (
              <button
                onClick={onRetryLoad}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Retry Loading Model
              </button>
            )}
          </div>
        </div>
      )}

      {/* Detection Boxes */}
      {detections.map((detection, index) => {
        const { box, label, score, priority } = detection;
        const color = getDetectionColor(label, priority);

        // Convert normalized coordinates to pixel coordinates
        const left = (box.xmin / 1000) * videoWidth;
        const top = (box.ymin / 1000) * videoHeight;
        const width = ((box.xmax - box.xmin) / 1000) * videoWidth;
        const height = ((box.ymax - box.ymin) / 1000) * videoHeight;

        return (
          <div key={`${index}-${detection.timestamp}`}>
            {/* Bounding box */}
            <div
              className={`absolute border-2 rounded transition-all duration-300 ${
                priority === 'HIGH' ? 'animate-pulse' : ''
              }`}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
                borderColor: color,
                backgroundColor: `${color}20`,
                boxShadow: priority === 'HIGH' ? `0 0 20px ${color}40` : 'none',
              }}
            />
            
            {/* Label with confidence and priority */}
            <div
              className="absolute text-xs font-bold px-2 py-1 rounded shadow-lg z-20"
              style={{
                left: `${left}px`,
                top: `${Math.max(0, top - 35)}px`,
                backgroundColor: color,
                color: "white",
              }}
            >
              <div className="flex items-center gap-1">
                {priority === 'HIGH' && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
                <span className="capitalize">{label}</span>
                <span className="opacity-80">
                  {Math.round(score * 100)}%
                </span>
              </div>
            </div>

            {/* Safety alert for high priority detections */}
            {priority === 'HIGH' && (
              <div
                className="absolute text-xs font-bold px-2 py-1 rounded shadow-lg bg-red-600 text-white animate-pulse z-20"
                style={{
                  left: `${left}px`,
                  top: `${top + height + 5}px`,
                }}
              >
                ⚠️ SAFETY ALERT
              </div>
            )}
          </div>
        );
      })}

      {/* Detection Status and Statistics */}
      <div className="absolute top-4 right-4 space-y-2 z-20">
        {/* Main Status */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="font-medium">AI Detection</span>
            {isDetecting && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            )}
          </div>
          
          {detections.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="text-xs">
                Objects: {detections.length}
              </div>
              {stats.highPriorityCount > 0 && (
                <div className="text-red-400 text-xs font-medium">
                  ⚠️ {stats.highPriorityCount} High Priority Alert{stats.highPriorityCount > 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Statistics Panel */}
        {stats.totalDetections > 0 && (
          <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">Statistics</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>{stats.totalDetections}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Confidence:</span>
                <span>{Math.round(stats.averageConfidence * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Detection Rate:</span>
                <span>{formatRate(stats.detectionRate)}/s</span>
              </div>
              {stats.lastDetectionTime > 0 && (
                <div className="flex items-center gap-1 text-xs opacity-80">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(stats.lastDetectionTime)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Detection List for High Priority Items */}
      {detections.filter(d => d.priority === 'HIGH').length > 0 && (
        <div className="absolute bottom-4 left-4 max-w-sm z-20">
          <div className="bg-red-900/90 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="font-medium text-sm">Safety Alerts</span>
            </div>
            <div className="space-y-1">
              {detections
                .filter(d => d.priority === 'HIGH')
                .slice(0, 3)
                .map((detection, index) => (
                  <div key={index} className="text-xs flex justify-between">
                    <span className="capitalize">{detection.label}</span>
                    <span>{Math.round(detection.score * 100)}%</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectDetectionOverlay;