import { forwardRef, LegacyRef, useMemo, useRef } from 'react';
import styles from './.module.scss';
import type { HTMLAttributes } from 'react';
import { c } from '@/utils/cls';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  hidden: boolean;
  wrapperRef?: LegacyRef<HTMLDivElement> | undefined;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(({
  children,
  hidden,
  className,
  wrapperRef,
  wrapperProps: {
    style,
    className: wrapperClassName,
    ...wrapperProps
  } = {},
  ...props
}, ref) => {
  const panelRef = useRef<HTMLDivElement>();
  const mergedRef = (value: HTMLDivElement) => {
    if (ref instanceof Function) { ref(value); } else if (ref) { ref.current = value; }
    panelRef.current = value;
  }

  const height = useMemo(() => {
    if (hidden) { return undefined; }
    return panelRef.current?.scrollHeight;
  }, [hidden]);

  return (
    <div
      ref={mergedRef}
      className={c(wrapperClassName, styles['panel-wrapper'])}
      style={{ ...style, height } || undefined}
      {...wrapperProps}
    >
      <div
        ref={ref}
        className={c(className, styles.panel)}
        {...props}
      >
        {children}
      </div>
    </div>
  )
});

export default Panel;