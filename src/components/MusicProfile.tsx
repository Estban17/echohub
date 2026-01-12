"use client";
import React from 'react';
import { mockTopGenres } from '@/mocks/spotifyData';

const MusicProfile = () => {
  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800 shadow-xl h-full">
      <h2 className="text-spotify-green font-bold mb-6 uppercase text-xs tracking-widest text-left">
        🎧 Perfil Musical
      </h2>
      
      <div className="space-y-4">
        {mockTopGenres.map((genre) => (
          <div key={genre.name} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span>{genre.name}</span>
              <span className="text-gray-500">{genre.percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${genre.percentage}%`, backgroundColor: genre.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-spotify-green/5 border border-spotify-green/20 rounded-xl text-center">
        <p className="text-[10px] text-spotify-green font-black uppercase tracking-tighter">Tu ADN Sonoro</p>
        <p className="text-xs text-gray-400 italic">Ecléctico y Vibrante</p>
      </div>
    </div>
  );
};

export default MusicProfile;