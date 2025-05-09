// data/trainingData.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

// Default value if no saved data exists
export let totalTrainingHours = 0;

// Session data type
export interface SessionData {
  id: string;
  date: string;
  duration: number;
}

// Storage keys
const STORAGE_KEYS = {
  TOTAL_HOURS: 'qep_total_hours',
  SESSIONS: 'qep_sessions'
};
// Initialize with example data (for demo purposes)
export async function initializeWithExampleData() {
  // Clear existing data
  await clearAllData();
  
  // Create example sessions
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);
  
  const sessions: SessionData[] = [
    {
      id: Date.now().toString(),
      date: format(today, 'MMMM d, yyyy'),
      duration: 120, // 2 hours
    },
    {
      id: (Date.now() - 1000).toString(),
      date: format(yesterday, 'MMMM d, yyyy'),
      duration: 180, // 3 hours
    },
    {
      id: (Date.now() - 2000).toString(),
      date: format(twoDaysAgo, 'MMMM d, yyyy'),
      duration: 150, // 2.5 hours
    }
  ];
  
  // Save sessions
  await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  
  // Calculate total hours
  const totalHours = sessions.reduce((total, session) => total + (session.duration / 60), 0);
  await saveTrainingHours(totalHours);
  
  return sessions;
}

// Load training hours from storage
export async function loadTrainingData() {
  try {
    const storedHours = await AsyncStorage.getItem(STORAGE_KEYS.TOTAL_HOURS);
    if (storedHours !== null) {
      totalTrainingHours = parseFloat(storedHours);
    }
    return totalTrainingHours;
  } catch (error) {
    console.error('Error loading training hours:', error);
    return totalTrainingHours;
  }
}

// Save training hours to storage
export async function saveTrainingHours(hours: number) {
  try {
    totalTrainingHours = hours;
    await AsyncStorage.setItem(STORAGE_KEYS.TOTAL_HOURS, hours.toString());
    return true;
  } catch (error) {
    console.error('Error saving training hours:', error);
    return false;
  }
}

// Add hours from a new session
export async function addSessionHours(duration: number) {
  const newTotalHours = totalTrainingHours + (duration / 60); // Convert minutes to hours
  await saveTrainingHours(newTotalHours);
  return newTotalHours;
}

// Save a new session
export async function saveSession(session: SessionData) {
  try {
    // Get existing sessions
    const sessionsJson = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    const sessions: SessionData[] = sessionsJson ? JSON.parse(sessionsJson) : [];
    
    // Add new session
    sessions.unshift(session); // Add to beginning for chronological order
    
    // Save updated sessions
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    
    // Update total hours
    await addSessionHours(session.duration);
    
    return true;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
}

// Get all sessions
export async function getSessions(): Promise<SessionData[]> {
  try {
    const sessionsJson = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    return sessionsJson ? JSON.parse(sessionsJson) : [];
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
}

// Clear all data (for testing)
export async function clearAllData() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOTAL_HOURS);
    await AsyncStorage.removeItem(STORAGE_KEYS.SESSIONS);
    totalTrainingHours = 0;
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

