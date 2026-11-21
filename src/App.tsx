import {
  AudioLinesIcon,
  FileAudioIcon,
  FolderIcon,
  FolderPlusIcon,
} from "lucide-react";
import { useState } from "react";
import { FolderCard } from "@/components/folder-card";
import { Header, type NavigationPage } from "@/components/header";
import { MarqueeText } from "@/components/marquee-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUDIO_FORMATS, type AudioFormat } from "@/constants/audio-formats";
import { MAPPED_FOLDERS_PLACEHOLDER } from "@/mocks/mapped-folders";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const PLACEHOLDER_TITLES: Record<
  Exclude<NavigationPage, "downloader">,
  string
> = {
  queue: "Fila de downloads",
  history: "Histórico",
  settings: "Configurações",
};

/**
 * Shell principal do aplicativo com navegação no topo e conteúdo da tela ativa.
 */
function App() {
  const [activePage, setActivePage] = useState<NavigationPage>("downloader");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedAudioFormat, setSelectedAudioFormat] =
    useState<AudioFormat | null>(null);

  const selectedFolder = MAPPED_FOLDERS_PLACEHOLDER.find(
    (mappedFolder) => mappedFolder.id === selectedFolderId,
  );
  const selectedFormatOption = AUDIO_FORMATS.find(
    (audioFormat) => audioFormat.value === selectedAudioFormat,
  );

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      {/* cabecalho - navegacao */}
      <Header activePage={activePage} onSelectPage={setActivePage} />

      {/* conteudo - principal */}
      <main className="flex-1 p-6">
        {activePage === "downloader" ? (
          <div className="flex flex-col gap-6">
            {/* hero - apresentacao */}
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-foreground font-semibold text-3xl">
                Playback DL
              </h1>

              <p className="text-muted-foreground font-light text-md">
                Cole o link, escolha o formato e mande direto pra sua pasta.
              </p>
            </div>

            {/* formulario - extracao */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-muted-foreground text-xs">
                Digite uma URL do YouTube válida
              </p>

              <div className="flex flex-row gap-2">
                <Input
                  placeholder="example.com/example"
                  className="h-10 rounded-sm border-black px-3.5 text-base md:text-base"
                />
                <Button className="h-10 px-4 text-base gap-2 flex flex-row items-center">
                  <span>Extrair áudio</span>
                  <AudioLinesIcon />
                </Button>
              </div>

              <div className="flex flex-row gap-1 items-center">
                {/* select - pasta/tipo de música */}
                <Select
                  value={selectedFolderId}
                  onValueChange={(value) => setSelectedFolderId(value)}
                >
                  <SelectTrigger className="my-1 border-none">
                    <SelectValue>
                      <div className="flex flex-row gap-1.5 items-center">
                        <FolderIcon
                          size={16}
                          className={
                            selectedFolder
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                        <span
                          className={
                            selectedFolder
                              ? "text-foreground text-sm"
                              : "text-muted-foreground text-sm"
                          }
                        >
                          {selectedFolder ? selectedFolder.name : "Pasta"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {MAPPED_FOLDERS_PLACEHOLDER.map((mappedFolder) => (
                        <SelectItem
                          key={mappedFolder.id}
                          value={mappedFolder.id}
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <FolderIcon
                              size={16}
                              className="shrink-0 text-muted-foreground"
                            />

                            <MarqueeText
                              text={mappedFolder.name}
                              containerClassName="max-w-44"
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* select - tipo de arquivo */}
                <Select
                  value={selectedAudioFormat}
                  onValueChange={(value) =>
                    setSelectedAudioFormat(value as AudioFormat | null)
                  }
                >
                  <SelectTrigger className="my-1 border-none">
                    <SelectValue>
                      <div className="flex flex-row gap-1.5 items-center">
                        <FileAudioIcon
                          size={16}
                          className={
                            selectedFormatOption
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                        <span
                          className={
                            selectedFormatOption
                              ? "text-foreground text-sm"
                              : "text-muted-foreground text-sm"
                          }
                        >
                          {selectedFormatOption
                            ? selectedFormatOption.label
                            : "Formato"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {AUDIO_FORMATS.map((audioFormat) => (
                        <SelectItem
                          key={audioFormat.value}
                          value={audioFormat.value}
                        >
                          <div className="flex flex-row gap-2 items-center">
                            <FileAudioIcon
                              size={16}
                              className="text-muted-foreground"
                            />

                            <span>{audioFormat.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* section - pastas/mapeamento */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Pastas Mapeadas</span>

                <Button variant="outline" size="sm" className="gap-1.5">
                  <FolderPlusIcon className="size-4" />
                  <span>Adicionar pasta</span>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {MAPPED_FOLDERS_PLACEHOLDER.map((mappedFolder) => (
                  <FolderCard
                    key={mappedFolder.id}
                    folder={mappedFolder}
                    onSelect={(folder) => setSelectedFolderId(folder.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {PLACEHOLDER_TITLES[activePage]} — em breve
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
