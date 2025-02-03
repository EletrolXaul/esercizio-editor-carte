import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Upload, Moon, Sun } from 'lucide-react';

interface PokemonCard {
  name: string;
  hp: number;
  type: string;
  imageUrl: string;
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

const TYPES = [
  'Colorless', 'Darkness', 'Dragon', 'Fairy', 'Fighting', 'Fire', 
  'Grass', 'Lightning', 'Metal', 'Psychic', 'Water'
];

const TYPE_BACKGROUNDS: Record<string, string> = {
  Colorless: 'bg-gray-100',
  Darkness: 'bg-purple-900',
  Dragon: 'bg-yellow-600',
  Fairy: 'bg-pink-400',
  Fighting: 'bg-orange-700',
  Fire: 'bg-red-500',
  Grass: 'bg-green-500',
  Lightning: 'bg-yellow-400',
  Metal: 'bg-gray-400',
  Psychic: 'bg-purple-500',
  Water: 'bg-blue-500'
};

const TYPE_TEXT_COLORS: Record<string, string> = {
  Colorless: 'text-gray-700',
  Darkness: 'text-white',
  Dragon: 'text-white',
  Fairy: 'text-white',
  Fighting: 'text-white',
  Fire: 'text-white',
  Grass: 'text-white',
  Lightning: 'text-gray-700',
  Metal: 'text-white',
  Psychic: 'text-white',
  Water: 'text-white'
};

const TYPE_BORDERS: Record<string, string> = {
  Colorless: 'border-gray-400',
  Darkness: 'border-purple-950',
  Dragon: 'border-yellow-700',
  Fairy: 'border-pink-500',
  Fighting: 'border-orange-800',
  Fire: 'border-red-600',
  Grass: 'border-green-600',
  Lightning: 'border-yellow-500',
  Metal: 'border-gray-500',
  Psychic: 'border-purple-600',
  Water: 'border-blue-600'
};

const TYPE_IMAGES: Record<string, string> = {
  Colorless: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/normal-gem.png',
  Darkness: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dark-gem.png',
  Dragon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dragon-gem.png',
  Fairy: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fairy-gem.png',
  Fighting: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fist-plate.png',
  Fire: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-gem.png',
  Grass: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/grass-gem.png',
  Lightning: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/electric-gem.png',
  Metal: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/iron-plate.png',
  Psychic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/psychic-gem.png',
  Water: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-gem.png'
};

function TypeIcon({ type, size = 'small' }: { type: string; size?: 'small' | 'large' }) {
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

function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState<PokemonCard>({
    name: 'Pikachu',
    hp: 60,
    type: 'Lightning',
    imageUrl: 'https://images.unsplash.com/photo-1638611831248-c74d3c7b43c5?w=400&h=300&fit=crop',
    description: 'Mouse Pokémon. Length: 1\'04", Weight: 13 lbs.',
    attack1: 'Thunder Shock',
    attack1Damage: '20',
    attack1Cost: ['Lightning'],
    attack2: 'Quick Attack',
    attack2Damage: '10',
    attack2Cost: ['Colorless', 'Lightning'],
    weakness: 'Fighting',
    resistance: 'Metal',
    retreatCost: 1
  });

  const [isDark, setIsDark] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCard(prev => ({ ...prev, [name]: value }));
  };

  const handleEnergyCostChange = (attackNumber: 1 | 2, index: number, value: string) => {
    const costField = `attack${attackNumber}Cost` as 'attack1Cost' | 'attack2Cost';
    setCard(prev => {
      const newCost = [...prev[costField]];
      newCost[index] = value;
      return { ...prev, [costField]: newCost };
    });
  };

