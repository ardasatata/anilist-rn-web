/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {color, spacing} from "@anilist-fe/app/src/styles";
import {HStack, VStack} from "@anilist-fe/app/src/components/view-stack";
import {Text} from "@anilist-fe/app/src/components/text/text";
import {Spinner} from "@anilist-fe/app/src/components/spinner";
import {CenterText} from "@anilist-fe/app/src/components/center-text";
import {Spacer} from "@anilist-fe/app/src/components/spacer";
import {SearchSection} from "@anilist-fe/app/src/components/search-section";

import { ReactComponent as SearchIcon } from '@anilist-fe/app/src/assets/svgs/searchIcon.svg';
import {FilterSection} from "@anilist-fe/app/src/components/filter-section";
import {AscDescSort} from "../components/asc-desc-sort";
import {AnimeContext} from "@anilist-fe/app/src/hooks/AnimeContextProvider";
import {AnimeItemType} from "@anilist-fe/app/src/type";
import {ReactComponent as StarIcon} from "@anilist-fe/app/src/assets/svgs/starIcon.svg";

import useDetailAnime from "@anilist-fe/app/src/hooks/useDetailAnime";
import {DetailModal} from "../components/detail-modal";


const AnimeList = ({navigation}: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnime, setSelected] = useState<number>(1);

  const { detail } = useDetailAnime(selectedAnime)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const {
    anime,
    favorites,
    error,
    isSortDesc,
    favoriteToggle,
    onLoadMore,
    loading,
    setActiveFilter,activeFilter,
    setIsSortDesc,
    setSearch,
  } = useContext(AnimeContext)

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

  const AnimeItem = ({item, addToFavorites, favorites}:{item: AnimeItemType; addToFavorites(item: AnimeItemType): void; favorites: Array<AnimeItemType> }) => {
    return(
      <HStack>
        <TouchableOpacity
          style={{flex: 3}}
          // eslint-disable-next-line react/prop-types
          onPress={() => {
            setSelected(item.id)
            showModal()
          }}>
          <HStack left={spacing.medium} vertical={spacing.small}>
            <Image source={{uri: item.coverImage.large}} style={{
              height: spacing[72],
              width: spacing[72],
            }}/>
            <VStack left={spacing.medium}>
              <Text numberOfLines={1} type={'body'} style={{color: color.dark900, maxWidth: spacing["128"] + spacing.extraLarge3}}>{item.title.romaji}</Text>
              <Text style={{color: color.primary900, fontSize: spacing[12]}}>{item.title.native}</Text>
              <HStack top={spacing.tiny}>
                <Text style={{fontWeight: 'bold', fontSize: spacing[12]}}>{item.type}</Text>
                <Spacer width={spacing.medium}/>
                {/*<ThumbsUp fill={color.dark800} height={spacing[16]} width={spacing[16]} />*/}
              </HStack>
              <HStack>
                {item.tags.map((tag, index)=>{
                  if (index > 1) return null
                  return(
                    <Text key={`${tag.id}-${item.id}`} style={{fontSize: spacing[12]}}>{`${tag.name}, `}</Text>
                  )
                })}
              </HStack>
            </VStack>
          </HStack>
        </TouchableOpacity>
        <VStack style={{flex:1, alignItems: 'flex-end'}} right={spacing.large}>
          <TouchableOpacity onPress={()=> addToFavorites(item)}>
            <StarIcon fill={favorites.find((fav)=> fav.id === item.id) ? color.yellow500 : color.primary300} height={spacing[32]} width={spacing[32]}/>
          </TouchableOpacity>
        </VStack>
      </HStack>
    )
  }

  return (
    <View style={{flex: 1}}>
      <SearchSection icon={<SearchIcon fill={color.dark900} height={spacing[12]} width={spacing[12]}/>} onChangeText={(value => setSearch(value))}/>
      <FilterSection activeFilter={activeFilter} onFilterPress={setActiveFilter}/>
      {anime ? (
        anime.length !== 0 ? (
          <FlatList
            onEndReached={onLoadMore}
            contentContainerStyle={{}}
            data={anime}
            keyExtractor={(item) => String(item.id)}
            renderItem={(item) => <AnimeItem item={item.item} addToFavorites={favoriteToggle} favorites={favorites} /> }
            ListHeaderComponent={()=> (
              <HStack horizontal={spacing.medium} bottom={spacing.small}>
                <AscDescSort isDesc={isSortDesc} onTogglePress={setIsSortDesc} />
              </HStack>
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
      <DetailModal detail={detail} favorites={favorites} favoriteToggle={favoriteToggle} isModalVisible={isModalVisible} handleOk={handleOk} />
    </View>
  );
};

const styles = StyleSheet.create({
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
