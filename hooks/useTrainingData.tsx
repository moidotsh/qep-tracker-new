// hooks/useTrainingData.tsx
import { useState, useEffect, useCallback } from 'react';
import { 
  totalTrainingHours, 
  loadTrainingData, 
  SessionData, 
  getSessions,
  initializeWithExampleData 
} from '../data/trainingData';

export function useTrainingData() {
  const [hours, setHours] = useState(totalTrainingHours);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Calculate percentage toward goal (simplified for now)
  const percentage = Math.min(100, Math.round((hours / 500) * 100));
  
  const initializeDemo = useCallback(async () => {
    setLoading(true);
    try {
      const initialSessions = await initializeWithExampleData();
      setSessions(initialSessions);
      
      // Update hours after initialization
      const currentHours = await loadTrainingData();
      setHours(currentHours);
    } catch (error) {
      console.error('Error initializing demo data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load training data when the component mounts
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load the hours from storage
      const currentHours = await loadTrainingData();
      setHours(currentHours);
      
      // Load sessions
      const sessionData = await getSessions();
      setSessions(sessionData);
    } catch (error) {
      console.error('Error loading training data:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  return {
    hours,
    sessions,
    percentage,
    loading,
    refresh: loadData,
    initializeDemo
  };
}
