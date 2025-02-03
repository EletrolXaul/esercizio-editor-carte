import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Upload, Moon, Sun } from 'lucide-react';
import { CardEditor } from './components/CardEditor';
import { CardPreview } from './components/CardPreview';
import type { PokemonCard } from './types';

function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [card, setCard] = useState<PokemonCard>({
    name: 'Pikachu',
    hp: 60,
    type: 'Lightning',
    imageUrl: '/assets/cards/default-card.png', // Usa un'immagine dalla tua cartella assets
    cardBackground: '/assets/cards/lightning-card.webp', // Aggiungi il background iniziale
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
      {/* Header buttons */}
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
        <CardEditor card={card} onCardChange={setCard} />
        <CardPreview card={card} cardRef={cardRef} />
      </div>
    </div>
  );
}

export default App;