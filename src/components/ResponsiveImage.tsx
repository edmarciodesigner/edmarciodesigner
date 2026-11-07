import type { ImgHTMLAttributes } from 'react';

type NativeImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'loading' | 'decoding' | 'fetchPriority'
>;

export interface ResponsiveImageProps extends NativeImageProps {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly priority?: boolean;
}

/**
 * Mantém um img direto no DOM para preservar os seletores e a composição atuais.
 * width/height reservam a proporção; srcSet/sizes aceitam variantes reais do asset.
 * Somente a fotografia principal deve receber priority.
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  srcSet,
  sizes,
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
