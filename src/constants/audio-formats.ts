export type AudioFormat = "mp3" | "wav" | "flac" | "m4a";

export interface AudioFormatOption {
  value: AudioFormat;
  label: string;
}

/**
 * Formatos de áudio suportados no MVP para extração via yt-dlp.
 */
export const AUDIO_FORMATS: AudioFormatOption[] = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "flac", label: "FLAC" },
  { value: "m4a", label: "M4A" },
];
