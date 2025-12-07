import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  fullWidth,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className={styles.spinner} size={18} />}
      {!isLoading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
};
