import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import { c } from '@/utils/cls';

import styles from './.module.scss';

const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({
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

Input.displayName = 'Input';

export default Input