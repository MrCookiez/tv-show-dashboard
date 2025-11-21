import type { Show, GenreGroup } from '../types/shows'

export function groupShowsByGenre(shows: Show[]): GenreGroup[] {
  const genreMap = new Map<string, Show[]>()

  shows.forEach(show => {
    if (show.genres && show.genres.length > 0) {
      show.genres.forEach(genre => {
        if (!genreMap.has(genre)) {
          genreMap.set(genre, [])
        }
        genreMap.get(genre)!.push(show)
      })
    }
  })

  const genreGroups: GenreGroup[] = Array.from(genreMap.entries()).map(([genre, shows]) => ({
    genre,
    shows: sortShowsByRating(shows),
  }))

  return genreGroups.sort((a, b) => a.genre.localeCompare(b.genre))
}

export function sortShowsByRating(shows: Show[]): Show[] {
  return [...shows].sort((a, b) => {
    const ratingA = a.rating?.average ?? 0
    const ratingB = b.rating?.average ?? 0
    return ratingB - ratingA
  })
}

export function filterShowsByGenre(shows: Show[], genre: string): Show[] {
  return shows.filter(show => show.genres?.includes(genre))
}

export function getUniqueGenres(shows: Show[]): string[] {
  const genres = new Set<string>()

  shows.forEach(show => {
    show.genres?.forEach(genre => genres.add(genre))
  })

  return Array.from(genres).sort()
}

export function stripHtml(html: string | null): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}
