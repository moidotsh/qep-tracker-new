// navigation/NavigationHelper.tsx
import { router } from 'expo-router';

/**
 * App navigation paths
 */
export enum NavigationPath {
    HOME = 'home',
    LOG_SESSION = 'log-session',
    PROGRESS = 'progress',
    HISTORY = 'history',
    SETTINGS = 'settings'
}

/**
 * Define the navigation hierarchy relationships
 * This maps each route to its parent route for back navigation
 */
export const navigationHierarchy: Record<string, NavigationPath> = {
  [NavigationPath.LOG_SESSION]: NavigationPath.HOME,
  [NavigationPath.PROGRESS]: NavigationPath.HOME,
  [NavigationPath.HISTORY]: NavigationPath.HOME,
  [NavigationPath.SETTINGS]: NavigationPath.HOME
};

/**
 * Navigate to log session screen
 */
export function navigateToLogSession() {
  router.push('/log-session');
}

/**
 * Navigate to progress screen
 */
export function navigateToProgress() {
  router.push('/progress');
}

/**
 * Navigate to history screen
 */
export function navigateToHistory() {
  router.push('/history');
}

/**
 * Navigate to settings screen
 */
export function navigateToSettings() {
  router.push('/settings');
}

/**
 * Navigate to home screen
 */
export function navigateToHome() {
  router.push('/');
}

/**
 * Intelligent back navigation that respects the app hierarchy
 */
export function goBack(currentPath: NavigationPath | string) {
  // If the current path is a known path in our hierarchy
  if (Object.values(NavigationPath).includes(currentPath as NavigationPath)) {
    const parentPath = navigationHierarchy[currentPath] || NavigationPath.HOME;
    
    if (parentPath === NavigationPath.HOME) {
      router.push('/');
    } else {
      router.push(`/${parentPath}`);
    }
    return;
  }
  
  // Default fallback - just go home
  router.push('/');
}