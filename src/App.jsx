import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SoundProvider } from './context/SoundContext';
import { UserProvider } from './context/UserContext';

// Layout Components
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Route Components
import AppRouter from './routes/AppRouter';

// Aurora Background
import AuroraBackground from './components/layouts/AuroraBackground';

// Initialize React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App({ onAppReady }) {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Preload critical resources
        await Promise.all([
          // Preload fonts
          document.fonts.ready,
          // Small delay for smooth transition
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);

        setIsAppReady(true);
        onAppReady?.();
      } catch (error) {
        console.error('App initialization error:', error);
        setIsAppReady(true);
        onAppReady?.();
      }
    };

    initializeApp();
  }, [onAppReady]);

  if (!isAppReady) {
    return null; // Splash screen is showing
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SoundProvider>
          <AuthProvider>
            <UserProvider>
              <Router>
                <div className="app-container">
                  {/* Aurora Background Effect */}
                  <AuroraBackground />
                  
                  {/* Status Bar for Mobile */}
                  <div className="status-bar" />
                  
                  {/* Main App Router */}
                  <AppRouter />
                  
                  {/* Toast Notifications */}
                  <Toaster
                    position="top-center"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                      },
                      success: {
                        iconTheme: {
                          primary: '#10B981',
                          secondary: '#ffffff',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#EF4444',
                          secondary: '#ffffff',
                        },
                      },
                    }}
                  />
                </div>
              </Router>
            </UserProvider>
          </AuthProvider>
        </SoundProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;