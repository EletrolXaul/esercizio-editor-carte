import { RefObject } from "react"; // Aggiungi React
import { PokemonCard } from "../types";
import { TypeIcon } from "./TypeIcon";

interface CardPreviewProps {
  card: PokemonCard;
  cardRef: RefObject<HTMLDivElement>;
}

export function CardPreview({ card, cardRef }: CardPreviewProps) {
  return (
    <div className="w-1/2 fixed right-0 top-20 bottom-0 flex items-center justify-center p-4">
      <div ref={cardRef} className="w-[400px] h-[560px] relative">
        <div className="relative z-10 h-full flex flex-col p-4">
          {/* Bg Carta */}
          <div
            className="absolute inset-0 z-10 w-[400px] h-[560px] rounded-xl overflow-hidden shadow-xl"
            style={{
              backgroundImage: `url(${card.cardBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Header - Nome e HP */}
          <div className="relative z-20 flex justify-between items-center px-4 rounded-t-lg border-b border-gray-300">
            <h3
              className={`text-2xl text-bold ml-10 ${
                card.type != "Darkness" ? "text-black" : "text-white"
              }`}
            >
              {card.name}
            </h3>
            <p
              className={`mr-5 flex items-end gap-0.5 ${
                card.type != "Darkness" ? "text-black" : "text-white"
              }`}
            >
              <span className="text-xs font-bold">HP</span>{" "}
              <span className="text-2xl font-bold leading-none">{card.hp}</span>
            </p>
          </div>

          {/* Immagine Pokémon */}
          <div className="w-[350px] min-h-[220px] mt-1 mx-auto relative z-0 shadow-md overflow-hidden">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-[220px] object-cover object-center rounded-sm"
            />
          </div>

          {/* Descrizione */}
          <div className="text-center text-xs italic text-black rounded-md realtive -mt-2 z-20">
            {card.description}
          </div>

          {/* Attacchi */}
          <div className="mt-4 space-y-2 px-4 relative h-full z-20">
            {[1, 2].map((attackNum) => (
              <div
                key={attackNum}
                className={`flex items-center gap-2 p-2 ${
                  card.type != "Darkness" ? "text-black" : "text-white"
                }`}
              >
                <div className="flex gap-1 w-[80px]">
                  {card[
                    `attack${attackNum}Cost` as "attack1Cost" | "attack2Cost"
                  ].map((type, index) => (
                    <TypeIcon key={index} type={type} size="small" />
                  ))}
                </div>
                <span className="font-bold flex-1 text-lg">
                  {card[`attack${attackNum}` as "attack1" | "attack2"]}
                </span>
                <span className="font-bold text-lg">
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
          <div className="absolute bottom-[3.4rem] left-4 right-4 z-20">
            <div className="flex justify-between items-center p-2 ">
              <div className="flex items-center justify-center pl-2 gap-2 w-[90px]">
                <TypeIcon type={card.weakness} className="size-4" />
              </div>
              <div className="flex items-center justify-center pl-2 gap-2 w-[90px]">
                <TypeIcon type={card.resistance} className="size-4" />
              </div>
              <div className="flex items-center justify-center pl-2 gap-1 w-[90px]">
                {Array.from({ length: card.retreatCost }).map((_, i) => (
                  <TypeIcon key={i} type="Colorless" className="size-4" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
