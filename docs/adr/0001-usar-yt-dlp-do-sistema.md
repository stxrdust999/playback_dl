---
status: accepted
date: 2026-11-20
decision-makers: Stardust
---

# ADR-0001: Usar `yt-dlp` do sistema via backend Rust no Tauri para downloads de áudio

## Context and Problem Statement

O **playback_dl** é um aplicativo desktop nativo (Tauri v2 + React 19 + TypeScript + Rust) voltado para músicos baixarem faixas de áudio do YouTube com praticidade, substituindo sites duvidosos e um script `.bat` antigo baseado em `yt-dlp`.

Para o MVP, é necessário definir como o aplicativo realizará a extração e conversão de áudio a partir de URLs do YouTube sem gerar alto custo de manutenção.

## Decision Drivers

- **Baixa manutenção:** o YouTube altera frequentemente ofuscação de assinaturas (`n-sig`, `player.js`), desafios anti-bot e *throttling*.
- **Simplicidade no MVP:** entregar o fluxo principal (baixar áudio em `MP3`, `WAV`, `FLAC` e `M4A`) rapidamente.
- **Experiência nativa:** progresso em tempo real na interface React, sem janelas de terminal abrindo na tela.
- **Evolução futura:** manter a camada de execução desacoplada para permitir migração futura para sidecar (`externalBin`) ou gerenciamento interno de binários.

## Considered Options

1. **Invocar `yt-dlp` (e `ffmpeg`) instalados no `PATH` do sistema via backend Rust**
2. **Empacotar `yt-dlp` e `ffmpeg` como sidecars (`externalBin` via `tauri-plugin-shell`)**
3. **Implementar um extrator próprio do YouTube em Rust ou TypeScript**

## Decision Outcome

**Opção escolhida:** **Opção 1 — Invocar `yt-dlp` (e `ffmpeg`) do sistema via backend Rust no Tauri.**

O backend Rust executará o binário `yt-dlp` presente no `PATH` do sistema operacional como processo filho, lendo `stdout`/`stderr` em streaming e emitindo eventos do Tauri para atualizar o progresso e status na interface React.

### Consequences

- **Positivas:**
  - Zero esforço de engenharia reversa contra mudanças do YouTube; basta atualizar o `yt-dlp` do sistema.
  - Suporte imediato aos formatos do MVP (`MP3`, `WAV`, `FLAC`, `M4A`) via `--extract-audio --audio-format`.
  - Build do aplicativo permanece leve e rápido.
- **Negativas / Trade-offs:**
  - O usuário precisa ter `yt-dlp` (e `ffmpeg` para conversões) disponíveis no `PATH` do sistema.
  - Será necessário implementar uma verificação de ambiente no backend para orientar o usuário caso algum binário esteja ausente.

### Non-Goals

- Empacotamento de binários sidecar (`externalBin`) ou auto-updater de `yt-dlp` no MVP.
- Suporte a playlists, corte de trechos ou edição de áudio nesta fase.

## Implementation Plan

- **Áreas afetadas:**
  - `src-tauri/src/` — comandos Tauri para checagem de binários (`yt-dlp`, `ffmpeg`) e execução do download em background com emissão de eventos de progresso.
  - `src/types/` — contratos TypeScript para parâmetros de download, formatos (`mp3 | wav | flac | m4a`) e payload de progresso.
  - `src/components/` e `src/App.tsx` — interface de entrada de URL, seleção de formato, escolha de pasta e feedback de progresso.
- **Padrão:**
  - Encapsular a invocação do processo `yt-dlp` em um módulo dedicado no backend Rust (ex.: `src-tauri/src/downloader.rs`), desacoplado dos handlers de comando, facilitando futura troca para sidecar.
  - Referenciar `ADR-0001` no ponto de entrada do módulo de download.

## Verification

- [ ] Backend detecta corretamente se `yt-dlp` e `ffmpeg` estão disponíveis no `PATH`.
- [ ] Download de áudio a partir de uma URL válida do YouTube funciona nos formatos `MP3`, `WAV`, `FLAC` e `M4A`.
- [ ] Eventos de progresso são emitidos pelo Rust e refletidos em tempo real na interface React.
- [ ] Falhas (URL inválida, binário ausente, erro de rede) retornam mensagens legíveis na interface.
