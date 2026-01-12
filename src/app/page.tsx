"use client";

import { useState, useEffect } from 'react';
import Ticket from '@/components/Ticket'
import { mockTopTracks, mockUserProfile } from '@/mocks/spotifyData'
import CulturalExplorer from '@/components/CulturalExplorer'
import MoodAnalyzer from '@/components/MoodAnalyzer'
import MusicProfile from '@/components/MusicProfile'
import LoadingScreen from '@/components/LoadingScreen'

interface Track {
  id: string;
  name: string;
  artist: string;
  albumImg: string;
  popularity: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 segundos de Splash Screen
    return () => clearTimeout(timer);
  }, []);

  const girarRuleta = () => {
    setIsSpinning(true);
    setSelectedTrack(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockTopTracks.length);
      setSelectedTrack(mockTopTracks[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#121212] text-white p-4 md:p-10 font-sans animate-in fade-in duration-1000">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-[#1DB954] tracking-tighter italic">ECHOHUB</h1>
        <div className="flex items-center gap-4 bg-black p-2 rounded-full px-4 border border-gray-800">
          <div className="w-8 h-8 bg-linear-to-tr from-purple-500 to-[#1DB954] rounded-full"></div>
          <span className="text-sm font-bold">{mockUserProfile.name}</span>
        </div>
      </header>

      {/* Grid Principal Reorganizado */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Columna 1: Perfil y ADN */}
        <section className="space-y-6 flex flex-col">
          <MusicProfile />
          <MoodAnalyzer />
        </section>

        {/* Columna 2 y 3: El Ticket (Protagonista Central) */}
        <section className="lg:col-span-2 flex flex-col items-center">
           <h2 className="text-[#1DB954] font-bold mb-6 uppercase text-xs tracking-widest text-center">🎫 Tu Recibo Musical</h2>
           <Ticket tracks={mockTopTracks} />
           <p className="mt-8 text-gray-500 text-[10px] uppercase tracking-[0.3em]">Scanned at EchoHub Terminal</p>
        </section>

        {/* Columna 4: Ruleta y Exploración */}
        <section className="space-y-6 flex flex-col">
          <CulturalExplorer />
          
          <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between grow">
            <div>
              <h2 className="text-[#1DB954] font-bold mb-6 uppercase text-xs tracking-widest text-center">🎲 La Ruleta</h2>
              
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
              className={`w-full py-4 font-black rounded-full shadow-lg transition-all cursor-pointer ${
                isSpinning 
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                  : 'bg-[#1DB954] text-black hover:scale-105 active:scale-95 shadow-[#1db954]/20'
              }`}
            >
              {isSpinning ? 'GIRANDO...' : '¡GIRAR RULETA!'}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}