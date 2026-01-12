"use client";
import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

interface Track {
  id: string;
  name: string;
  artist: string;
  popularity: number;
}

interface TicketProps {
  tracks: Track[];
  styleType: 'classic' | 'neon' | 'minimal';
}

const Ticket = ({ tracks, styleType }: TicketProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (ticketRef.current === null) return;

    // Generar fecha y hora para el nombre del archivo
    const ahora = new Date();
    const fechaStr = ahora.toLocaleDateString('es-ES').replace(/\//g, '-');
    const horaStr = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '-');
    const nombreArchivo = `echohub-ticket-${fechaStr}-${horaStr}.png`;

    toPng(ticketRef.current, { 
      cacheBust: true,
      // IMPORTANTE: Quitamos el backgroundColor sólido aquí para que 
      // el redondeado de las esquinas sea respetado sobre la transparencia.
      pixelRatio: 3,
      style: {
        transform: 'scale(1)',
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = nombreArchivo;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Error al generar imagen:', err));
  };

  const themeStyles = {
    classic: "bg-white text-black border-t-[12px] border-x border-b border-dashed border-gray-300",
    // Agregamos overflow-hidden para asegurar el recorte de esquinas en la captura
    neon: "bg-[#121212] text-[#1DB954] border-2 border-[#1DB954] shadow-[0_0_15px_rgba(29,185,84,0.5)] overflow-hidden",
    minimal: "bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800 rounded-3xl border border-gray-300 overflow-hidden"
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-4"> 
        <div 
          ref={ticketRef} 
          /* Agregamos overflow-hidden para forzar el redondeado en la exportación */
          className={`${themeStyles[styleType]} p-8 font-mono w-87.5 transition-all duration-500 flex flex-col overflow-hidden`}
        >
          <h2 className="text-2xl font-black text-center mb-1 uppercase tracking-tighter italic">
            ECHOHUB RECEIPT
          </h2>
          
          <p className="text-[10px] text-center mb-6 border-b border-current pb-2 uppercase opacity-70 font-bold">
            {new Date().toLocaleDateString()} — ORDER #0001
          </p>
          
          <div className="space-y-4 grow">
            {tracks.map((track, index) => (
              <div key={track.id} className="flex justify-between items-start text-[11px] leading-tight">
                <span className="uppercase font-bold pr-4">
                  {index + 1}. {track.name} - {track.artist}
                </span>
                <span className="font-black shrink-0">{track.popularity}%</span>
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-dashed border-current opacity-30"></div>

          <div className="flex justify-between items-center mb-6">
            <span className="font-black text-sm uppercase tracking-tighter">Total Genres:</span>
            <span className="font-black text-sm">4</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-full h-14 bg-current opacity-90"></div>
            <p className="text-[9px] tracking-[0.5em] font-bold">000100010001</p>
            
            <p className="text-[10px] mt-4 text-center font-bold uppercase tracking-tighter">
              THANKS FOR LISTENING WITH ECHOHUB
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={downloadImage}
        className="bg-white/10 hover:bg-[#1DB954] hover:text-black text-white px-8 py-3 rounded-full text-xs font-black transition-all cursor-pointer shadow-xl active:scale-95"
      >
        📥 GUARDAR COMO IMAGEN
      </button>
    </div>
  );
};

export default Ticket;