import { useState, useRef, useEffect } from 'react';
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
    // Usa un'immagine di default che cambia in base al tema
    imageUrl: isDark ? '/assets/cards/default-dark.png' : '/assets/cards/default-light.png',
    cardBackground: '/assets/cards/lightning-card.webp',
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

  // Aggiorna l'immagine di default quando cambia il tema
  useEffect(() => {
    if (card.imageUrl.includes('default-')) {
      setCard(prev => ({
        ...prev,
        imageUrl: isDark ? '/assets/cards/default-dark.png' : '/assets/cards/default-light.png'
      }));
    }
  }, [isDark, card.imageUrl]);

  const handleImageChange = (url: string) => {
    // Valida se l'URL è valido
    try {
      new URL(url);
      setCard(prev => ({ ...prev, imageUrl: url }));
    } catch {
      // Se non è un URL valido, usa il percorso locale
      setCard(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <input type="file" accept="image/*" onChange={handleImageInput} className="hidden" />
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