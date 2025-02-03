import { ChangeEvent } from 'react';
import { PokemonCard } from '../types';
import { TYPES, CARD_BACKGROUNDS } from '../constants/types';

interface CardEditorProps {
  card: PokemonCard;
  onCardChange: (card: PokemonCard) => void;
}

// Modifica la funzione per accettare il valore corrente come parametro
const validateNumericInput = (name: string, value: string, currentValue: number) => {
  const num = parseInt(value);
  switch (name) {
    case 'hp':
      return num >= 0 && num <= 999 ? num : currentValue;
    case 'retreatCost':
      return num >= 0 && num <= 4 ? num : currentValue;
    default:
      return parseInt(value);
  }
};

const validTypes = TYPES.filter(type => type !== 'Empty');

export function CardEditor({ card, onCardChange }: CardEditorProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'type' && validTypes.includes(value)) {
      const newBackground = CARD_BACKGROUNDS[value] || '/assets/cards/default-card.webp';
      onCardChange({ 
        ...card, 
        [name]: value,
        cardBackground: newBackground
      });
    } else if (name === 'hp' || name === 'retreatCost') {
      const validatedValue = validateNumericInput(name, value, card[name] as number);
      onCardChange({ ...card, [name]: validatedValue });
    } else {
      onCardChange({ ...card, [name]: value });
    }
  };

  const handleEnergyCostChange = (attackNumber: 1 | 2, index: number, value: string) => {
    const costField = `attack${attackNumber}Cost` as 'attack1Cost' | 'attack2Cost';
    const newCost = [...card[costField]];
    
    if (validTypes.includes(value)) {
      newCost[index] = value;
      onCardChange({ ...card, [costField]: newCost });
    }
  };

  return (
    <div className="w-1/2 p-8 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-thin">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Card Editor</h2>
        <div className="space-y-6">
          {/* Campi base */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nome</label>
            <input
              type="text"
              name="name"
              value={card.name}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">HP</label>
            <input
              type="number"
              name="hp"
              value={card.hp}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tipo</label>
            <select
              name="type"
              value={card.type}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {validTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Immagine URL (opzionale)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                name="imageUrl"
                value={card.imageUrl.startsWith('data:') ? '' : card.imageUrl}
                onChange={(e) => onCardChange({ ...card, imageUrl: e.target.value })}
                placeholder="Inserisci URL immagine"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg cursor-pointer">
                Upload
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onCardChange({ ...card, imageUrl: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Descrizione</label>
            <textarea
              name="description"
              value={card.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Attacchi */}
          {[1, 2].map(attackNum => (
            <div key={attackNum} className="space-y-4">
              <h3 className="text-lg font-semibold">Attacco {attackNum}</h3>
              <input
                type="text"
                name={`attack${attackNum}`}
                value={card[`attack${attackNum}` as 'attack1' | 'attack2']}
                onChange={handleInputChange}
                placeholder="Nome attacco"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                name={`attack${attackNum}Damage`}
                value={card[`attack${attackNum}Damage` as 'attack1Damage' | 'attack2Damage']}
                onChange={handleInputChange}
                placeholder="Danno"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                {card[`attack${attackNum}Cost` as 'attack1Cost' | 'attack2Cost'].map((_, index) => (
                  <select
                    key={index}
                    value={card[`attack${attackNum}Cost` as 'attack1Cost' | 'attack2Cost'][index]}
                    onChange={(e) => handleEnergyCostChange(attackNum as 1 | 2, index, e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {validTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          ))}

          {/* Debolezza, Resistenza e Costo Ritirata */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Debolezza</label>
              <select
                name="weakness"
                value={card.weakness}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {validTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Resistenza</label>
              <select
                name="resistance"
                value={card.resistance}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {validTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Costo Ritirata</label>
              <input
                type="number"
                name="retreatCost"
                value={card.retreatCost}
                onChange={handleInputChange}
                min={0}
                max={4}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}