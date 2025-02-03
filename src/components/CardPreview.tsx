// src/components/CardPreview.tsx
import { RefObject } from 'react';
import { PokemonCard } from '../types';
import { TypeIcon } from './TypeIcon';

interface CardPreviewProps {
  card: PokemonCard;
  cardRef: RefObject<HTMLDivElement>;
}

export function CardPreview({ card, cardRef }: CardPreviewProps) {
  return (
    <div className="w-1/2 fixed right-0 top-20 bottom-0 flex items-center justify-center p-4">
      <div 
        ref={cardRef} 
        className="w-[400px] h-[560px] rounded-xl p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${card.cardBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{card.name}</h3>
          <span className="text-lg">HP {card.hp}</span>
          <TypeIcon type={card.type} size="large" />
        </div>

        {/* Immagine */}
        <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Descrizione */}
        <p className="text-sm text-gray-600 mb-4">{card.description}</p>

        {/* Attacchi */}
        <div className="space-y-4 mb-4">
          {[1, 2].map(attackNum => (
            <div key={attackNum} className="flex items-center gap-2">
              <div className="flex gap-1">
                {card[`attack${attackNum}Cost` as 'attack1Cost' | 'attack2Cost'].map((type, index) => (
                  <TypeIcon key={index} type={type} size="small" />
                ))}
              </div>
              <span className="font-medium">{card[`attack${attackNum}` as 'attack1' | 'attack2']}</span>
              <span className="ml-auto">{card[`attack${attackNum}Damage` as 'attack1Damage' | 'attack2Damage']}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm">Debolezza:</span>
            <TypeIcon type={card.weakness} size="small" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Resistenza:</span>
            <TypeIcon type={card.resistance} size="small" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Ritirata:</span>
            {Array.from({ length: card.retreatCost }).map((_, i) => (
              <TypeIcon key={i} type="Colorless" size="small" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}