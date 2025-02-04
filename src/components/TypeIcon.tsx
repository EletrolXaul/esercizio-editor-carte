import { TypeIconProps } from "../types";
import { TYPE_IMAGES } from "../constants/types";

export function TypeIcon({ type, size, className }: TypeIconProps) {
  const baseClasses = `rounded-full flex items-center justify-center overflow-hidden`;
  const sizeClasses = size === "small" ? "w-6 h-6" : "";
  const sizeClassesBig = size === "large" ? "w-12 h-12" : "";

  return (
    <div
      className={`${baseClasses} ${sizeClasses} ${sizeClassesBig} ${className}`}
    >
      <img
        src={TYPE_IMAGES[type]}
        alt={type}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
