import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, CameraOff, Video, Mic, MicOff, Download, Maximize, ZoomIn, ZoomOut, Settings, RotateCw, Grid3X3, Square, SkipForward, SkipBack, Brain } from "lucide-react";

interface CameraControlsProps {
  isStreaming: boolean;
  isRecording: boolean;
  isAudioEnabled: boolean;
  zoom: number;
  viewMode: 'single' | 'grid' | 'alternating';
  currentViewIndex: number;
  totalCameras: number;
  enableObjectDetection?: boolean;
  onStartCamera: () => void;
  onStopCamera: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onToggleAudio: () => void;
  onTakeSnapshot: () => void;
  onToggleFullscreen: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onOpenSettings: () => void;
  onSwitchView: (mode: 'single' | 'grid' | 'alternating') => void;
  onSwitchCamera: (direction: 'next' | 'prev') => void;
  onToggleObjectDetection?: () => void;
}

export const CameraControls = ({
  isStreaming,
  isRecording,
  isAudioEnabled,
  zoom,
  viewMode,
  currentViewIndex,
  totalCameras,
  enableObjectDetection = false,
  onStartCamera,
  onStopCamera,
  onStartRecording,
  onStopRecording,
  onToggleAudio,
  onTakeSnapshot,
  onToggleFullscreen,
  onZoomIn,
  onZoomOut,
  onOpenSettings,
  onSwitchView,
  onSwitchCamera,
  onToggleObjectDetection,
}: CameraControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Badge variant={isStreaming ? "default" : "secondary"} className="bg-success/20 text-success">
          {isStreaming ? "LIVE" : "OFFLINE"}
        </Badge>
        {zoom > 1 && (
          <Badge variant="outline" className="text-xs">
            {Math.round(zoom * 100)}%
          </Badge>
        )}
        {totalCameras > 1 && (
          <Badge variant="outline" className="text-xs">
            Camera {currentViewIndex + 1}/{totalCameras}
          </Badge>
        )}
        <Badge variant="outline" className="text-xs capitalize">
          {viewMode}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        {/* View Mode Controls */}
        <div className="flex items-center gap-1 border rounded p-1">
          <Button
            onClick={() => onSwitchView('single')}
            variant={viewMode === 'single' ? "default" : "ghost"}
            size="sm"
            title="Single View"
          >
            <Square className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onSwitchView('grid')}
            variant={viewMode === 'grid' ? "default" : "ghost"}
            size="sm"
            title="Grid View"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onSwitchView('alternating')}
            variant={viewMode === 'alternating' ? "default" : "ghost"}
            size="sm"
            title="Alternating View"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Camera Switching */}
        {totalCameras > 1 && (viewMode === 'single' || viewMode === 'alternating') && (
          <div className="flex items-center gap-1">
            <Button
              onClick={() => onSwitchCamera('prev')}
              variant="outline"
              size="sm"
              title="Previous Camera"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onSwitchCamera('next')}
              variant="outline"
              size="sm"
              title="Next Camera"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="w-px h-4 bg-border mx-1" />

        <Button
          onClick={onToggleObjectDetection}
          variant={enableObjectDetection ? "default" : "outline"}
          size="sm"
          disabled={!isStreaming}
          title="AI Object Detection"
        >
          <Brain className="w-4 h-4" />
        </Button>

        <Button
          onClick={onOpenSettings}
          variant="outline"
          size="sm"
          title="Camera Settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        {isStreaming && (
          <>
            <Button
              onClick={onToggleAudio}
              variant="outline"
              size="sm"
              title={isAudioEnabled ? "Mute Audio" : "Enable Audio"}
            >
              {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={onTakeSnapshot}
              variant="outline"
              size="sm"
              title="Take Snapshot"
            >
              <Download className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={isRecording ? onStopRecording : onStartRecording}
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              title={isRecording ? "Stop Recording" : "Start Recording"}
            >
              <Video className="w-4 h-4" />
            </Button>
            
            <div className="w-px h-4 bg-border mx-1" />
            
            <Button
              onClick={onZoomOut}
              variant="outline"
              size="sm"
              disabled={zoom <= 1}
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={onZoomIn}
              variant="outline"
              size="sm"
              disabled={zoom >= 3}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={onToggleFullscreen}
              variant="outline"
              size="sm"
              title="Toggle Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </>
        )}
        
        <Button
          onClick={isStreaming ? onStopCamera : onStartCamera}
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
  );
};