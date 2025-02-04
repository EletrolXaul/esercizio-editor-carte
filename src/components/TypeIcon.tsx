import { TypeIconProps } from '../types';
import { TYPE_IMAGES } from '../constants/types';

export function TypeIcon({ type, size = 'small' }: TypeIconProps) {
  const baseClasses = `rounded-full flex items-center justify-center overflow-hidden`;
  const sizeClasses = size === 'small' ? 'w-6 h-6' : 'w-8 h-8';
  
  return (
    <div className={`${baseClasses} ${sizeClasses}`}>
      <img 
        src={TYPE_IMAGES[type]}
        alt={type}
        className="w-6 h-6 object-contain"
      />
    </div>
  );
}