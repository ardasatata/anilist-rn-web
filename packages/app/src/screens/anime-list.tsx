/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {
  ImageBackground,
  View,
  ScrollView,
  Text, StyleSheet, FlatList, ActivityIndicator, TextInput
} from 'react-native';
import {GET_ANIME_LIST} from "../query";
import {isDesc, logger} from "../utils"
import {AnimeSortType} from "../query/type";
import {layout, spacing, color, roundness} from "../styles";
import {VStack} from "../components/view-stack";

const log = logger().child({module: "AnimeList"})

const Spinner = () => (<View style={[layout.flex, layout.heightFull, layout.flexRowCenter, layout.flexCenterMid]}><ActivityIndicator size={spacing[64]}/></View>)

const SearchSection = () => {
  return(
    <VStack horizontal={spacing.medium} vertical={spacing.medium} style={[]}>
      <VStack style={{backgroundColor: color.offWhite, borderRadius: roundness.medium}}>
        <TextInput style={{height: spacing.extraLarge2, fontSize: spacing[16]}}/>
      </VStack>
    </VStack>
  )
}

const AnimeList = ({navigation}: any) => {

  const [anime, setAnime] = useState<Array<any>>();
  const [search, setSearch] = useState('your');
  const [load, setLoad] = useState(false);

  const {loading, error, data, fetchMore} = useQuery(GET_ANIME_LIST, {
    variables: {
      page: 1,
      perPage: 10,
      search: search,
      sort: isDesc(AnimeSortType.popularity, true)
    }
  });
  // const styles = useStyleSheet(themedStyles);
  const styles = themedStyles;

  useEffect(() => {
    if (data) {
      setAnime(data.Page.media);
    }
    log.info(data)
  }, [data]);

  if (loading && anime === undefined) {
    return (
      <Spinner/>
    );
  }
  if (error) {
    return (
      <View style={styles.loadContainer}>
        <Text>Something Wrong :(</Text>
      </View>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <View style={{flex: 1}}>
      {/*<Loading load={load}/>*/}
      <SearchSection />
      <View style={{height: 30, margin: 2}}/>
      <ScrollView>
        <View style={{flex: 1, margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {anime ? (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              anime.length !== 0 ? (
                <FlatList
                  contentContainerStyle={{}}
                  // data={[...characters]}
                  data={anime}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({item}) => (
                    <View style={{
                      alignItems: "center",
                      flexDirection: "row",
                      padding: 10,
                    }}>
                      <ImageBackground source={{uri: item.coverImage.large}} style={{
                        borderRadius: 35,
                        height: 65,
                        width: 65,
                      }}/>
                      <Text style={{
                        marginLeft: 10,
                      }}>
                        {item.title.romaji}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <Text>No Such That !</Text>
              )
            ) : (
              <View style={styles.loadContainer}>
                {/*<Spinner/>*/}
              </View>
            )}
          </View>
        </View>
        <View style={{height: 30}}/>
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection: '',
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AnimeList;
