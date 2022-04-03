/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {
  ActivityIndicator,
  FlatList, Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {GET_ANIME_LIST} from "../query";
import {isDesc, logger} from "../utils"
import {AnimeSortType} from "../query/type";
import {color, layout, roundness, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {SearchIcon} from "../assets/svgs";
import {Spacer} from "../components/spacer";
import {Text} from "../components/text/text";

const log = logger().child({module: "AnimeList"})

const Spinner = () => (
  <View style={[layout.flex, layout.heightFull, layout.flexRowCenter, layout.flexCenterMid]}>
    <ActivityIndicator size={spacing[64]}/>
  </View>
)

type SearchSectionProps = {
  onChangeText(value: string): void,
  icon?: React.ReactNode,
  placeholder?: string
}

const SearchSection = ({
                         onChangeText = () => null,
                         icon = <SearchIcon fill={color.dark900} height={spacing[20]} width={spacing[20]}/>,
                         placeholder = "Search..."
                       }: SearchSectionProps) => {
  return (
    <VStack horizontal={spacing.medium} vertical={spacing.medium} style={[]}>
      <HStack style={{backgroundColor: color.offWhite, borderRadius: roundness.medium}} horizontal={spacing.medium}>
        {icon}
        <Spacer width={spacing.medium}/>
        <TextInput
          onChangeText={onChangeText} placeholder={placeholder}
          style={{height: spacing.extraLarge2, fontSize: spacing[16]}}/>
      </HStack>
    </VStack>
  )
}

type FilterSectionProps = {
  activeFilter: AnimeSortType,
  onFilterPress(value: AnimeSortType): void
}

const FilterSection = ({
                         activeFilter = AnimeSortType.popularity,
                         onFilterPress = () => null
                       }: FilterSectionProps) => {

  const FILTER = (Object.keys(AnimeSortType) as Array<keyof typeof AnimeSortType>).map((key) => key)

  const styles = StyleSheet.create({
    container: {
      minHeight: spacing.extraLarge3,
      marginBottom: spacing.medium
    },
    base: {
      backgroundColor: color.offWhite,
      borderRadius: roundness.circle
    },
    isActive: {
      backgroundColor: color.dark500
    }
  })

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <Spacer width={spacing.medium}/>
      {
        FILTER.map((item) => (
          <>
            <TouchableOpacity onPress={() => onFilterPress(AnimeSortType[item])}>
              <VStack horizontal={spacing.medium} vertical={spacing.medium}
                      style={[styles.base, activeFilter === AnimeSortType[item] ? styles.isActive : null]}>
                <Text>{AnimeSortType[item]}</Text>
              </VStack>
            </TouchableOpacity>
            <Spacer width={spacing.small}/>
          </>
        ))
      }
    </ScrollView>
  )
}

const CenterText = ({text}: { text: string }) => {
  return (
    <View style={[layout.flex, layout.heightFull, layout.flexRowCenter, layout.flexCenterMid]}>
      <Text>{text}</Text>
    </View>
  )
}

const PER_PAGE = 10

const AnimeList = ({navigation}: any) => {

  const [anime, setAnime] = useState<Array<any>>();
  const [search, setSearch] = useState<string>('your');
  const [page, setPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<AnimeSortType>(AnimeSortType.popularity)

  const {loading, error, data} = useQuery(GET_ANIME_LIST, {
    variables: {
      page: 1,
      perPage: PER_PAGE * page,
      search: search,
      sort: isDesc(activeFilter, true)
    }
  });

  const onLoadMore = useCallback(() => {
    !loading && setPage(page + 1)
    log.info(page)
  }, [page, loading])

  const styles = themedStyles;

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

  if (loading && anime === undefined) {
    return (
      <Spinner/>
    );
  }

  if (error) {
    return (
      <CenterText text={"Something wrong :("}/>
    );
  }

  return (
    <View style={{flex: 1}}>
      <SearchSection onChangeText={(value => setSearch(value))}/>
      <FilterSection activeFilter={activeFilter} onFilterPress={setActiveFilter}/>
      {anime ? (
        anime.length !== 0 ? (
          <FlatList
            onEndReached={onLoadMore}
            contentContainerStyle={{}}
            data={anime}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <TouchableOpacity onPress={()=> navigation.navigate('Characters & Informations')}>
                <HStack left={spacing.medium} vertical={spacing.small}>
                  <Image source={{uri: item.coverImage.large}} style={{
                    height: spacing[72],
                    width: spacing[72],
                  }}/>
                  <VStack left={spacing.medium}>
                    <Text numberOfLines={1} type={'body'}>{item.title.romaji}</Text>
                    <Text>{item.title.native}</Text>
                    <HStack top={spacing.tiny}>
                      <Text style={{fontWeight: 'bold'}}>{item.type}</Text>
                      <Text>{` #${item.popularity}`}</Text>
                    </HStack>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <>
                {loading ? <Spinner/> : null}
              </>
            )}
          />
        ) : (
          <CenterText text={"No Data Found :("}/>
        )
      ) : (
        <View style={styles.loadContainer}>
          <Spinner/>
        </View>
      )}
    </View>
  );
};

const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AnimeList;
