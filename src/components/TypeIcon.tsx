import { TypeIconProps } from '../types';
import { TYPE_BACKGROUNDS, TYPE_BORDERS, TYPE_TEXT_COLORS, TYPE_IMAGES } from '../constants/types';

export function TypeIcon({ type, size = 'small' }: TypeIconProps) {
  const baseClasses = `${TYPE_BACKGROUNDS[type]} ${TYPE_BORDERS[type]} ${TYPE_TEXT_COLORS[type]} border-2 rounded-full flex items-center justify-center overflow-hidden`;
  const sizeClasses = size === 'small' ? 'w-6 h-6' : 'w-8 h-8';
  
  return (
    <div className={`${baseClasses} ${sizeClasses}`}>
      <img 
        src={TYPE_IMAGES[type]}
        alt={type}
        className="w-5 h-5 object-contain"
      />
    </div>
  );
}