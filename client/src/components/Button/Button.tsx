import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';

import { c } from '@/utils/cls';

import styles from './.module.scss';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  accent?: boolean;
  variant?: 'solid' | 'outlined';
  corners?: 'rounded' | 'pill' | 'sharp';
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  accent,
  variant = 'solid',
  corners = 'rounded',
  className,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={c(className, styles.button,
        accent && styles['button--accent'],
        variant === 'outlined' && styles['button--outlined'],
        corners === 'pill' && styles['button--pill'],
        corners === 'sharp' && styles['button--sharp'],
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;