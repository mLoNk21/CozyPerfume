import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { useTheme } from '../../context/ThemeContext';

const BottomNavigation = ({ tabs, activeTab, onTabPress }) => {
  const { playTapFeedback } = useSound();
  const { currentTheme } = useTheme();

  const handleTabPress = (tab) => {
    playTapFeedback();
    onTabPress(tab);
  };

  const tabVariants = {
    inactive: {
      scale: 1,
      y: 0
    },
    active: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    inactive: {
      scale: 1,
      rotate: 0,
      opacity: 0.6
    },
    active: {
      scale: 1.2,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  const labelVariants = {
    inactive: {
      opacity: 0.6,
      y: 0
    },
    active: {
      opacity: 1,
      y: -1,
      transition: {
        duration: 0.2
      }
    }
  };

  const activeIndicatorVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  return (
    <motion.nav 
      className="bottom-nav glass-panel"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        delay: 0.2 
      }}
    >
      {/* Tab Bar Container */}
      <div className="tab-bar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = isActive ? tab.activeIcon : tab.icon;

          return (
            <motion.button
              key={tab.id}
              className={`tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabPress(tab)}
              variants={tabVariants}
              initial="inactive"
              animate={isActive ? "active" : "inactive"}
              whileTap="tap"
              whileHover={{ scale: 1.05 }}
            >
              {/* Active Background Indicator */}
              {isActive && (
                <motion.div
                  className="active-indicator"
                  variants={activeIndicatorVariants}
                  initial="initial"
                  animate="animate"
                  layoutId="activeTab"
                />
              )}

              {/* Icon Container */}
              <motion.div
                className="tab-icon-container"
                variants={iconVariants}
                initial="inactive"
                animate={isActive ? "active" : "inactive"}
              >
                <IconComponent 
                  size={24} 
                  className={`tab-icon ${isActive ? 'active' : ''}`}
                />
                
                {/* Icon Glow Effect for Active Tab */}
                {isActive && (
                  <motion.div
                    className="icon-glow"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>

              {/* Tab Label */}
              <motion.span
                className={`tab-label ${isActive ? 'active' : ''}`}
                variants={labelVariants}
                initial="inactive"
                animate={isActive ? "active" : "inactive"}
              >
                {tab.label}
              </motion.span>

              {/* Active Dot Indicator */}
              {isActive && (
                <motion.div
                  className="active-dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 30,
                    delay: 0.1 
                  }}
                />
              )}

              {/* Ripple Effect */}
              <motion.div
                className="tab-ripple"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ 
                  scale: 3, 
                  opacity: [0, 0.3, 0],
                  transition: { duration: 0.4 }
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Enhancer Effects */}
      <div className="nav-effects">
        {/* Glass Panel Shimmer */}
        <div className="glass-panel-shimmer" />
        
        {/* Aurora Reflection */}
        {currentTheme === 'aurora' && (
          <motion.div
            className="aurora-reflection"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              background: [
                'linear-gradient(90deg, #8B5CF6, #06B6D4)',
                'linear-gradient(90deg, #06B6D4, #10B981)',
                'linear-gradient(90deg, #10B981, #EC4899)',
                'linear-gradient(90deg, #EC4899, #8B5CF6)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Safe Area Bottom Padding */}
      <div className="safe-area-bottom" />
    </motion.nav>
  );
};

export default BottomNavigation;