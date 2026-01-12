"use client";
import React, { useState } from 'react';
import { mockCulturalData } from '@/mocks/spotifyData';

const CulturalExplorer = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selected, setSelected] = useState(mockCulturalData[0]);

  const explorarAzar = () => {
    setIsSpinning(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockCulturalData.length);
      setSelected(mockCulturalData[randomIndex]);
      setIsSpinning(false);
    }, 1200); // Duración del viaje musical
  };

  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 h-full flex flex-col items-center">
      <h2 className="text-spotify-green font-bold mb-6 uppercase text-xs tracking-widest self-start">
        🌍 Exploración Cultural
      </h2>
      
      {/* Visualización del Globo Terraqueo */}
      <div className="relative mb-6">
        <div className={`text-7xl transition-all duration-1000 ${isSpinning ? 'animate-bounce scale-110 blur-[1px]' : 'hover:scale-110'}`}>
          {isSpinning ? '✈️' : '🌎'}
        </div>
        {/* Anillo de órbita decorativo */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-dashed border-spotify-green/30 rounded-full ${isSpinning ? 'animate-spin' : ''}`}></div>
      </div>

      <div className="w-full mt-2 p-4 bg-black/40 rounded-xl border border-white/5 min-h-[160px] flex flex-col justify-center">
        {isSpinning ? (
          <p className="text-center text-spotify-green animate-pulse font-mono text-xs italic">
            VIAJANDO A {selected.country.toUpperCase()}...
          </p>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500 text-left">
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] bg-spotify-green text-black px-2 py-0.5 rounded font-black uppercase">
                 {selected.country}
               </span>
               <span className="text-[10px] text-gray-500 font-mono italic">#{selected.id}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-1 uppercase leading-tight">{selected.genre}</h3>
            <p className="text-xs text-gray-400 mb-4 tracking-tighter">Artista destacado: <span className="text-white font-bold">{selected.topArtist}</span></p>
            
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-spotify-green h-full transition-all duration-700" 
                style={{ width: `${selected.energy * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={explorarAzar}
        disabled={isSpinning}
        className={`w-full mt-6 py-4 font-black rounded-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
          isSpinning ? 'bg-gray-800 text-gray-500' : 'bg-white text-black hover:bg-spotify-green'
        }`}
      >
        <span>{isSpinning ? 'BUSCANDO FRECUENCIAS...' : 'GIRAR GLOBO TERRAQUEO'}</span>
      </button>
    </div>
  );
};

export default CulturalExplorer;