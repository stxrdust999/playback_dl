import logoSource from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

export type NavigationPage = "downloader" | "queue" | "history" | "settings";

interface NavigationItem {
  id: NavigationPage;
  label: string;
}

interface HeaderProps {
  activePage: NavigationPage;
  onSelectPage: (page: NavigationPage) => void;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "downloader", label: "Downloader" },
  { id: "queue", label: "Fila" },
  { id: "history", label: "Histórico" },
  { id: "settings", label: "Configurações" },
];

/**
 * Cabeçalho principal com marca e navegação entre as telas do aplicativo.
 */
export function Header({ activePage, onSelectPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      {/* marca - logo */}
      <div className="flex items-center gap-2.5">
        <img
          src={logoSource}
          alt="Playback DL"
          className="size-16 select-none dark:invert"
        />
        {/* <span className="text-sm font-semibold tracking-tight text-foreground">
          Playback DL
        </span> */}
      </div>

      {/* navegacao - menu */}
      <nav aria-label="Navegação principal" className="flex items-center gap-1">
        {NAVIGATION_ITEMS.map((navigationItem) => {
          const isActive = activePage === navigationItem.id;

          return (
            <button
              key={navigationItem.id}
              type="button"
              onClick={() => onSelectPage(navigationItem.id)}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
              )}
            >
              {navigationItem.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
