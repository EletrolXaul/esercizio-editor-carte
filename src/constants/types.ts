// src/constants/types.ts
export const TYPES = [
  "Empty",
  "Colorless",
  "Darkness",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Psychic",
  "Water",
];

export const TYPE_BACKGROUNDS: Record<string, string> = {
  Empty: "bg-gray-100",
  Colorless: "bg-gray-100",
  Darkness: "bg-purple-900",
  Fighting: "bg-orange-700",
  Fire: "bg-red-500",
  Grass: "bg-green-500",
  Lightning: "bg-yellow-400",
  Psychic: "bg-purple-500",
  Water: "bg-blue-500",
};

export const TYPE_TEXT_COLORS: Record<string, string> = {
  Empty: "text-gray-400",
  Colorless: "text-gray-700",
  Darkness: "text-white",
  Fighting: "text-white",
  Fire: "text-white",
  Grass: "text-white",
  Lightning: "text-gray-700",
  Psychic: "text-white",
  Water: "text-white",
};

export const TYPE_BORDERS: Record<string, string> = {
  Empty: "border-gray-400",
  Colorless: "border-gray-400",
  Darkness: "border-purple-950",
  Fairy: "border-pink-500",
  Fighting: "border-orange-800",
  Fire: "border-red-600",
  Grass: "border-green-600",
  Lightning: "border-yellow-500",
  Psychic: "border-purple-600",
  Water: "border-blue-600",
};

export const TYPE_IMAGES: Record<string, string> = {
  Empty: "/assets/types/empty.png",
  Colorless: "/assets/types/colorless.png",
  Darkness: "/assets/types/dark.png",
  Fighting: "/assets/types/fighting.png",
  Fire: "/assets/types/fire.png",
  Grass: "/assets/types/grass.png",
  Lightning: "/assets/types/lightning.png",
  Psychic: "/assets/types/psychic.png",
  Water: "/assets/types/water.png",
};

// Aggiungi una nuova costante per gli sfondi delle carte
export const CARD_BACKGROUNDS: Record<string, string> = {
  Colorless: '/assets/cards/normal-card.webp',
  Darkness: '/assets/cards/dark-card.webp',
  Fighting: '/assets/cards/fighting-card.webp',
  Fire: '/assets/cards/fire-card.webp',
  Grass: '/assets/cards/grass-card.webp',
  Lightning: '/assets/cards/lightning-card.webp',
  Psychic: '/assets/cards/psychic-card.webp',
  Water: '/assets/cards/water-card.webp'
};
