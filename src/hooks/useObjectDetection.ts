import { useState, useEffect, useRef, useCallback } from "react";
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js for browser usage
env.allowLocalModels = false;
env.useBrowserCache = true;

export interface Detection {
  label: string;
  score: number;
  box: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}

export interface ObjectDetectionConfig {
  enabled: boolean;
  threshold: number;
  model: 'facebook/detr-resnet-50' | 'hustvl/yolos-tiny';
  interval: number; // Detection interval in ms
}

export const useObjectDetection = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [config, setConfig] = useState<ObjectDetectionConfig>({
    enabled: false,
    threshold: 0.3,
    model: 'hustvl/yolos-tiny', // Faster model for real-time detection
    interval: 1000,
  });

  const detectorRef = useRef<any>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadModel = useCallback(async () => {
    if (detectorRef.current) return;

    try {
      console.log('Loading object detection model:', config.model);
      setIsModelLoaded(false);
      
      // Try WebGPU first, then fallback to CPU
      let detector;
      try {
        console.log('Attempting to load model with WebGPU...');
        detector = await pipeline('object-detection', config.model, {
          device: 'webgpu',
        });
        console.log('Model loaded successfully with WebGPU');
      } catch (webgpuError) {
        console.warn('WebGPU failed, falling back to CPU:', webgpuError);
        detector = await pipeline('object-detection', config.model);
        console.log('Model loaded successfully with CPU');
      }
      
      detectorRef.current = detector;
      setIsModelLoaded(true);
      console.log('Object detection model ready');
    } catch (error) {
      console.error('Failed to load object detection model:', error);
      setIsModelLoaded(false);
    }
  }, [config.model]);

  const detectObjects = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!detectorRef.current || !videoElement || isDetecting) return;
    
    // Check if video is ready
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
      console.warn('Video not ready for detection');
      return;
    }

    try {
      setIsDetecting(true);
      console.log('Starting object detection...');

      // Create canvas to capture video frame
      const canvas = canvasRef.current || document.createElement('canvas');
      if (!canvasRef.current) {
        canvasRef.current = canvas;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }

      // Set canvas size to video size
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      // Draw video frame to canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to image data for the model
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      console.log('Running detection on frame...');
      // Run object detection
      const results = await detectorRef.current(canvas);
      console.log('Detection results:', results);
      
      // Filter results by confidence threshold
      const filteredDetections = results
        .filter((detection: any) => detection.score >= config.threshold)
        .map((detection: any) => ({
          label: detection.label,
          score: detection.score,
          box: detection.box,
        }));

      console.log('Filtered detections:', filteredDetections);
      setDetections(filteredDetections);
      
    } catch (error) {
      console.error('Object detection failed:', error);
      setDetections([]);
    } finally {
      setIsDetecting(false);
    }
  }, [isDetecting, config.threshold]);

  const startDetection = useCallback((videoElement: HTMLVideoElement) => {
    if (!config.enabled || !isModelLoaded || detectionIntervalRef.current) return;

    detectionIntervalRef.current = setInterval(() => {
      detectObjects(videoElement);
    }, config.interval);
  }, [config.enabled, config.interval, isModelLoaded, detectObjects]);

  const stopDetection = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setDetections([]);
  }, []);

  const toggleDetection = useCallback(() => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  useEffect(() => {
    if (config.enabled && !isModelLoaded) {
      loadModel();
    }
  }, [config.enabled, isModelLoaded, loadModel]);

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return {
    isModelLoaded,
    isDetecting,
    detections,
    config,
    setConfig,
    startDetection,
    stopDetection,
    toggleDetection,
    canvasRef,
  };
};