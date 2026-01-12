"use client"; // Habilitamos interactividad

import { useState } from 'react';
import Ticket from '@/components/Ticket'
import { mockTopTracks, mockUserProfile } from '@/mocks/spotifyData'

// Definimos la estructura de la canción para que TypeScript sea feliz
interface Track {
  id: string;
  name: string;
  artist: string;
  albumImg: string;
  popularity: number;
}

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  // Aquí cambiamos <any> por <Track | null>
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const girarRuleta = () => {
    setIsSpinning(true);
    setSelectedTrack(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockTopTracks.length);
      setSelectedTrack(mockTopTracks[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white p-4 md:p-10 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-[#1DB954] tracking-tighter italic">ECHOHUB</h1>
        <div className="flex items-center gap-4 bg-black p-2 rounded-full px-4 border border-gray-800">
          {/* Corregido: bg-gradient-to-tr */}
          <div className="w-8 h-8 bg-linear-to-tr from-purple-500 to-[#1DB954] rounded-full"></div>
          <span className="text-sm font-bold">{mockUserProfile.name}</span>
        </div>
      </header>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda */}
        <section className="space-y-6">
          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <h2 className="text-[#1DB954] font-bold mb-4 uppercase text-xs tracking-widest">🧠 Estado de Ánimo</h2>
            <div className="flex items-end gap-2 h-20">
              <div className="w-full bg-gray-800 h-full rounded-t-lg overflow-hidden flex flex-col justify-end">
                <div className="bg-[#1DB954] w-full" style={{ height: '75%' }}></div>
              </div>
              <div className="w-full bg-gray-800 h-full rounded-t-lg overflow-hidden flex flex-col justify-end">
                <div className="bg-purple-500 w-full" style={{ height: '45%' }}></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
              <span>ENERGÍA</span>
              <span>FELICIDAD</span>
            </div>
          </div>

          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800">
            <h2 className="text-[#1DB954] font-bold mb-4 uppercase text-xs tracking-widest">🌍 Exploración</h2>
            <p className="text-sm text-gray-400 mb-4 text-left">Descubre música del mundo.</p>
            <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-[#1DB954] transition-colors active:scale-95">
              Girar Globo
            </button>
          </div>
        </section>

        {/* Columna Central */}
        <section className="flex flex-col items-center">
          <Ticket tracks={mockTopTracks} />
        </section>

        {/* Columna Derecha: Ruleta */}
        <section className="bg-[#181818] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
          <div>
            <h2 className="text-[#1DB954] font-bold mb-6 uppercase text-xs tracking-widest text-center">🎲 La Ruleta</h2>
            
            {/* Corregido: duracion-1500 y rotate-1080 */}
            <div className={`relative aspect-square rounded-full border-4 border-dashed border-[#1DB954] flex items-center justify-center mb-6 transition-transform duration-1500 ease-out ${isSpinning ? 'rotate-1080' : 'rotate-0'}`}>
              <div className="text-center p-4">
                {isSpinning ? (
                  <span className="text-4xl animate-pulse">🌀</span>
                ) : selectedTrack ? (
                  <div className="animate-in fade-in zoom-in duration-500">
                    <p className="text-[#1DB954] font-black text-lg leading-tight uppercase">{selectedTrack.name}</p>
                    <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-widest">{selectedTrack.artist}</p>
                  </div>
                ) : (
                  <span className="text-4xl opacity-20 font-black text-[#1DB954]">?</span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={girarRuleta}
            disabled={isSpinning}
            className={`w-full py-4 font-black rounded-full shadow-lg transition-all ${
              isSpinning 
                ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                : 'bg-[#1DB954] text-black hover:scale-105 active:scale-95 shadow-[#1db954]/20'
            }`}
          >
            {isSpinning ? 'GIRANDO...' : '¡GIRAR RULETA!'}
          </button>
        </section>
      </div>
    </main>
  );
}