import { forwardRef } from 'react';
import { c } from '@/utils/cls';
import styles from './.module.scss';
import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

const Textarea = forwardRef<HTMLTextAreaElement, DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={c(className, styles.textarea)}
      {...props}
    >
      {children}
    </textarea>
  )
});

export default Textarea;