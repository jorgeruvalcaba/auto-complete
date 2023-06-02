export type Suggestion = {
  created: string
  episode: Array<string>
  gender: string
  id: number
  image: string
  location: { name: string; url: string }
  name: string
  origin: { name: string; url: string }
  species: string
  status: string
  type: string
  url: string
}

export type Data = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Suggestion[]
  error: string | null
  status: string
}
