import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/themes/crystal-ui.css';
import './index.css';

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Hide splash screen after app loads
const hideSplash = () => {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.opacity = '0';
    splash.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => {
      splash.remove();
    }, 500);
  }
};

// Initialize app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App onAppReady={hideSplash} />
  </React.StrictMode>
);