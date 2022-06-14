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