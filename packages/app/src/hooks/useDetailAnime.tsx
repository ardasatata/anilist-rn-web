import {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_ANIME_DETAIL} from "../query";
import {logger} from "../utils";
import {DetailDataType} from "../type";
import {ApolloError} from "@apollo/client";

const log = logger().child({module: "useChatApp"})

export type AnimeDetailHook = {
  detail: DetailDataType | null
  loading: boolean
  error: ApolloError | undefined
}

export default function useDetailAnime(id: number): AnimeDetailHook {

  const [detail, setDetail] = useState<DetailDataType|null>(null);
  const [ loadDetail, {loading, error, data}] = useLazyQuery(GET_ANIME_DETAIL);

  useEffect(()=> {
    loadDetail({variables:{
        id
      }}).then()
  },[id])

  useEffect(() => {
    if (data) {
      setDetail(data.Media);
    }
    log.info(data)
  }, [data]);

  return {
    detail,
    loading,
    error
  }
}