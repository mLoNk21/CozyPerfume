import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import BottomNavigation from '../organisms/BottomNavigation';
import FloatingActionButton from '../molecules/FloatingActionButton';
import StatusBar from '../atoms/StatusBar';
import Header from '../organisms/Header';

// Hooks
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../hooks/useSound';

// Icons
import { 
  HomeIcon, 
  CustomPerfumeIcon, 
  AIConsultationIcon, 
  CozyLabIcon, 
  ProfileIcon,
  PlusIcon 
} from '../atoms/Icon';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTheme, particleEffects } = useTheme();
  const { playTapFeedback } = useSound();

  // Navigation tabs configuration
  const navigationTabs = [
    {
      id: 'home',
      label: 'Home',
      path: '/home',
      icon: HomeIcon,
      activeIcon: HomeIcon,
      description: 'Beranda & Social Feed'
    },
    {
      id: 'custom-perfume',
      label: 'Custom',
      path: '/custom-perfume',
      icon: CustomPerfumeIcon,
      activeIcon: CustomPerfumeIcon,
      description: 'Kuis Parfum Personal'
    },
    {
      id: 'ai-consultation',
      label: 'AI',
      path: '/ai-consultation',
      icon: AIConsultationIcon,
      activeIcon: AIConsultationIcon,
      description: 'Konsultasi AI Expert'
    },
    {
      id: 'cozy-lab',
      label: 'Lab',
      path: '/cozy-lab',
      icon: CozyLabIcon,
      activeIcon: CozyLabIcon,
      description: 'Racik Parfum Sendiri'
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: ProfileIcon,
      activeIcon: ProfileIcon,
      description: 'Profil & Pengaturan'
    }
  ];

  // Get current active tab
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    return navigationTabs.find(tab => currentPath.startsWith(tab.path))?.id || 'home';
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());
  const [showFAB, setShowFAB] = useState(true);
  const [fabVariant, setFabVariant] = useState('ai-consultation');

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

  // Show/hide FAB based on current page
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Hide FAB on certain pages
    const hideFABPaths = [
      '/ai-chat',
      '/checkout',
      '/settings',
      '/login',
      '/register'
    ];

    const shouldHideFAB = hideFABPaths.some(path => currentPath.startsWith(path));
    setShowFAB(!shouldHideFAB);

    // Change FAB variant based on current tab
    if (currentPath.startsWith('/home')) {
      setFabVariant('ai-consultation');
    } else if (currentPath.startsWith('/custom-perfume')) {
      setFabVariant('cozy-lab');
    } else if (currentPath.startsWith('/cozy-lab')) {
      setFabVariant('shop');
    } else {
      setFabVariant('ai-consultation');
    }
  }, [location.pathname]);

  // Handle tab navigation
  const handleTabPress = (tab) => {
    playTapFeedback();
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  // Handle FAB press
  const handleFABPress = () => {
    playTapFeedback();
    
    switch (fabVariant) {
      case 'ai-consultation':
        navigate('/ai-consultation');
        break;
      case 'cozy-lab':
        navigate('/cozy-lab');
        break;
      case 'shop':
        navigate('/shop');
        break;
      default:
        navigate('/ai-consultation');
    }
  };

  // Page transition variants
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  // Check if current page should show header
  const shouldShowHeader = () => {
    const currentPath = location.pathname;
    const noHeaderPaths = ['/splash', '/onboarding', '/login', '/register'];
    return !noHeaderPaths.some(path => currentPath.startsWith(path));
  };

  return (
    <div className="main-layout">
      {/* Status Bar for Mobile */}
      <StatusBar />
      
      {/* Header - Conditional */}
      {shouldShowHeader() && (
        <Header 
          currentTab={activeTab}
          tabConfig={navigationTabs.find(tab => tab.id === activeTab)}
        />
      )}

      {/* Main Content Area */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="page-container"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFAB && (
          <FloatingActionButton
            variant={fabVariant}
            onClick={handleFABPress}
            icon={<PlusIcon size={24} />}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNavigation
        tabs={navigationTabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* Background Effects */}
      {particleEffects && (
        <div className="background-effects">
          <div className="aurora-background" />
        </div>
      )}
    </div>
  );
};

export default MainLayout;