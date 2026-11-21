# playback_dl

Aplicativo desktop nativo para baixar faixas de áudio do YouTube com praticidade, pensado para músicos que precisam baixar músicas e *backing tracks* para estudar e tirar de ouvido sem depender de sites duvidosos ou scripts manuais.

## Stack

- **Desktop / Backend:** [Tauri v2](https://v2.tauri.app/) (Rust)
- **Frontend:** React 19 + TypeScript + Vite
- **Estilização / UI:** Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/)
- **Motor de download:** `yt-dlp` + `ffmpeg` (invocados do sistema — veja [ADR-0001](docs/adr/0001-usar-yt-dlp-do-sistema.md))

## Formatos suportados (MVP)

- `MP3`
- `WAV`
- `FLAC`
- `M4A`

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS)
- [Rust](https://www.rust-lang.org/) e dependências do [Tauri v2](https://v2.tauri.app/start/prerequisites/)
- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) disponível no `PATH` do sistema
- [`ffmpeg`](https://ffmpeg.org/) disponível no `PATH` do sistema (necessário para extração/conversão de áudio)

## Como rodar

```bash
# Instalar dependências do frontend
npm install

# Rodar o aplicativo em modo de desenvolvimento
npm run tauri dev

# Gerar build de produção
npm run tauri build
```

## Documentação e decisões

- Decisões arquiteturais registradas em [docs/adr/](docs/adr/README.md).
