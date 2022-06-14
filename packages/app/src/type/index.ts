export enum AnimeSortType {
  popularity = "POPULARITY",
  status = "STATUS",
  trending = "TRENDING",
  score = "SCORE",
  duration = "DURATION"
}

export type AnimeTagItemType = {
  id: number,
  name: string
}

export type AnimeItemType = {
  coverImage: {
    large: string
    color: string
  },
  title: {
    romaji: string
    english: string
    native: string
    userPreferred: string
  },
  type: string
  popularity: number,
  averageScore: number,
  id: number,
  tags: Array<AnimeTagItemType>
}

export type DetailDataType = {
  id: number
  title: {
    romaji: string
    english: string
    native: string
    userPreferred: string
  }
  description: string
  type: string
  bannerImage: string
  coverImage: {
    extraLarge: string
    large: string
    medium: string
    color: string
  }
  popularity: any
  tags: Array<{id: number, name: string}>
}