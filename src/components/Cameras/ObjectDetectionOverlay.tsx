import React from "react";
import type { Detection } from "@/hooks/useObjectDetection";

interface ObjectDetectionOverlayProps {
  detections: Detection[];
  videoWidth: number;
  videoHeight: number;
  isEnabled: boolean;
}

const ObjectDetectionOverlay: React.FC<ObjectDetectionOverlayProps> = ({
  detections,
  videoWidth,
  videoHeight,
  isEnabled,
}) => {
  if (!isEnabled || detections.length === 0) return null;

  // Mine safety specific color coding
  const getDetectionColor = (label: string): string => {
    const safetyLabels = {
      person: "#ef4444", // Red - High priority for worker safety
      helmet: "#22c55e", // Green - Safety equipment detected
      "hard hat": "#22c55e",
      vehicle: "#f59e0b", // Orange - Equipment/vehicle
      truck: "#f59e0b",
      machine: "#f59e0b",
      fire: "#dc2626", // Dark red - Emergency
      smoke: "#dc2626",
      danger: "#dc2626",
      default: "#3b82f6", // Blue - Default
    };

    const lowerLabel = label.toLowerCase();
    for (const [key, color] of Object.entries(safetyLabels)) {
      if (lowerLabel.includes(key)) return color;
    }
    return safetyLabels.default;
  };

  const getSafetyPriority = (label: string): "HIGH" | "MEDIUM" | "LOW" => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes("person") || lowerLabel.includes("fire") || lowerLabel.includes("smoke")) {
      return "HIGH";
    }
    if (lowerLabel.includes("vehicle") || lowerLabel.includes("truck") || lowerLabel.includes("machine")) {
      return "MEDIUM";
    }
    return "LOW";
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {detections.map((detection, index) => {
        const { box, label, score } = detection;
        const color = getDetectionColor(label);
        const priority = getSafetyPriority(label);

        // Convert normalized coordinates to pixel coordinates
        const left = (box.xmin / 1000) * videoWidth;
        const top = (box.ymin / 1000) * videoHeight;
        const width = ((box.xmax - box.xmin) / 1000) * videoWidth;
        const height = ((box.ymax - box.ymin) / 1000) * videoHeight;

        return (
          <div key={index}>
            {/* Bounding box */}
            <div
              className="absolute border-2 rounded"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
                borderColor: color,
                backgroundColor: `${color}20`,
              }}
            />
            
            {/* Label with confidence and priority */}
            <div
              className="absolute text-xs font-bold px-2 py-1 rounded shadow-lg"
              style={{
                left: `${left}px`,
                top: `${Math.max(0, top - 30)}px`,
                backgroundColor: color,
                color: "white",
              }}
            >
              <div className="flex items-center gap-1">
                {priority === "HIGH" && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
                <span>{label}</span>
                <span className="opacity-80">
                  {Math.round(score * 100)}%
                </span>
              </div>
            </div>

            {/* Safety alert for high priority detections */}
            {priority === "HIGH" && (
              <div
                className="absolute text-xs font-bold px-2 py-1 rounded shadow-lg bg-red-600 text-white animate-pulse"
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

      {/* Detection summary */}
      {detections.length > 0 && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded px-3 py-2 text-white text-sm z-20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>AI Detection: {detections.length} objects</span>
          </div>
          {detections.filter(d => getSafetyPriority(d.label) === "HIGH").length > 0 && (
            <div className="text-red-400 text-xs mt-1">
              ⚠️ {detections.filter(d => getSafetyPriority(d.label) === "HIGH").length} safety alerts
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectDetectionOverlay;