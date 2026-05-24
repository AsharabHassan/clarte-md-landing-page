'use client';

import { Children, cloneElement, isValidElement, type ReactElement, type Ref } from 'react';
import { useMagnetic } from './hooks';

export function Magnetic({
  children,
  strength = 8,
}: {
  children: ReactElement<{ ref?: Ref<HTMLElement>; style?: React.CSSProperties }>;
  strength?: number;
}) {
  const { ref, style } = useMagnetic(strength);
  if (!isValidElement(children)) return children;
  const existingStyle = (children.props.style ?? {}) as React.CSSProperties;
  return cloneElement(Children.only(children), {
    ref: ref as unknown as Ref<HTMLElement>,
    style: { ...existingStyle, ...style, willChange: 'transform' },
  });
}
