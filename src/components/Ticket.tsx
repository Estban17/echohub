import React from 'react'

// Definimos la interfaz para que TypeScript sepa qué tiene una canción
interface Track {
  id: string;
  name: string;
  artist: string;
  popularity: number;
}

const Ticket = ({ tracks }: { tracks: Track[] }) => {
  return (
    <div className="bg-white text-black p-6 rounded-sm shadow-2xl font-mono max-w-sm mx-auto border-t-8 border-dashed border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-4 uppercase tracking-tighter">EchoHub Receipt</h2>
      <p className="text-xs text-center mb-6 border-b pb-2 uppercase">{new Date().toLocaleDateString()} — Order #0001</p>
      
      <div className="space-y-4">
        {tracks.map((track, index) => (
          <div key={track.id} className="flex justify-between items-center text-sm">
            <span className="truncate mr-2 text-left w-full uppercase">
               {index + 1}. {track.name} - {track.artist}
            </span>
            <span className="font-bold shrink-0">{track.popularity}%</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t-2 border-dashed">
        <div className="flex justify-between font-bold text-lg">
          <span>TOTAL GENRES:</span>
          <span>4</span>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col items-center">
         {/* Código de barras simulado con rectángulos de Tailwind */}
         <div className="flex w-full h-12 bg-black"></div>
         <p className="text-[10px] mt-2 tracking-[0.5em]">000100010001</p>
      </div>
      <p className="text-[10px] text-center mt-4 uppercase">Thanks for listening with EchoHub</p>
    </div>
  )
}

export default Ticket