import type { Show, SearchResult } from '../types/shows'

const BASE_URL = 'https://api.tvmaze.com'

export async function fetchAllShows(): Promise<Show[]> {
  const response = await fetch(`${BASE_URL}/shows`)

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchShowById(id: number): Promise<Show> {
  const response = await fetch(`${BASE_URL}/shows/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch show ${id}: ${response.statusText}`)
  }

  return response.json()
}

export async function searchShows(query: string): Promise<Show[]> {
  if (!query.trim()) {
    return []
  }

  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.statusText}`)
  }

  const results: SearchResult[] = await response.json()
  return results.map(result => result.show)
}
