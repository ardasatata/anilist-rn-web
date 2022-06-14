import {AnimeItemType, AnimeSortType} from "../type";
import {ApolloError} from "@apollo/client";
import {DetailDataType} from "../type";

export type GlobalAnimeContext = {
  loading: boolean
  anime: Array<AnimeItemType>
  error: ApolloError | undefined
  activeFilter: AnimeSortType
  setActiveFilter(filter: AnimeSortType): void
  onLoadMore(): void
  isSortDesc: boolean
  setIsSortDesc(item: boolean): void
  setSearch(item: string): void
  favoriteToggle(item: AnimeItemType | DetailDataType): void
  favorites: Array<AnimeItemType>
}