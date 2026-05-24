'use client';

import Image, { type ImageProps } from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from './hooks';

interface CinematicPhotoProps extends Omit<ImageProps, 'fill' | 'placeholder'> {
  parallax?: number;
  lightSweep?: boolean;
  kenBurns?: boolean;
  aspectClass?: string;
  wrapperClassName?: string;
}

export function CinematicPhoto({
  parallax = 0,
  lightSweep = false,
  kenBurns = false,
  aspectClass = 'aspect-[4/5]',
  wrapperClassName,
  className,
  alt,
  // Pull width/height out — Next.js Image rejects them alongside `fill`.
  // They're still accepted on our public API (callers like to express intent
  // and they help the alt accessibility text), they just don't go to <Image>.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  width: _w,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  height: _h,
  ...imageProps
}: CinematicPhotoProps) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || parallax === 0 ? [1, 1] : [1, 1 + parallax],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || parallax === 0 ? ['0%', '0%'] : ['0%', '-6%'],
  );

  return (
    <div
      ref={wrap}
      className={cn(
        'group relative overflow-hidden',
        aspectClass,
        wrapperClassName,
      )}
    >
      <motion.div
        className={cn('absolute inset-0', kenBurns && !reduced && 'kenburns-anim')}
        style={parallax > 0 && !reduced ? { scale, y } : undefined}
      >
        <Image
          alt={alt}
          fill
          sizes={imageProps.sizes ?? '100vw'}
          className={cn('object-cover', className)}
          {...imageProps}
        />
      </motion.div>
      {lightSweep && <div className="lightsweep-overlay" aria-hidden="true" />}
    </div>
  );
}
