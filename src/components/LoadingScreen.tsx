"use client";
import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');

  // Efecto de puntos suspensivos animados
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]">
      {/* Logo Animado */}
      <div className="relative mb-8">
        <h1 className="text-6xl font-black text-spotify-green tracking-tighter italic animate-pulse">
          ECHOHUB
        </h1>
        {/* Anillo de carga sutil */}
        <div className="absolute inset-0 border-4 border-spotify-green/20 rounded-full scale-150 animate-ping"></div>
      </div>

      {/* Texto de estado */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.5em]">
          Sincronizando frecuencias{dots}
        </p>
        <div className="w-48 h-1 bg-gray-900 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-spotify-green animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;