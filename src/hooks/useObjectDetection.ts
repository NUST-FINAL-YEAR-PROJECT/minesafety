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
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: number;
}

export interface ObjectDetectionConfig {
  enabled: boolean;
  threshold: number;
  model: 'facebook/detr-resnet-50' | 'Xenova/detr-resnet-50';
  interval: number;
  maxRetries: number;
  enableAlerts: boolean;
  alertThreshold: number;
}

export interface DetectionStats {
  totalDetections: number;
  highPriorityCount: number;
  averageConfidence: number;
  detectionRate: number;
  lastDetectionTime: number;
}

const FALLBACK_MODELS = [
  'facebook/detr-resnet-50',
  'Xenova/detr-resnet-50'
];

export const useObjectDetection = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [stats, setStats] = useState<DetectionStats>({
    totalDetections: 0,
    highPriorityCount: 0,
    averageConfidence: 0,
    detectionRate: 0,
    lastDetectionTime: 0,
  });

  const [config, setConfig] = useState<ObjectDetectionConfig>({
    enabled: false,
    threshold: 0.4,
    model: 'facebook/detr-resnet-50',
    interval: 2000,
    maxRetries: 3,
    enableAlerts: true,
    alertThreshold: 0.7,
  });

  const detectorRef = useRef<any>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCountRef = useRef(0);
  const startTimeRef = useRef<number>(Date.now());

  const getSafetyPriority = useCallback((label: string, score: number): 'HIGH' | 'MEDIUM' | 'LOW' => {
    const lowerLabel = label.toLowerCase();
    
    // High priority safety items
    if (lowerLabel.includes('person') || lowerLabel.includes('human')) {
      return score > config.alertThreshold ? 'HIGH' : 'MEDIUM';
    }
    
    // Safety equipment
    if (lowerLabel.includes('helmet') || lowerLabel.includes('hard hat') || 
        lowerLabel.includes('safety') || lowerLabel.includes('vest')) {
      return 'MEDIUM';
    }
    
    // Vehicles and machinery
    if (lowerLabel.includes('truck') || lowerLabel.includes('vehicle') || 
        lowerLabel.includes('machine') || lowerLabel.includes('equipment')) {
      return 'MEDIUM';
    }
    
    // Emergency situations
    if (lowerLabel.includes('fire') || lowerLabel.includes('smoke') || 
        lowerLabel.includes('emergency') || lowerLabel.includes('danger')) {
      return 'HIGH';
    }
    
    return 'LOW';
  }, [config.alertThreshold]);

  const loadModel = useCallback(async (modelIndex: number = 0): Promise<boolean> => {
    if (detectorRef.current) return true;
    
    if (modelIndex >= FALLBACK_MODELS.length) {
      setModelLoadError('All models failed to load');
      return false;
    }

    const modelName = FALLBACK_MODELS[modelIndex];
    
    try {
      console.log(`Loading object detection model: ${modelName} (attempt ${retryCount + 1})`);
      setModelLoadError(null);
      setIsModelLoaded(false);
      
      const detector = await pipeline('object-detection', modelName, {
        progress_callback: (progress: any) => {
          console.log('Model loading progress:', progress);
        }
      });
      
      detectorRef.current = detector;
      setIsModelLoaded(true);
      setRetryCount(0);
      console.log(`Model ${modelName} loaded successfully`);
      return true;
      
    } catch (error) {
      console.error(`Failed to load model ${modelName}:`, error);
      setModelLoadError(`Failed to load ${modelName}: ${error}`);
      
      // Try next model in fallback list
      if (modelIndex + 1 < FALLBACK_MODELS.length) {
        console.log('Trying fallback model...');
        return await loadModel(modelIndex + 1);
      }
      
      // If all models fail, retry with first model
      if (retryCount < config.maxRetries) {
        console.log(`Retrying model load (${retryCount + 1}/${config.maxRetries})`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => loadModel(0), 2000 * (retryCount + 1));
        return false;
      }
      
      setModelLoadError('All models and retries failed');
      return false;
    }
  }, [retryCount, config.maxRetries]);

  const updateStats = useCallback((newDetections: Detection[]) => {
    frameCountRef.current++;
    const now = Date.now();
    const elapsed = (now - startTimeRef.current) / 1000;
    
    setStats(prev => {
      const totalDetections = prev.totalDetections + newDetections.length;
      const highPriorityCount = prev.highPriorityCount + 
        newDetections.filter(d => d.priority === 'HIGH').length;
      
      const allScores = newDetections.map(d => d.score);
      const avgConfidence = allScores.length > 0 
        ? allScores.reduce((sum, score) => sum + score, 0) / allScores.length 
        : prev.averageConfidence;
      
      return {
        totalDetections,
        highPriorityCount,
        averageConfidence: totalDetections > 0 
          ? (prev.averageConfidence * (totalDetections - newDetections.length) + 
             avgConfidence * newDetections.length) / totalDetections
          : 0,
        detectionRate: frameCountRef.current / elapsed,
        lastDetectionTime: newDetections.length > 0 ? now : prev.lastDetectionTime,
      };
    });
  }, []);

  const detectObjects = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!detectorRef.current || !videoElement || isDetecting) return;
    
    // Check if video is ready
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0 || 
        videoElement.readyState < 2) {
      return;
    }

    try {
      setIsDetecting(true);

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
      
      // Convert canvas to blob for better performance
      const imageBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/jpeg', 0.8);
      });
      
      // Run object detection
      const results = await detectorRef.current(imageBlob);
      
      // Process and filter results
      const now = Date.now();
      const filteredDetections: Detection[] = results
        .filter((detection: any) => detection.score >= config.threshold)
        .map((detection: any) => ({
          label: detection.label,
          score: detection.score,
          box: detection.box,
          priority: getSafetyPriority(detection.label, detection.score),
          timestamp: now,
        }))
        .sort((a: Detection, b: Detection) => {
          // Sort by priority (HIGH first), then by confidence
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
          return priorityDiff !== 0 ? priorityDiff : b.score - a.score;
        });

      setDetections(filteredDetections);
      updateStats(filteredDetections);
      
      // Trigger alerts for high priority detections
      if (config.enableAlerts) {
        const highPriorityDetections = filteredDetections.filter(d => d.priority === 'HIGH');
        if (highPriorityDetections.length > 0) {
          console.warn(`⚠️ HIGH PRIORITY DETECTION: ${highPriorityDetections.length} safety alerts`);
          // You can add notification system here
        }
      }
      
    } catch (error) {
      console.error('Object detection failed:', error);
      setDetections([]);
      
      // Try to reload model if detection fails multiple times
      if (error instanceof Error && error.message.includes('model')) {
        console.log('Model error detected, attempting to reload...');
        detectorRef.current = null;
        setIsModelLoaded(false);
        loadModel();
      }
    } finally {
      setIsDetecting(false);
    }
  }, [isDetecting, config.threshold, config.enableAlerts, getSafetyPriority, updateStats, loadModel]);

  const startDetection = useCallback((videoElement: HTMLVideoElement) => {
    if (!config.enabled || !isModelLoaded || detectionIntervalRef.current) return;

    console.log('Starting object detection with interval:', config.interval);
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

  const resetStats = useCallback(() => {
    setStats({
      totalDetections: 0,
      highPriorityCount: 0,
      averageConfidence: 0,
      detectionRate: 0,
      lastDetectionTime: 0,
    });
    frameCountRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  const retryModelLoad = useCallback(() => {
    setRetryCount(0);
    detectorRef.current = null;
    setIsModelLoaded(false);
    setModelLoadError(null);
    loadModel();
  }, [loadModel]);

  useEffect(() => {
    if (config.enabled && !isModelLoaded && !modelLoadError) {
      loadModel();
    }
  }, [config.enabled, isModelLoaded, modelLoadError, loadModel]);

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
    stats,
    modelLoadError,
    retryCount,
    setConfig,
    startDetection,
    stopDetection,
    toggleDetection,
    resetStats,
    retryModelLoad,
    canvasRef,
  };
};