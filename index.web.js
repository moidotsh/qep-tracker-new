// index.web.js
import 'expo-router/entry';
import './global.css';

// Ensure dark mode on web
if (typeof document !== 'undefined') {
  // Force dark mode
  document.documentElement.classList.remove('light-theme');
  document.documentElement.classList.add('dark-theme');
  document.documentElement.setAttribute('data-theme', 'dark');
  
  // Change document title for web
  document.title = 'QuickExtender Pro Tracker';
  
  // Add manual fix for modals on web
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Fix modal positioning on web */
    [role="dialog"],
    .ReactModalPortal,
    .modal-container,
    .react-modal-overlay {
      z-index: 9999 !important;
    }
    
    /* Fix fixed positioning on web */
    .fixed,
    .fixed-bottom,
    .fixed-top {
      position: fixed !important;
    }
    
    /* Fix Tamagui flexbox issues on web */
    [data-is-tamagui="true"] {
      display: flex;
    }
    
    .tamagui-YStack {
      display: flex;
      flex-direction: column;
    }
    
    .tamagui-XStack {
      display: flex;
      flex-direction: row;
    }
    
    /* Fix tap highlight */
    * {
      -webkit-tap-highlight-color: transparent;
    }
    
    /* Fix button cursor */
    button, [role="button"] {
      cursor: pointer;
    }
  `;
  document.head.appendChild(styleElement);
}