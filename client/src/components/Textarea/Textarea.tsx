import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from 'react';

import { c } from '@/utils/cls';

import styles from './.module.scss';

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

Textarea.displayName = 'Textarea';

export default Textarea;