/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  FlatList, Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {AnimeItemType} from "../type";
import {color, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {Text} from "../components/text/text";
import {Spinner} from "../components/spinner";
import {SearchSection} from "../components/search-section";
import {FilterSection} from "../components/filter-section";
import {CenterText} from "../components/center-text";
import {SearchIcon, StarIcon} from "../assets/svgs";
import {Spacer} from "../components/spacer";
import {AscDescSort} from "../components/asc-desc-sort";

import {AnimeContext} from "../hooks/AnimeContextProvider";

const FavoriteList = ({navigation}: any) => {
  const {
    favorites,
    error,
    favoriteToggle,
  } = useContext(AnimeContext)

  if (favorites.length === 0) {
    return (
      <CenterText text={"Tap star icon to add item to favorites!"}/>
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
          onPress={() => navigation.navigate('Detail', {
            id: item.id
          })}>
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
            <StarIcon fill={favorites.find((fav)=> fav.id === item.id) ? color.yellow500 : color.white} height={spacing[32]} width={spacing[32]}/>
          </TouchableOpacity>
        </VStack>
      </HStack>
    )
  }

  return (
    <View style={{flex: 1}}>
      {favorites ? (
        favorites.length !== 0 ? (
          <FlatList
            contentContainerStyle={{}}
            data={favorites}
            keyExtractor={(item) => String(item.id)}
            renderItem={(item) => <AnimeItem item={item.item} addToFavorites={favoriteToggle} favorites={favorites} /> }
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
export default FavoriteList;
