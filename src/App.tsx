import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Download, Upload, Moon, Sun, FileJson } from 'lucide-react'; // Aggiungi FileJson
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
    resistance: 'Fire',
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

  // Gestione delle immagini
  const handleImageChange = (url: string) => {
    try {
      new URL(url);
      setCard(prev => ({ ...prev, imageUrl: url }));
    } catch {
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

  // Funzioni di esportazione
  const exportCard = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = `pokemon-card-${card.name}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Errore durante l\'esportazione della carta:', error);
        alert('Errore durante l\'esportazione della carta');
      }
    }
  };

  const exportCardAsJson = () => {
    try {
      const jsonString = JSON.stringify(card, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `pokemon-card-${card.name}.json`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Errore durante l\'esportazione JSON:', error);
      alert('Errore durante l\'esportazione JSON');
    }
  };

  // Funzioni di importazione
  const importCardFromJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          if (isValidPokemonCard(jsonData)) {
            setCard(jsonData);
          } else {
            alert('Il file JSON non è una carta Pokémon valida');
          }
        } catch (error) {
          console.error('Errore durante la lettura del file JSON:', error);
          alert('Errore durante la lettura del file JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  // Validazione carta
  const isValidPokemonCard = (data: unknown): data is PokemonCard => {
    const requiredFields = [
      'name', 'hp', 'type', 'imageUrl', 'description',
      'attack1', 'attack1Damage', 'attack1Cost',
      'attack2', 'attack2Damage', 'attack2Cost',
      'weakness', 'resistance', 'retreatCost'
    ];
    return typeof data === 'object' && data !== null && requiredFields.every(field => field in data);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-yellow-50'}`}>
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
          Export PNG
        </button>
        <button
          onClick={exportCardAsJson}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg"
        >
          <FileJson size={20} />
          Export JSON
        </button>
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg cursor-pointer">
          <Upload size={20} />
          Import Image
          <input type="file" accept="image/*" onChange={handleImageInput} className="hidden" />
        </label>
        <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-lg cursor-pointer">
          <FileJson size={20} />
          Import JSON
          <input type="file" accept=".json" onChange={importCardFromJson} className="hidden" />
        </label>
      </div>

      <div className="pt-20 flex min-h-screen">
        <CardEditor card={card} onCardChange={setCard} />
        <CardPreview card={card} cardRef={cardRef} />
      </div>
    </div>
  );
}

export default App;