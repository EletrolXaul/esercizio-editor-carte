// src/constants/types.ts
export const TYPES = [
  "Colorless",
  "Darkness",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Psychic",
  "Water",
];

export const TYPE_IMAGES: Record<string, string> = {
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
