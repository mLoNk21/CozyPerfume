import React from 'react';
import { motion } from 'framer-motion';

// Icon SVG definitions
const iconPaths = {
  // Navigation Icons
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  'home-filled': "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z",
  'custom-perfume': "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
  'ai-consultation': "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  cozylab: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547A1.998 1.998 0 004 17.658V18a2 2 0 002 2h12a2 2 0 002-2v-.342a1.998 1.998 0 00-.572-1.386zM8 12a4 4 0 108 0v0H8v0z",
  profile: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  
  // Action Icons
  shop: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  cart: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 000 1.414L7 19m5-6v6m0-6V9a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2h-6a2 2 0 01-2-2z",
  wishlist: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  notification: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  
  // UI Icons
  close: "M6 18L18 6M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  'chevron-left': "M15 19l-7-7 7-7",
  'chevron-right': "M9 5l7 7-7 7",
  'chevron-up': "M5 15l7-7 7 7",
  'chevron-down': "M19 9l-7 7-7-7",
  plus: "M12 6v6m0 0v6m0-6h6m-6 0H6",
  minus: "M20 12H4",
  check: "M5 13l4 4L19 7",
  
  // Perfume Specific Icons
  bottle: "M8 2h8v2a2 2 0 01-2 2h-1v3a3 3 0 003 3v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a3 3 0 003-3V6H6a2 2 0 01-2-2V2z",
  spray: "M8 1v3h8V1M6 4v2a1 1 0 001 1h10a1 1 0 001-1V4M8 7v2h8V7m-8 2v8a2 2 0 002 2h4a2 2 0 002-2V9",
  particle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  
  // Social Icons
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  share: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
  chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  
  // Rewards & Gamification
  trophy: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  crown: "M5 13l4-7 4 7h8l-1 8H2l-1-8h4z",
  
  // Settings & Controls
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  
  // Status Icons
  loading: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
  error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
};

const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  animate = false,
  rotation = 0,
  onClick,
  ...props
}) => {
  const pathData = iconPaths[name];

  if (!pathData) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const iconVariants = {
    initial: { scale: 1, rotate: rotation },
    hover: animate ? { scale: 1.1, rotate: rotation + 5 } : { scale: 1, rotate: rotation },
    tap: { scale: 0.9, rotate: rotation },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      style={{ rotate: rotation }}
      {...props}
    >
      <path d={pathData} />
    </motion.svg>
  );
};

// Preset icon components for common use cases
export const HomeIcon = (props) => <Icon name="home" {...props} />;
export const HomeFilledIcon = (props) => <Icon name="home-filled" {...props} />;
export const CustomPerfumeIcon = (props) => <Icon name="custom-perfume" {...props} />;
export const AIConsultationIcon = (props) => <Icon name="ai-consultation" {...props} />;
export const CozyLabIcon = (props) => <Icon name="cozylab" {...props} />;
export const ProfileIcon = (props) => <Icon name="profile" {...props} />;
export const ShopIcon = (props) => <Icon name="shop" {...props} />;
export const CartIcon = (props) => <Icon name="cart" {...props} />;
export const WishlistIcon = (props) => <Icon name="wishlist" {...props} />;
export const NotificationIcon = (props) => <Icon name="notification" {...props} />;
export const SearchIcon = (props) => <Icon name="search" {...props} />;
export const CloseIcon = (props) => <Icon name="close" {...props} />;
export const MenuIcon = (props) => <Icon name="menu" {...props} />;
export const ChevronLeftIcon = (props) => <Icon name="chevron-left" {...props} />;
export const ChevronRightIcon = (props) => <Icon name="chevron-right" {...props} />;
export const ChevronUpIcon = (props) => <Icon name="chevron-up" {...props} />;
export const ChevronDownIcon = (props) => <Icon name="chevron-down" {...props} />;
export const PlusIcon = (props) => <Icon name="plus" {...props} />;
export const MinusIcon = (props) => <Icon name="minus" {...props} />;
export const CheckIcon = (props) => <Icon name="check" {...props} />;
export const BottleIcon = (props) => <Icon name="bottle" {...props} />;
export const SprayIcon = (props) => <Icon name="spray" {...props} />;
export const ParticleIcon = (props) => <Icon name="particle" {...props} />;
export const HeartIcon = (props) => <Icon name="heart" {...props} />;
export const ShareIcon = (props) => <Icon name="share" {...props} />;
export const ChatIcon = (props) => <Icon name="chat" {...props} />;
export const TrophyIcon = (props) => <Icon name="trophy" {...props} />;
export const StarIcon = (props) => <Icon name="star" {...props} />;
export const CrownIcon = (props) => <Icon name="crown" {...props} />;
export const SettingsIcon = (props) => <Icon name="settings" {...props} />;
export const SunIcon = (props) => <Icon name="sun" {...props} />;
export const MoonIcon = (props) => <Icon name="moon" {...props} />;
export const LoadingIcon = (props) => <Icon name="loading" animate className="animate-spin" {...props} />;
export const ErrorIcon = (props) => <Icon name="error" {...props} />;
export const SuccessIcon = (props) => <Icon name="success" {...props} />;
export const WarningIcon = (props) => <Icon name="warning" {...props} />;

export default Icon;