import type { MappedFolder } from "@/types/mapped-folder";

/**
 * Pastas placeholder exibidas até a integração com o mapeamento real no backend.
 */
export const MAPPED_FOLDERS_PLACEHOLDER: MappedFolder[] = [
  {
    id: "guitar-studies",
    name: "Guitarra",
    subtitle: "Solos & Riffs",
    topLabel: "C:\\Músicas\\Guitarra",
    trackCount: 5,
    secondaryLabel: "MP3 • WAV",
    coverGradient:
      "radial-gradient(circle at 20% 25%, #ff8a3d 0%, #c82400 45%, #1c0805 100%)",
  },
  {
    id: "bass-grooves",
    name: "Baixo",
    subtitle: "Grooves & Slap",
    topLabel: "C:\\Músicas\\Baixo",
    trackCount: 12,
    secondaryLabel: "FLAC • WAV",
    coverGradient:
      "radial-gradient(circle at 25% 20%, #ade74e 0%, #2f7a1f 50%, #0d1f0a 100%)",
  },
  {
    id: "backing-tracks",
    name: "Backing Tracks",
    subtitle: "Jam & Improviso",
    topLabel: "C:\\Músicas\\Backing",
    trackCount: 24,
    secondaryLabel: "MP3 • M4A",
    coverGradient:
      "radial-gradient(circle at 30% 20%, #60a5fa 0%, #1d4ed8 48%, #09132e 100%)",
  },
  {
    id: "band-setlist",
    name: "Repertório Banda",
    subtitle: "Ensaios & Shows",
    topLabel: "C:\\Músicas\\Banda",
    trackCount: 8,
    secondaryLabel: "WAV • 48kHz",
    coverGradient:
      "radial-gradient(circle at 25% 20%, #e879f9 0%, #7e22ce 48%, #1a0729 100%)",
  },
];
