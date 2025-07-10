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
  threshold: 0.3;
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
      console.log('Loading object detection model...');
      const detector = await pipeline('object-detection', config.model, {
        device: 'webgpu',
      });
      detectorRef.current = detector;
      setIsModelLoaded(true);
      console.log('Object detection model loaded successfully');
    } catch (error) {
      console.error('Failed to load object detection model:', error);
      // Fallback to CPU if WebGPU fails
      try {
        const detector = await pipeline('object-detection', config.model);
        detectorRef.current = detector;
        setIsModelLoaded(true);
        console.log('Object detection model loaded on CPU');
      } catch (cpuError) {
        console.error('Failed to load model on CPU:', cpuError);
      }
    }
  }, [config.model]);

  const detectObjects = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!detectorRef.current || !videoElement || isDetecting) return;

    try {
      setIsDetecting(true);

      // Create canvas to capture video frame
      const canvas = canvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to video size
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      // Draw video frame to canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64 for model input
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Run object detection
      const results = await detectorRef.current(imageData);
      
      // Filter results by confidence threshold
      const filteredDetections = results
        .filter((detection: any) => detection.score >= config.threshold)
        .map((detection: any) => ({
          label: detection.label,
          score: detection.score,
          box: detection.box,
        }));

      setDetections(filteredDetections);
      
    } catch (error) {
      console.error('Object detection failed:', error);
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