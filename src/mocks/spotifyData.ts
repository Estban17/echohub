export const mockTopTracks = [
  {
    id: '1',
    name: "Blinding Lights",
    artist: "The Weeknd",
    albumImg: "https://vignette.wikia.nocookie.net/afterhours/images/d/d1/After_Hours_Album_Cover.jpg",
    popularity: 98
  },
  {
    id: '2',
    name: "Starboy",
    artist: "The Weeknd",
    albumImg: "https://m.media-amazon.com/images/I/81S6G7R5p+L._SL1425_.jpg",
    popularity: 95
  }
];

export const mockUserProfile = {
  name: "Usuario Demo",
  topGenres: ["Art Pop", "Indie Rock", "Synthwave"],
  stats: {
    energy: 0.75, // 0 a 1
    valence: 0.45, // Emoción (0 triste, 1 feliz)
    tempo: 124,    // BPM promedio
  }
};

export const mockCountries = [
  { id: 'JP', name: 'Japón', genre: 'J-Pop', song: 'Stay with Me' },
  { id: 'BR', name: 'Brasil', genre: 'Bossa Nova', song: 'Garota de Ipanema' }
];