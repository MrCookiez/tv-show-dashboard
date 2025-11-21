/**
 * TV Show schemas and types using Zod
 * Provides both runtime validation and TypeScript types
 * API Documentation: https://www.tvmaze.com/api
 */
import { z } from 'zod'

export const ScheduleSchema = z.object({
  time: z.string(),
  days: z.array(z.string()),
})

export const RatingSchema = z.object({
  average: z.number().nullable(),
})

export const CountrySchema = z.object({
  name: z.string(),
  code: z.string(),
  timezone: z.string(),
})

export const NetworkSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: CountrySchema,
  officialSite: z.string().nullable(),
})

export const WebChannelSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: CountrySchema.nullable(),
  officialSite: z.string().nullable(),
})

export const ExternalsSchema = z.object({
  tvrage: z.number().nullable(),
  thetvdb: z.number().nullable(),
  imdb: z.string().nullable(),
})

export const ImageSchema = z.object({
  medium: z.string(),
  original: z.string(),
})

export const LinksSchema = z.object({
  self: z.object({
    href: z.string(),
  }),
  previousepisode: z
    .object({
      href: z.string(),
    })
    .optional(),
})

export const ShowSchema = z.object({
  id: z.number(),
  url: z.string(),
  name: z.string(),
  type: z.string(),
  language: z.string(),
  genres: z.array(z.string()),
  status: z.string(),
  runtime: z.number().nullable(),
  averageRuntime: z.number().nullable(),
  premiered: z.string().nullable(),
  ended: z.string().nullable(),
  officialSite: z.string().nullable(),
  schedule: ScheduleSchema,
  rating: RatingSchema,
  weight: z.number(),
  network: NetworkSchema.nullable(),
  webChannel: WebChannelSchema.nullable(),
  externals: ExternalsSchema,
  image: ImageSchema.nullable(),
  summary: z.string().nullable(),
  updated: z.number(),
  _links: LinksSchema,
})

export const SearchResultSchema = z.object({
  score: z.number(),
  show: ShowSchema,
})

// Infer TypeScript types from Zod schemas
export type Show = z.infer<typeof ShowSchema>
export type SearchResult = z.infer<typeof SearchResultSchema>
export type Rating = z.infer<typeof RatingSchema>
export type Image = z.infer<typeof ImageSchema>
export type Schedule = z.infer<typeof ScheduleSchema>
export type Network = z.infer<typeof NetworkSchema>
export type WebChannel = z.infer<typeof WebChannelSchema>
export type Country = z.infer<typeof CountrySchema>
export type Externals = z.infer<typeof ExternalsSchema>
export type Links = z.infer<typeof LinksSchema>

export interface GenreGroup {
  genre: string
  shows: Show[]
}
