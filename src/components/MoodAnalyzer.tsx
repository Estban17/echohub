"use client";
import React from 'react';
import { mockMoodHistory } from '@/mocks/spotifyData';

const MoodAnalyzer = () => {
  const lastMood = mockMoodHistory[mockMoodHistory.length - 1];

  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 shadow-xl h-full flex flex-col">
      <h2 className="text-spotify-green font-bold mb-6 uppercase text-xs tracking-widest text-left">
        🧠 Música y Emociones
      </h2>

      <div className="grow flex flex-col justify-center gap-6">
        {/* Termómetro de Felicidad (Valence) */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-blue-400">Triste</span>
            <span className="text-yellow-400">Feliz</span>
          </div>
          <div className="h-4 bg-gray-900 rounded-full p-1 border border-white/5 relative">
            <div 
              className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-yellow-400 rounded-full transition-all duration-1000"
              style={{ width: `${lastMood.valence * 100}%` }}
            ></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-6 bg-white border-2 border-black rounded-sm shadow-lg transition-all duration-1000"
              style={{ left: `calc(${lastMood.valence * 100}% - 6px)` }}
            ></div>
          </div>
        </div>

        {/* Indicador de Estado Actual */}
        <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center animate-pulse">
          <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Estado Detectado</p>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            {lastMood.mood}
          </h3>
        </div>

        {/* Historial rápido en miniatura */}
        <div className="flex justify-between items-end h-12 gap-1 px-2">
          {mockMoodHistory.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1 w-full">
              <div 
                className="w-full bg-spotify-green/20 rounded-t-sm transition-all hover:bg-spotify-green"
                style={{ height: `${item.energy * 100}%` }}
              ></div>
              <span className="text-[8px] text-gray-600 uppercase">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[10px] text-gray-500 italic text-left border-t border-gray-800 pt-4">
        * Basado en la valencia y energía de tus últimas 50 canciones.
      </p>
    </div>
  );
};

export default MoodAnalyzer;