# CineSave

A movie search app built with React, TypeScript, Vite, Tailwind CSS, and `shadcn`.

It lets users:
- search movies by title
- filter results by type
- open detailed movie info in a side sheet
- save movies to a local watchlist
- browse saved movies later

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- `shadcn` / Radix-based UI
- Zustand for watchlist state
- Sonner for toast notifications
- OMDb API for movie data

## Features

- title search with OMDb
- type filter: `all`, `movie`, `series`, `episode`
- popular picks shown when no search is entered
- movie detail sheet
- watchlist sheet
- watchlist persisted in local storage
- add/remove watchlist with toast feedback

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```bash
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

Start the dev server:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Project Structure

```text
src/
  assets/
  components/
    atoms/
    molecules/
    organisms/
  lib/
  pages/
  routes/
  services/
  store/
  types/
```
## Environment

Required:

```bash
VITE_OMDB_API_KEY
```

Without this key, movie search and detail requests will fail.


