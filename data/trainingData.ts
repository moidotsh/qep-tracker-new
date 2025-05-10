// data/trainingData.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

// Default value if no saved data exists
export let totalTrainingHours = 2.5;

// Session data type with simplified structure
export interface SessionData {
  id: string;
  date: string;
  duration: number;
  isReminded?: boolean;
}

// Storage keys
const STORAGE_KEYS = {
  TOTAL_HOURS: 'qep_total_hours',
  SESSIONS: 'qep_sessions'
};

// Create example session for today
const createTodayExampleSession = (): SessionData => {
  const today = new Date();
  return {
    id: '1',
    date: format(today, 'MMMM d, yyyy'),
    duration: 120, // 2 hours
    isReminded: false
  };
};

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
    
    // If no sessions exist yet, initialize with an example entry
    if (!sessionsJson) {
      const exampleSession = createTodayExampleSession();
      
      // Save the example session
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify([exampleSession]));
      
      // Initialize hours to match the sample session
      await saveTrainingHours(exampleSession.duration / 60);
      
      return [exampleSession];
    }
    
    return JSON.parse(sessionsJson);
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
}

// Get total minutes logged for a specific date
export async function getDailyLoggedMinutes(date: string): Promise<number> {
  try {
    const sessions = await getSessions();
    
    // Sum up all session durations for the given date
    return sessions.reduce((total, session) => {
      if (session.date === date) {
        return total + session.duration;
      }
      return total;
    }, 0);
  } catch (error) {
    console.error('Error getting daily logged minutes:', error);
    return 0;
  }
}

// Check if adding more minutes would exceed daily limit
export async function wouldExceedDailyLimit(date: string, additionalMinutes: number): Promise<boolean> {
  const dailyLoggedMinutes = await getDailyLoggedMinutes(date);
  const MAX_DAILY_MINUTES = 8 * 60; // 8 hours
  
  return (dailyLoggedMinutes + additionalMinutes) > MAX_DAILY_MINUTES;
}

// Get remaining available minutes for a specific date
export async function getRemainingDailyMinutes(date: string): Promise<number> {
  const dailyLoggedMinutes = await getDailyLoggedMinutes(date);
  const MAX_DAILY_MINUTES = 8 * 60; // 8 hours
  
  return Math.max(0, MAX_DAILY_MINUTES - dailyLoggedMinutes);
}

// Get past 7 days of session data for history view
export async function getWeekSessions(): Promise<SessionData[]> {
  const sessions = await getSessions();
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);
  
  return sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= sevenDaysAgo && sessionDate <= now;
  });
}

// Reset app data (for testing)
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
      isReminded: false
    },
    {
      id: (Date.now() - 1000).toString(),
      date: format(yesterday, 'MMMM d, yyyy'),
      duration: 180, // 3 hours
      isReminded: false
    },
    {
      id: (Date.now() - 2000).toString(),
      date: format(twoDaysAgo, 'MMMM d, yyyy'),
      duration: 150, // 2.5 hours
      isReminded: false
    }
  ];
  
  // Save sessions
  await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  
  // Calculate total hours
  const totalHours = sessions.reduce((total, session) => total + (session.duration / 60), 0);
  await saveTrainingHours(totalHours);
  
  return sessions;
}