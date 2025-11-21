import { describe, it, expect } from 'vitest'
import {
  groupShowsByGenre,
  sortShowsByRating,
  filterShowsByGenre,
  getUniqueGenres,
  stripHtml,
} from './shows'
import type { Show } from '../types/shows'
import { mockShow } from '../mock/mockData'

/**
 * Helper factory to create a Show object with default valid data.
 * Allows overriding specific fields for testing purposes.
 */
function createMockShow(overrides: Partial<Show> = {}): Show {
  return {
    ...mockShow,
    ...overrides,
  }
}

describe('showHelpers', () => {
  // Fixture data
  const breakingBad = createMockShow({
    id: 1,
    name: 'Breaking Bad',
    genres: ['Drama', 'Crime', 'Thriller'],
    rating: { average: 9.5 },
  })

  const strangerThings = createMockShow({
    id: 2,
    name: 'Stranger Things',
    genres: ['Drama', 'Fantasy', 'Horror'],
    rating: { average: 8.7 },
  })

  const theOffice = createMockShow({
    id: 3,
    name: 'The Office',
    genres: ['Comedy'],
    rating: { average: 8.9 },
  })

  const badShow = createMockShow({
    id: 4,
    name: 'Bad Show',
    genres: ['Comedy'],
    rating: { average: 2.1 },
  })

  const unknownShow = createMockShow({
    id: 5,
    name: 'Unknown Show',
    genres: [], // No genres
    rating: { average: null }, // Null rating
  })

  const allShows = [breakingBad, strangerThings, theOffice, badShow, unknownShow]

  describe('groupShowsByGenre', () => {
    it('groups shows correctly by genre', () => {
      const result = groupShowsByGenre(allShows)

      // Expected genres: Drama, Crime, Thriller, Fantasy, Horror, Comedy
      expect(result).toHaveLength(6)

      const dramaGroup = result.find(g => g.genre === 'Drama')
      expect(dramaGroup).toBeDefined()
      expect(dramaGroup?.shows).toHaveLength(2) // Breaking Bad + Stranger Things
      expect(dramaGroup?.shows.map(s => s.name)).toContain('Breaking Bad')
      expect(dramaGroup?.shows.map(s => s.name)).toContain('Stranger Things')

      const comedyGroup = result.find(g => g.genre === 'Comedy')
      expect(comedyGroup).toBeDefined()
      expect(comedyGroup?.shows).toHaveLength(2) // The Office + Bad Show
    })

    it('sorts genre groups alphabetically', () => {
      const result = groupShowsByGenre(allShows)
      const genres = result.map(g => g.genre)

      expect(genres).toEqual(['Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller'])
    })

    it('sorts shows within groups by rating descending', () => {
      const result = groupShowsByGenre(allShows)
      const comedyGroup = result.find(g => g.genre === 'Comedy')

      expect(comedyGroup?.shows[0]?.name).toBe('The Office') // 8.9
      expect(comedyGroup?.shows[1]?.name).toBe('Bad Show') // 2.1
    })

    it('handles empty input', () => {
      const result = groupShowsByGenre([])
      expect(result).toEqual([])
    })

    it('ignores shows with no genres', () => {
      const result = groupShowsByGenre([unknownShow])
      expect(result).toEqual([])
    })
  })

  describe('sortShowsByRating', () => {
    it('sorts shows by rating in descending order', () => {
      const input = [badShow, breakingBad, theOffice]
      const sorted = sortShowsByRating(input)

      expect(sorted[0]?.name).toBe('Breaking Bad') // 9.5
      expect(sorted[1]?.name).toBe('The Office') // 8.9
      expect(sorted[2]?.name).toBe('Bad Show') // 2.1
    })

    it('handles null ratings by treating them as 0', () => {
      const input = [unknownShow, badShow]
      const sorted = sortShowsByRating(input)

      expect(sorted[0]?.name).toBe('Bad Show') // 2.1
      expect(sorted[1]?.name).toBe('Unknown Show') // null (treated as 0)
    })

    it('returns a new array (does not mutate original)', () => {
      const input = [badShow, breakingBad]
      const sorted = sortShowsByRating(input)

      expect(sorted).not.toBe(input)
      expect(input[0]).toBe(badShow) // Original order preserved
    })
  })

  describe('filterShowsByGenre', () => {
    it('returns shows that include the specific genre', () => {
      const result = filterShowsByGenre(allShows, 'Horror')
      expect(result).toHaveLength(1)
      expect(result[0]?.name).toBe('Stranger Things')
    })

    it('returns empty array if genre not found', () => {
      const result = filterShowsByGenre(allShows, 'Romance')
      expect(result).toHaveLength(0)
    })

    it('is case sensitive', () => {
      const result = filterShowsByGenre(allShows, 'drama') // Lowercase 'd'
      expect(result).toHaveLength(0)
    })
  })

  describe('getUniqueGenres', () => {
    it('extracts all unique genres from a list of shows', () => {
      const result = getUniqueGenres(allShows)
      expect(result).toEqual(['Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller'])
    })

    it('returns empty array for empty input', () => {
      expect(getUniqueGenres([])).toEqual([])
    })

    it('ignores duplicates', () => {
      // Both shows have 'Drama', should only appear once
      const shows = [breakingBad, strangerThings]
      const result = getUniqueGenres(shows)
      expect(result.filter(g => g === 'Drama')).toHaveLength(1)
    })
  })

  describe('stripHtml', () => {
    it('removes HTML tags from string', () => {
      const html = '<p>This is <b>bold</b> and <i>italic</i></p>'
      expect(stripHtml(html)).toBe('This is bold and italic')
    })

    it('handles null input', () => {
      expect(stripHtml(null)).toBe('')
    })

    it('handles empty string', () => {
      expect(stripHtml('')).toBe('')
    })

    it('handles strings with no HTML', () => {
      expect(stripHtml('Just plain text')).toBe('Just plain text')
    })

    it('handles complex attributes', () => {
      const html = '<a href="https://example.com" class="link">Link</a>'
      expect(stripHtml(html)).toBe('Link')
    })
  })
})
