import { MarqueeText } from "@/components/marquee-text";
import type { MappedFolder } from "@/types/mapped-folder";

interface FolderCardProps {
  folder: MappedFolder;
  onSelect?: (folder: MappedFolder) => void;
}

/**
 * Card estilizado em formato de pasta com aba recortada, título e caminho com deslize estilo marquee no hover.
 */
export function FolderCard({ folder, onSelect }: FolderCardProps) {
  const formattedTrackCount = String(folder.trackCount).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onSelect?.(folder)}
      className="group relative flex aspect-[1.12/1] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] border-[5px] border-[#1c1c1e] bg-zinc-950 text-left shadow-sm transition-transform duration-200 outline-none hover:-translate-y-0.5 focus-visible:border-primary"
    >
      {/* corpo - pasta com aba recortada */}
      <div className="relative z-10 flex h-[72%] w-full flex-col justify-between px-3.5 pt-3.5 pb-3">
        {/* silhueta - aba svg */}
        <svg
          aria-hidden="true"
          viewBox="0 0 320 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -inset-x-px -bottom-px top-0 h-[calc(100%+1px)] w-[calc(100%+2px)]"
        >
          <path
            d="M 0 18 Q 0 0 18 0 L 160 0 Q 174 0 183 11 L 199 31 Q 208 42 222 42 L 302 42 Q 320 42 320 60 L 320 220 L 0 220 Z"
            fill="#1c1c1e"
          />
        </svg>

        {/* cabecalho - titulo e subtitulo */}
        <div className="relative z-10 flex flex-col">
          <MarqueeText
            text={folder.name}
            containerClassName="w-[54%]"
            textClassName="text-sm font-semibold tracking-tight text-white"
          />
          <p className="truncate text-xs text-zinc-400">{folder.subtitle}</p>
        </div>

        {/* rodape - metricas e caminho */}
        <div className="relative z-10 flex items-baseline justify-between gap-2">
          <div className="flex shrink-0 items-baseline gap-1">
            <span className="text-xl font-semibold leading-none tracking-tight text-white">
              {formattedTrackCount}
            </span>
            <span className="text-[11px] font-medium text-zinc-400">
              Faixas
            </span>
          </div>

          <MarqueeText
            text={folder.topLabel}
            containerClassName="min-w-0 flex-1 text-right"
            textClassName="font-mono text-[10px] text-zinc-400"
          />
        </div>
      </div>
    </button>
  );
}
