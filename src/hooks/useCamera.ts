import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { CameraConfig } from "@/components/Cameras/CameraSettings";

export const useCamera = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [cameraConfig, setCameraConfig] = useState<CameraConfig>({
    resolution: "1920x1080",
    frameRate: 30,
    audioEnabled: true,
    videoQuality: "high",
    facingMode: "user",
    nightVision: false,
    motionDetection: true,
    autoRecord: false,
    recordingQuality: "high",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const getVideoConstraints = useCallback(() => {
    const [width, height] = cameraConfig.resolution.split('x').map(Number);
    
    const constraints: MediaTrackConstraints = {
      width: { ideal: width },
      height: { ideal: height },
      frameRate: { ideal: cameraConfig.frameRate },
      facingMode: cameraConfig.facingMode as "user" | "environment",
    };

    if (selectedCamera) {
      constraints.deviceId = { exact: selectedCamera };
    }

    return constraints;
  }, [cameraConfig, selectedCamera]);

  const startCamera = useCallback(async () => {
    try {
      console.log("Starting camera with config:", cameraConfig);
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser");
      }

      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: getVideoConstraints(),
        audio: cameraConfig.audioEnabled
      };

      console.log("Camera constraints:", constraints);

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log("Camera stream obtained:", {
        tracks: mediaStream.getTracks().map(track => ({
          kind: track.kind,
          label: track.label,
          enabled: track.enabled,
          readyState: track.readyState,
          settings: track.getSettings()
        }))
      });

      setStream(mediaStream);
      setIsStreaming(true);
      
      toast({
        title: "Camera Connected",
        description: `Camera streaming in ${cameraConfig.resolution} at ${cameraConfig.frameRate}fps`,
      });

    } catch (error) {
      console.error("Camera start failed:", error);
      
      let errorMessage = "Unable to access camera.";
      if (error instanceof Error) {
        switch (error.name) {
          case "NotAllowedError":
            errorMessage = "Camera access denied. Please allow camera permissions.";
            break;
          case "NotFoundError":
            errorMessage = "No camera found. Please connect a camera device.";
            break;
          case "NotSupportedError":
            errorMessage = "Camera not supported in this browser.";
            break;
          case "OverconstrainedError":
            errorMessage = "Camera settings not supported. Trying fallback...";
            // Try with basic constraints
            try {
              const fallbackStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
              });
              setStream(fallbackStream);
              setIsStreaming(true);
              toast({
                title: "Camera Connected (Fallback)",
                description: "Camera streaming with basic settings",
              });
              return;
            } catch (fallbackError) {
              console.error("Fallback failed:", fallbackError);
              errorMessage = "Camera constraints not supported by this device.";
            }
            break;
          case "AbortError":
            errorMessage = "Camera access was interrupted.";
            break;
          default:
            errorMessage = `Camera error: ${error.message}`;
        }
      }

      setIsStreaming(false);
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [stream, cameraConfig, selectedCamera, getVideoConstraints, toast]);

  const stopCamera = useCallback(() => {
    console.log("Stopping camera");
    
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log(`Stopping ${track.kind} track:`, track.label);
        track.stop();
      });
      setStream(null);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    setIsStreaming(false);
    setIsRecording(false);
    setZoom(1);
    
    toast({
      title: "Camera Disconnected",
      description: "Camera has been stopped",
    });
  }, [stream, toast]);

  const startRecording = useCallback(() => {
    if (!stream) {
      toast({
        title: "Recording Failed",
        description: "No camera stream available",
        variant: "destructive",
      });
      return;
    }

    try {
      const options = {
        mimeType: 'video/webm;codecs=vp9,opus'
      };

      const recorder = new MediaRecorder(stream, options);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mine-camera-recording-${new Date().toISOString().slice(0, 19)}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        recordedChunksRef.current = [];
        
        toast({
          title: "Recording Saved",
          description: "Video recording has been downloaded",
        });
      };

      recorder.start(1000); // Collect data every second
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Camera recording in progress",
      });
      
    } catch (error) {
      console.error("Recording failed:", error);
      toast({
        title: "Recording Error",
        description: "Unable to start recording",
        variant: "destructive",
      });
    }
  }, [stream, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const takeSnapshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      toast({
        title: "Snapshot Failed",
        description: "Video not ready for snapshot",
        variant: "destructive",
      });
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mine-camera-snapshot-${new Date().toISOString().slice(0, 19)}.png`;
        a.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Snapshot Saved",
          description: "Camera snapshot has been downloaded",
        });
      }
    }, 'image/png');
  }, [toast]);

  const toggleAudio = useCallback(() => {
    if (!stream) return;

    const audioTracks = stream.getAudioTracks();
    audioTracks.forEach(track => {
      track.enabled = !track.enabled;
    });

    setIsAudioEnabled(prev => !prev);
    
    toast({
      title: isAudioEnabled ? "Audio Disabled" : "Audio Enabled",
      description: `Camera audio has been ${isAudioEnabled ? 'muted' : 'enabled'}`,
    });
  }, [stream, isAudioEnabled, toast]);

  const adjustZoom = useCallback((direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 1);
      return Math.round(newZoom * 10) / 10; // Round to 1 decimal place
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  return {
    // State
    isStreaming,
    isRecording,
    isAudioEnabled,
    zoom,
    stream,
    selectedCamera,
    cameraConfig,
    
    // Refs
    videoRef,
    canvasRef,
    
    // Actions
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    takeSnapshot,
    toggleAudio,
    adjustZoom,
    toggleFullscreen,
    setSelectedCamera,
    setCameraConfig,
  };
};