  const exportCard = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `pokemon-card-${card.name}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const importImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCard(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-yellow-50'}`}>
      {/* Header con i pulsanti */}
      <div className="fixed top-0 right-0 p-4 flex gap-4 z-10">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg bg-white/90 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
        >
          {isDark ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-700" />}
        </button>
        <button
          onClick={exportCard}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow-lg"
        >
          <Download size={20} />
          Export
        </button>
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg cursor-pointer">
          <Upload size={20} />
          Import
          <input type="file" accept="image/*" onChange={importImage} className="hidden" />
        </label>
      </div>

      {/* Main content */}
      <div className="pt-20 flex min-h-screen">
        {/* Editor Form - Scrollabile */}
        <div className="w-1/2 p-8 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-thin">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Pokémon Card Editor</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={card.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HP</label>
                  <input
                    type="number"
                    name="hp"
                    value={card.hp}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <select
                  name="type"
                  value={card.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                >
                  {TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={card.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={card.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                  rows={2}
                />
              </div>

              {/* Attack 1 */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Attack 1</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      name="attack1"
                      value={card.attack1}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Damage</label>
                    <input
                      type="text"
                      name="attack1Damage"
                      value={card.attack1Damage}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Energy Cost</label>
                  <div className="flex gap-2 mt-1">
                    {[0].map((_, index) => (
                      <select
                        key={index}
                        value={card.attack1Cost[index]}
                        onChange={(e) => handleEnergyCostChange(1, index, e.target.value)}
                        className="block w-32 rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                      >
                        {TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attack 2 */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Attack 2</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      name="attack2"
                      value={card.attack2}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Damage</label>
                    <input
                      type="text"
                      name="attack2Damage"
                      value={card.attack2Damage}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Energy Cost</label>
                  <div className="flex gap-2 mt-1">
                    {[0, 1].map((_, index) => (
                      <select
                        key={index}
                        value={card.attack2Cost[index]}
                        onChange={(e) => handleEnergyCostChange(2, index, e.target.value)}
                        className="block w-32 rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                      >
                        {TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weakness</label>
                  <select
                    name="weakness"
                    value={card.weakness}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                  >
                    {TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resistance</label>
                  <select
                    name="resistance"
                    value={card.resistance}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                  >
                    {TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Retreat Cost</label>
                  <input
                    type="number"
                    name="retreatCost"
                    value={card.retreatCost}
                    onChange={handleInputChange}
                    min="0"
                    max="4"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500 dark:focus:ring-yellow-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Preview - Fissa */}
        <div className="w-1/2 fixed right-0 top-20 bottom-0 flex items-center justify-center p-4">
          <div
            ref={cardRef}
            className="w-[400px] h-[560px] rounded-xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fef6e4 0%, #ffd700 100%)',
              fontFamily: 'Arial, sans-serif',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Card Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{card.name}</h3>
                <TypeIcon type={card.type} size="small" />
              </div>
              <span className="font-bold text-lg">HP {card.hp}</span>
            </div>

            {/* Card Image */}
            <div className="relative">
              <div className="absolute inset-0 border-4 border-yellow-600 rounded-lg"></div>
              <div className="h-48 rounded-lg overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Type and Description */}
            <div className="mt-4 p-2 bg-yellow-50/80 backdrop-blur-sm rounded-lg border border-yellow-200">
              <div className="text-sm font-semibold flex items-center gap-2">
                <TypeIcon type={card.type} size="small" />
                <span>{card.type} Pokémon</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{card.description}</p>
            </div>

            {/* Attacks */}
            <div className="space-y-3 mt-4">
              <div className="bg-yellow-50/80 backdrop-blur-sm p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {card.attack1Cost.map((type, index) => (
                      <TypeIcon key={index} type={type} size="small" />
                    ))}
                    <span className="font-semibold">{card.attack1}</span>
                  </div>
                  <span className="font-bold">{card.attack1Damage}</span>
                </div>
              </div>
              <div className="bg-yellow-50/80 backdrop-blur-sm p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {card.attack2Cost.map((type, index) => (
                      <TypeIcon key={index} type={type} size="small" />
                    ))}
                    <span className="font-semibold">{card.attack2}</span>
                  </div>
                  <span className="font-bold">{card.attack2Damage}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="grid grid-cols-3 gap-4 bg-yellow-50/80 backdrop-blur-sm p-2 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-1">
                  <span className="text-xs">Weakness</span>
                  <TypeIcon type={card.weakness} size="small" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs">Resistance</span>
                  <TypeIcon type={card.resistance} size="small" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs">Retreat</span>
                  {Array.from({ length: card.retreatCost }).map((_, index) => (
                    <TypeIcon key={index} type="Colorless" size="small" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;