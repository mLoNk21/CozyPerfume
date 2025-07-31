import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Theme types
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  PINK: 'pink',
  AURORA: 'aurora',
  MOOD_ADAPTIVE: 'mood-adaptive',
  CUSTOM: 'custom'
};

// Initial state
const initialState = {
  currentTheme: THEMES.DARK, // Default theme
  availableThemes: Object.values(THEMES),
  customColors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    accent: '#06B6D4'
  },
  moodColors: {
    happy: ['#FFD700', '#FF69B4', '#00CED1'],
    romantic: ['#FF69B4', '#DC143C', '#DDA0DD'],
    confident: ['#8B5CF6', '#EC4899', '#F97316'],
    calm: ['#87CEEB', '#98FB98', '#E6E6FA'],
    energetic: ['#FF6347', '#FFD700', '#32CD32']
  },
  autoTheme: false, // Auto switch based on time
  particleEffects: true,
  glassEffects: true,
  soundEnabled: true,
  hapticEnabled: true
};

// Action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_CUSTOM_COLORS: 'SET_CUSTOM_COLORS',
  SET_MOOD_COLORS: 'SET_MOOD_COLORS',
  TOGGLE_AUTO_THEME: 'TOGGLE_AUTO_THEME',
  TOGGLE_PARTICLE_EFFECTS: 'TOGGLE_PARTICLE_EFFECTS',
  TOGGLE_GLASS_EFFECTS: 'TOGGLE_GLASS_EFFECTS',
  TOGGLE_SOUND: 'TOGGLE_SOUND',
  TOGGLE_HAPTIC: 'TOGGLE_HAPTIC',
  UPDATE_MOOD_THEME: 'UPDATE_MOOD_THEME'
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        currentTheme: action.payload
      };
    
    case THEME_ACTIONS.SET_CUSTOM_COLORS:
      return {
        ...state,
        customColors: {
          ...state.customColors,
          ...action.payload
        }
      };
    
    case THEME_ACTIONS.SET_MOOD_COLORS:
      return {
        ...state,
        moodColors: {
          ...state.moodColors,
          [action.payload.mood]: action.payload.colors
        }
      };
    
    case THEME_ACTIONS.TOGGLE_AUTO_THEME:
      return {
        ...state,
        autoTheme: !state.autoTheme
      };
    
    case THEME_ACTIONS.TOGGLE_PARTICLE_EFFECTS:
      return {
        ...state,
        particleEffects: !state.particleEffects
      };
    
    case THEME_ACTIONS.TOGGLE_GLASS_EFFECTS:
      return {
        ...state,
        glassEffects: !state.glassEffects
      };
    
    case THEME_ACTIONS.TOGGLE_SOUND:
      return {
        ...state,
        soundEnabled: !state.soundEnabled
      };
    
    case THEME_ACTIONS.TOGGLE_HAPTIC:
      return {
        ...state,
        hapticEnabled: !state.hapticEnabled
      };
    
    case THEME_ACTIONS.UPDATE_MOOD_THEME:
      return {
        ...state,
        currentMood: action.payload.mood,
        currentTheme: THEMES.MOOD_ADAPTIVE
      };
    
    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('cozy-theme');
    const savedCustomColors = localStorage.getItem('cozy-custom-colors');
    const savedSettings = localStorage.getItem('cozy-theme-settings');

    if (savedTheme) {
      dispatch({ type: THEME_ACTIONS.SET_THEME, payload: savedTheme });
    }

    if (savedCustomColors) {
      try {
        const colors = JSON.parse(savedCustomColors);
        dispatch({ type: THEME_ACTIONS.SET_CUSTOM_COLORS, payload: colors });
      } catch (error) {
        console.error('Error parsing saved custom colors:', error);
      }
    }

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        Object.entries(settings).forEach(([key, value]) => {
          if (key === 'autoTheme' && value) {
            dispatch({ type: THEME_ACTIONS.TOGGLE_AUTO_THEME });
          }
          if (key === 'particleEffects' && !value) {
            dispatch({ type: THEME_ACTIONS.TOGGLE_PARTICLE_EFFECTS });
          }
          if (key === 'glassEffects' && !value) {
            dispatch({ type: THEME_ACTIONS.TOGGLE_GLASS_EFFECTS });
          }
          if (key === 'soundEnabled' && !value) {
            dispatch({ type: THEME_ACTIONS.TOGGLE_SOUND });
          }
          if (key === 'hapticEnabled' && !value) {
            dispatch({ type: THEME_ACTIONS.TOGGLE_HAPTIC });
          }
        });
      } catch (error) {
        console.error('Error parsing saved theme settings:', error);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      const body = document.body;

      // Remove existing theme classes
      body.classList.remove('theme-light', 'theme-dark', 'theme-pink', 'theme-aurora', 'theme-mood-adaptive', 'theme-custom');

      // Apply current theme
      body.classList.add(`theme-${state.currentTheme}`);

      // Apply custom colors if custom theme
      if (state.currentTheme === THEMES.CUSTOM) {
        root.style.setProperty('--custom-primary', state.customColors.primary);
        root.style.setProperty('--custom-secondary', state.customColors.secondary);
        root.style.setProperty('--custom-accent', state.customColors.accent);
      }

      // Apply mood colors if mood adaptive theme
      if (state.currentTheme === THEMES.MOOD_ADAPTIVE && state.currentMood) {
        const colors = state.moodColors[state.currentMood] || state.moodColors.happy;
        root.style.setProperty('--mood-color-1', colors[0]);
        root.style.setProperty('--mood-color-2', colors[1]);
        root.style.setProperty('--mood-color-3', colors[2]);
      }

      // Apply effect settings
      body.classList.toggle('no-particles', !state.particleEffects);
      body.classList.toggle('no-glass', !state.glassEffects);
      body.classList.toggle('no-sound', !state.soundEnabled);
      body.classList.toggle('no-haptic', !state.hapticEnabled);
    };

    applyTheme();
  }, [state.currentTheme, state.customColors, state.currentMood, state.particleEffects, state.glassEffects, state.soundEnabled, state.hapticEnabled]);

  // Auto theme based on time
  useEffect(() => {
    if (!state.autoTheme) return;

    const updateThemeByTime = () => {
      const hour = new Date().getHours();
      let newTheme;

      if (hour >= 6 && hour < 12) {
        newTheme = THEMES.LIGHT; // Morning: Light theme
      } else if (hour >= 12 && hour < 18) {
        newTheme = THEMES.AURORA; // Afternoon: Aurora theme
      } else if (hour >= 18 && hour < 22) {
        newTheme = THEMES.PINK; // Evening: Pink theme
      } else {
        newTheme = THEMES.DARK; // Night: Dark theme
      }

      if (newTheme !== state.currentTheme) {
        dispatch({ type: THEME_ACTIONS.SET_THEME, payload: newTheme });
      }
    };

    updateThemeByTime();
    const interval = setInterval(updateThemeByTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [state.autoTheme, state.currentTheme]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('cozy-theme', state.currentTheme);
    localStorage.setItem('cozy-custom-colors', JSON.stringify(state.customColors));
    localStorage.setItem('cozy-theme-settings', JSON.stringify({
      autoTheme: state.autoTheme,
      particleEffects: state.particleEffects,
      glassEffects: state.glassEffects,
      soundEnabled: state.soundEnabled,
      hapticEnabled: state.hapticEnabled
    }));
  }, [state.currentTheme, state.customColors, state.autoTheme, state.particleEffects, state.glassEffects, state.soundEnabled, state.hapticEnabled]);

  // Action creators
  const setTheme = (theme) => {
    dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme });
  };

  const setCustomColors = (colors) => {
    dispatch({ type: THEME_ACTIONS.SET_CUSTOM_COLORS, payload: colors });
  };

  const setMoodColors = (mood, colors) => {
    dispatch({ type: THEME_ACTIONS.SET_MOOD_COLORS, payload: { mood, colors } });
  };

  const toggleAutoTheme = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_AUTO_THEME });
  };

  const toggleParticleEffects = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_PARTICLE_EFFECTS });
  };

  const toggleGlassEffects = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_GLASS_EFFECTS });
  };

  const toggleSound = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_SOUND });
  };

  const toggleHaptic = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_HAPTIC });
  };

  const updateMoodTheme = (mood) => {
    dispatch({ type: THEME_ACTIONS.UPDATE_MOOD_THEME, payload: { mood } });
  };

  // Get theme info
  const getThemeInfo = () => {
    const themeInfo = {
      [THEMES.LIGHT]: {
        name: 'Light Mode',
        description: 'Clean white theme with subtle shadows',
        icon: '☀️',
        preview: ['#FFFFFF', '#F0F0F0', '#E0E0E0']
      },
      [THEMES.DARK]: {
        name: 'Dark Mode', 
        description: 'Elegant black theme with premium feel',
        icon: '🌙',
        preview: ['#000000', '#1A1A1A', '#2A2A2A']
      },
      [THEMES.PINK]: {
        name: 'Pink Mode',
        description: 'Feminine pink theme for elegant users',
        icon: '💗',
        preview: ['#FF69B4', '#FFB6C1', '#FF1493']
      },
      [THEMES.AURORA]: {
        name: 'Aurora Mode',
        description: 'Dynamic gradient theme with flowing colors',
        icon: '🌈',
        preview: ['#8B5CF6', '#06B6D4', '#10B981']
      },
      [THEMES.MOOD_ADAPTIVE]: {
        name: 'Mood Adaptive',
        description: 'Changes colors based on your detected mood',
        icon: '🎭',
        preview: ['#FFD700', '#FF69B4', '#00CED1']
      },
      [THEMES.CUSTOM]: {
        name: 'Custom',
        description: 'Personalized colors created by you',
        icon: '🎨',
        preview: [state.customColors.primary, state.customColors.secondary, state.customColors.accent]
      }
    };

    return themeInfo[state.currentTheme] || themeInfo[THEMES.DARK];
  };

  const contextValue = {
    // State
    ...state,
    
    // Actions
    setTheme,
    setCustomColors,
    setMoodColors,
    toggleAutoTheme,
    toggleParticleEffects,
    toggleGlassEffects,
    toggleSound,
    toggleHaptic,
    updateMoodTheme,
    
    // Utils
    getThemeInfo,
    THEMES
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;