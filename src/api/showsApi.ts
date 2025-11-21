import type { Show, SearchResult } from '../types/showsTypes'

const BASE_URL = 'https://api.tvmaze.com'

export class ApiError extends Error {
  statusCode: number
  statusText: string

  constructor(message: string, statusCode: number, statusText: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.statusText = statusText
  }
}

export async function fetchAllShows(): Promise<Show[]> {
  const response = await fetch(`${BASE_URL}/shows`)

  if (!response.ok) {
    throw new ApiError('Failed to fetch shows', response.status, response.statusText)
  }

  return response.json()
}

export async function fetchShowById(id: number): Promise<Show> {
  const response = await fetch(`${BASE_URL}/shows/${id}`)

  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? `Show with ID ${id} not found` : `Failed to fetch show`,
      response.status,
      response.statusText
    )
  }

  return response.json()
}

export async function searchShows(query: string): Promise<Show[]> {
  if (!query.trim()) {
    return []
  }

  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new ApiError('Failed to search shows', response.status, response.statusText)
  }

  const results: SearchResult[] = await response.json()
  return results.map(result => result.show)
}
