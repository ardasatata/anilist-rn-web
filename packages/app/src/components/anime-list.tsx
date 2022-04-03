/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  Text, StyleSheet, FlatList
} from 'react-native';
import {GET_ANIME_LIST} from "../../query";
import {isDesc, logger} from "../../utils"
import {AnimeSortType} from "../../query/type";

const log = logger().child({module: "AnimeList"})

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

  //
  // if (loading) {
  //   return (
  //     <View style={styles.loadContainer}>
  //       {/*<Spinner/>*/}
  //     </View>
  //   );
  // }
  // if (error) {
  //   return (
  //     <View style={styles.loadContainer}>
  //       <Text>Couldnt Load Data :(</Text>
  //     </View>
  //   );
  // }

  const renderItemHeader = (item: any) => (
    <ImageBackground style={styles.itemHeader} source={{uri: item}}/>
  );

  // const renderItemFooter = (item) => (
  //   <View style={styles.itemFooter}>
  //     <Text category="s1" style={{padding: 5, textAlign: 'center'}}>
  //       Polularity: {item.popularity}
  //     </Text>
  //   </View>
  // );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const renderProductItem = ({item}) => (
    // <Card
    //   key={item.id}
    //   style={styles.productItem}
    //   header={() => renderItemHeader(item.coverImage.large)}
    //   // footer={() => renderItemFooter(item)}
    //   onPress={() => {
    //     navigation.navigate('Characters & Informations', {
    //       data: item,
    //     });
    //   }}>
    //   <Text category="s1">{item.title.userPreferred}</Text>
    //   <Text appearance="hint" category="c1">
    //     {item.type}
    //   </Text>
    // </Card>
    <Text>
      {item.title.userPreferred}
    </Text>
  );


  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <View style={{flex: 1}}>
      {/*<Loading load={load}/>*/}
      <View style={{flex: 1, margin: 10}}>
        {/*<Input*/}
        {/*  placeholder="Search By Name"*/}
        {/*  value={search}*/}
        {/*  onChangeText={(nextValue) => setSearch(nextValue)}*/}
        {/*  // style={{position: 'absolute', top: 0, left: 0}}*/}
        {/*/>*/}
      </View>
      {/*<View style={{height: 30, margin: 2}}/>*/}
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
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'black',
  },
  itemHeader: {
    height: 140,
    // width: Dimensions.get('window').width / 2 - 24,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AnimeList;
