// utils/streakCalculator.ts
import { SessionData } from '../data/trainingData';

/**
 * Calculate the current day streak based on session data
 * @param sessions The array of session data
 * @returns A formatted string representing the streak (e.g. "5 day streak")
 */
export function calculateStreak(sessions: SessionData[]): string {
  if (sessions.length === 0) return "0 day streak";

  const sortedSessions = [...sessions].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Count days with sessions in sequence
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < 30; i++) { // Check up to 30 days in the past
    const dayHasSession = sortedSessions.some(session => {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === currentDate.getTime();
    });

    if (dayHasSession) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Break the streak
      break;
    }
  }

  return `${streak} day streak`;
}