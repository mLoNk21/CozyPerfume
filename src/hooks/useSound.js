import { useContext, useCallback } from 'react';
import { Howl } from 'howler';
import { useTheme } from '../context/ThemeContext';

// Sound files mapping
const soundFiles = {
  tap: '/sounds/tap.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  notification: '/sounds/notification.mp3',
  'level-up': '/sounds/level-up.mp3',
  'reward-unlock': '/sounds/reward-unlock.mp3',
  'bottle-fill': '/sounds/bottle-fill.mp3',
  'bottle-spray': '/sounds/bottle-spray.mp3',
  'ai-response': '/sounds/ai-response.mp3',
  'mood-happy': '/sounds/mood-happy.mp3',
  'mood-romantic': '/sounds/mood-romantic.mp3',
  'ambient-luxury': '/sounds/ambient-luxury.mp3',
  'ambient-aurora': '/sounds/ambient-aurora.mp3',
  'ambient-pink': '/sounds/ambient-pink.mp3'
};

// Preloaded sounds cache
const soundCache = {};

// Preload sounds
const preloadSounds = () => {
  Object.entries(soundFiles).forEach(([key, src]) => {
    if (!soundCache[key]) {
      soundCache[key] = new Howl({
        src: [src],
        volume: 0.3,
        preload: true,
        onloaderror: () => {
          console.warn(`Failed to load sound: ${key}`);
        }
      });
    }
  });
};

// Initialize sound preloading
if (typeof window !== 'undefined') {
  preloadSounds();
}

export const useSound = () => {
  const { soundEnabled, hapticEnabled } = useTheme();

  const playSound = useCallback((soundName, options = {}) => {
    if (!soundEnabled) return;

    const sound = soundCache[soundName];
    if (sound) {
      // Set volume if provided
      if (options.volume !== undefined) {
        sound.volume(options.volume);
      }

      // Play sound
      sound.play();

      // Reset volume after playing if it was changed
      if (options.volume !== undefined) {
        setTimeout(() => {
          sound.volume(0.3);
        }, 100);
      }
    } else {
      console.warn(`Sound not found: ${soundName}`);
    }
  }, [soundEnabled]);

  const playHaptic = useCallback((pattern = 'light') => {
    if (!hapticEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;

    const patterns = {
      light: [10],
      medium: [30],
      heavy: [50],
      double: [10, 50, 10],
      success: [10, 30, 10, 30, 20],
      error: [50, 100, 50],
      notification: [20, 50, 20]
    };

    const vibrationPattern = patterns[pattern] || patterns.light;
    navigator.vibrate(vibrationPattern);
  }, [hapticEnabled]);

  const playTapFeedback = useCallback(() => {
    playSound('tap', { volume: 0.2 });
    playHaptic('light');
  }, [playSound, playHaptic]);

  const playSuccessFeedback = useCallback(() => {
    playSound('success');
    playHaptic('success');
  }, [playSound, playHaptic]);

  const playErrorFeedback = useCallback(() => {
    playSound('error');
    playHaptic('error');
  }, [playSound, playHaptic]);

  const playNotificationFeedback = useCallback(() => {
    playSound('notification');
    playHaptic('notification');
  }, [playSound, playHaptic]);

  const playLevelUpFeedback = useCallback(() => {
    playSound('level-up');
    playHaptic('double');
  }, [playSound, playHaptic]);

  const playRewardUnlockFeedback = useCallback(() => {
    playSound('reward-unlock');
    playHaptic('success');
  }, [playSound, playHaptic]);

  const playBottleFillFeedback = useCallback((progress) => {
    playSound('bottle-fill', { volume: 0.1 + (progress * 0.2) });
    if (progress > 0.5) {
      playHaptic('medium');
    } else {
      playHaptic('light');
    }
  }, [playSound, playHaptic]);

  const playBottleSprayFeedback = useCallback(() => {
    playSound('bottle-spray');
    playHaptic('medium');
  }, [playSound, playHaptic]);

  const playAIResponseFeedback = useCallback(() => {
    playSound('ai-response', { volume: 0.25 });
    playHaptic('light');
  }, [playSound, playHaptic]);

  const playMoodFeedback = useCallback((mood) => {
    const moodSounds = {
      happy: 'mood-happy',
      romantic: 'mood-romantic',
      confident: 'notification',
      calm: 'ambient-luxury',
      energetic: 'mood-happy'
    };

    const soundName = moodSounds[mood] || 'notification';
    playSound(soundName, { volume: 0.2 });
    playHaptic('light');
  }, [playSound, playHaptic]);

  const playAmbientSound = useCallback((ambientType, loop = true) => {
    if (!soundEnabled) return null;

    const ambientSounds = {
      luxury: 'ambient-luxury',
      aurora: 'ambient-aurora',
      pink: 'ambient-pink'
    };

    const soundName = ambientSounds[ambientType];
    if (!soundName || !soundCache[soundName]) return null;

    const sound = soundCache[soundName];
    sound.loop(loop);
    sound.volume(0.1);
    sound.play();

    return {
      stop: () => sound.stop(),
      fade: (duration = 2000) => sound.fade(0.1, 0, duration)
    };
  }, [soundEnabled]);

  const stopAllSounds = useCallback(() => {
    Object.values(soundCache).forEach(sound => {
      sound.stop();
    });
  }, []);

  const setGlobalVolume = useCallback((volume) => {
    Object.values(soundCache).forEach(sound => {
      sound.volume(volume);
    });
  }, []);

  return {
    // Basic sound control
    playSound,
    playHaptic,
    stopAllSounds,
    setGlobalVolume,
    
    // Predefined feedback functions
    playTapFeedback,
    playSuccessFeedback,
    playErrorFeedback,
    playNotificationFeedback,
    playLevelUpFeedback,
    playRewardUnlockFeedback,
    playBottleFillFeedback,
    playBottleSprayFeedback,
    playAIResponseFeedback,
    playMoodFeedback,
    playAmbientSound,
    
    // State
    soundEnabled,
    hapticEnabled,
    availableSounds: Object.keys(soundFiles)
  };
};

export default useSound;