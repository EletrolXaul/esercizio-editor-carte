import { RefObject } from "react";
import { PokemonCard } from "../types";
import { TypeIcon } from "./TypeIcon";

interface CardPreviewProps {
  card: PokemonCard;
  cardRef: RefObject<HTMLDivElement>;
}

export function CardPreview({ card, cardRef }: CardPreviewProps) {
  return (
    <div className="w-1/2 fixed right-0 top-20 bottom-0 flex items-center justify-center p-4">
      <div
        ref={cardRef}
        className="w-[400px] h-[560px] rounded-xl relative overflow-hidden border-[12px] border-yellow-500 shadow-xl"
        style={{
          backgroundImage: `url(${card.cardBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/10" />

        <div className="relative z-10 h-full flex flex-col p-4">
          {/* Header - Nome e HP */}
          <div className="flex justify-between items-center px-4 py-2 bg-white/80 rounded-t-lg border-b border-gray-300">
            <h3 className="text-2xl font-bold text-black">{card.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">HP {card.hp}</span>
              <TypeIcon type={card.type} size="large" />
            </div>
          </div>

          {/* Immagine Pokémon */}
          <div className="mt-4 mx-auto w-[320px] h-[220px] relative border-[6px] border-gray-300 rounded-md bg-white shadow-md overflow-hidden">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover object-center rounded-sm"
            />
          </div>

          {/* Descrizione */}
          <div className="mt-4 px-4 text-center text-sm italic text-gray-700 bg-white/80 py-2 rounded-md border border-gray-300">
            {card.description}
          </div>

          {/* Attacchi */}
          <div className="mt-4 space-y-2 px-4">
            {[1, 2].map((attackNum) => (
              <div
                key={attackNum}
                className="flex items-center gap-2 p-2 bg-white/90 rounded-lg border border-gray-300 shadow-sm"
              >
                <div className="flex gap-1">
                  {card[
                    `attack${attackNum}Cost` as "attack1Cost" | "attack2Cost"
                  ].map((type, index) => (
                    <TypeIcon key={index} type={type} size="small" />
                  ))}
                </div>
                <span className="font-bold text-black flex-1 text-lg">
                  {card[`attack${attackNum}` as "attack1" | "attack2"]}
                </span>
                <span className="font-bold text-black text-lg">
                  {
                    card[
                      `attack${attackNum}Damage` as
                        | "attack1Damage"
                        | "attack2Damage"
                    ]
                  }
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-center p-2 bg-white/90 rounded-lg border border-gray-300 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-black">Debolezza</span>
                <TypeIcon type={card.weakness} size="small" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-black">Resistenza</span>
                <TypeIcon type={card.resistance} size="small" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-black">Ritirata</span>
                {Array.from({ length: card.retreatCost }).map((_, i) => (
                  <TypeIcon key={i} type="Colorless" size="small" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
