// src/types/index.ts
export interface PokemonCard {
  name: string;
  hp: number;
  type: string;
  imageUrl: string;
  cardBackground?: string; // Aggiungi questa proprietà
  description: string;
  attack1: string;
  attack1Damage: string;
  attack1Cost: string[];
  attack2: string;
  attack2Damage: string;
  attack2Cost: string[];
  weakness: string;
  resistance: string;
  retreatCost: number;
}

export interface TypeIconProps {
  type: string;
  size?: 'small' | 'large';
}