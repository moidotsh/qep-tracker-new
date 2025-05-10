// hooks/useTrainingData.tsx
import { useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { 
  totalTrainingHours, 
  loadTrainingData, 
  SessionData, 
  getSessions,
  initializeWithExampleData 
} from '../data/trainingData';
import { getCurrentStageProgress } from '../components/HourTracker/HourTrackerLogic';

export function useTrainingData() {
  const [hours, setHours] = useState(totalTrainingHours);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [stageInfo, setStageInfo] = useState(getCurrentStageProgress());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load training data when the component mounts
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Load the hours from storage
      const currentHours = await loadTrainingData();
      setHours(currentHours);
      setStageInfo(getCurrentStageProgress());
      
      // Load sessions
      const sessionData = await getSessions();
      setSessions(sessionData);
    } catch (error) {
      console.error('Error loading training data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Initialize demo data for testing
  const initializeDemo = useCallback(async () => {
    setLoading(true);
    try {
      const initialSessions = await initializeWithExampleData();
      setSessions(initialSessions);
      
      // Update hours and stage info after initialization
      const currentHours = await loadTrainingData();
      setHours(currentHours);
      setStageInfo(getCurrentStageProgress());
    } catch (error) {
      console.error('Error initializing demo data:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Refresh data when app comes back to foreground
  useEffect(() => {
    loadData();
    
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        loadData();
      }
    });
    
    return () => {
      subscription.remove();
    };
  }, [loadData]);
  
  return {
    hours,
    sessions,
    stageInfo,
    loading,
    error,
    refresh: loadData,
    initializeDemo
  };
}