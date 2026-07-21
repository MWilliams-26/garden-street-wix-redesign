export default function ResponsiveImage({ image, priority = false, className = '' }) {
  return (
    <img
      className={className}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ '--position': image.objectPosition, '--mobile-position': image.mobileObjectPosition }}
    />
  );
}
