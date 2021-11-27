import { forwardRef } from 'react';
import { c } from '@/utils/cls';
import styles from './.module.scss';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={c(className, styles.input)}
      {...props}
    >
      {children}
    </input>
  )
});

export default Input