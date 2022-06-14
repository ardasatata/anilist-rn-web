import React, {createContext} from "react";
import {AnimeItemType, AnimeSortType} from "../type";
import {GlobalAnimeContext} from "./GlobalAnimeContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_ANIME_LIST} from "../query";
import {isDesc, logger} from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DetailDataType} from "../type";

const log = logger().child({module: "AnimeList"})

const PER_PAGE = 10

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AnimeContext = createContext<GlobalAnimeContext>(null);

export const AppContextProvider:React.FC = ({children}) => {

  const [anime, setAnime] = useState<Array<AnimeItemType>>([]);
  const [search, setSearch] = useState<string>('your');
  const [page, setPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<AnimeSortType>(AnimeSortType.popularity)
  const [isSortDesc, setIsSortDesc] = useState<boolean>(true)

  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<Array<AnimeItemType>>([])

  const {loading, error, data} = useQuery(GET_ANIME_LIST, {
    variables: {
      page: 1,
      perPage: PER_PAGE * page,
      search: search,
      sort: isDesc(activeFilter, isSortDesc)
    },
    onCompleted: () => {
      getFavorites().then()
    }
  });

  const onLoadMore = useCallback(() => {
    !loading && setPage(page + 1)
    log.info(page)
  }, [page, loading])

  useEffect(() => {
    if (data) {
      setAnime(data.Page.media);
    }
    log.info(data)
  }, [data]);

  useEffect(() => {
    setPage(1)
  }, [search]);

  useEffect(() => {
    setPage(1)
  }, [activeFilter]);

  const favoriteToggle = useCallback(async (item: AnimeItemType | DetailDataType) => {
    setFavoriteLoading(true)
    try {
      // await AsyncStorage.setItem('@storage_Key', value)
      await AsyncStorage.getItem('favorite_list')
        .then((list) => {
          const l:Array<AnimeItemType> = list ? JSON.parse(list) : [];
          const isFavorited = l.find((i)=> i.id === item.id)
          // log.info(isFavorited)
          if(isFavorited){
            l.splice(l.findIndex((i)=> i.id === item.id), 1)
          }else{
            l.push(item as AnimeItemType);
          }
          AsyncStorage.setItem('favorite_list', JSON.stringify(l));
        });
    } catch (e) {
      log.error("store failed")
    } finally {
      setFavoriteLoading(false)
      getFavorites().then()
    }
  }, [])

  const getFavorites = useCallback(async () => {
    setFavoriteLoading(true)
    try {
      // await AsyncStorage.setItem('@storage_Key', value)
      await AsyncStorage.getItem('favorite_list')
        .then((list) => {
          const l = list ? JSON.parse(list) : [];
          setFavorites(l)
        });
    } catch (e) {
      log.error("store failed")
    } finally {
      setFavoriteLoading(false)
    }
  }, [favorites])

  const appContextValue = useMemo(
    () => ({
      loading,
      anime,
      error,
      activeFilter,
      setActiveFilter,
      onLoadMore,
      isSortDesc,
      setIsSortDesc,
      setSearch,
      favoriteToggle,
      favorites,
    }),
    [
      loading,
      anime,
      error,
      activeFilter,
      setActiveFilter,
      onLoadMore,
      isSortDesc,
      setIsSortDesc,
      setSearch,
      favoriteToggle,
      favorites,
    ]
  );

  return(
    <AnimeContext.Provider value={appContextValue} >
      {children}
    </AnimeContext.Provider>
  )
}