import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const { playSound } = useSound();

  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Play tap sound
    playSound('tap');
    
    // Call onClick handler
    onClick?.(e);
  };

  const getVariantStyles = () => {
    const baseStyles = `
      relative overflow-hidden font-medium transition-all duration-300
      flex items-center justify-center gap-2 border-radius rounded-xl
      touch-target cursor-pointer select-none
    `;

    switch (variant) {
      case 'primary':
        return `${baseStyles} 
          bg-gradient-to-r from-purple-500 to-pink-500 
          text-white shadow-lg hover:shadow-xl
          hover:from-purple-600 hover:to-pink-600
          active:scale-95 active:shadow-md
        `;
      
      case 'secondary':
        return `${baseStyles}
          glass-panel text-white
          hover:bg-opacity-20 
          active:scale-95
        `;
      
      case 'ghost':
        return `${baseStyles}
          bg-transparent text-white
          hover:bg-white hover:bg-opacity-10
          active:scale-95
        `;
      
      case 'neuro':
        return `${baseStyles}
          neuro-button text-gray-800
          active:neuro-button-active
        `;
      
      case 'neuro-dark':
        return `${baseStyles}
          neuro-button-dark text-white
          active:neuro-button-dark-active
        `;
      
      case 'liquid':
        return `${baseStyles}
          liquid-container text-white
          hover:liquid-container-hover
        `;
      
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm min-h-[36px]';
      case 'medium':
        return 'px-6 py-3 text-base min-h-[44px]';
      case 'large':
        return 'px-8 py-4 text-lg min-h-[52px]';
      case 'xl':
        return 'px-10 py-5 text-xl min-h-[60px]';
      default:
        return 'px-6 py-3 text-base min-h-[44px]';
    }
  };

  const buttonClasses = `
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Button Content */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <span className="w-5 h-5 flex-shrink-0">
            {icon}
          </span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <span className="w-5 h-5 flex-shrink-0">
            {icon}
          </span>
        )}
      </div>
      
      {/* Shimmer Effect for Glass Buttons */}
      {(variant === 'secondary' || variant === 'liquid') && (
        <div className="glass-panel-shimmer" />
      )}
      
      {/* Ripple Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className="absolute w-full h-full bg-white bg-opacity-20 rounded-full scale-0"
          initial={false}
          animate={{ scale: 0 }}
          whileTap={{ scale: 4, opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.button>
  );
};

// Preset button variants
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;
export const NeuroButton = (props) => <Button variant="neuro" {...props} />;
export const NeuroDarkButton = (props) => <Button variant="neuro-dark" {...props} />;
export const LiquidButton = (props) => <Button variant="liquid" {...props} />;

export default Button;