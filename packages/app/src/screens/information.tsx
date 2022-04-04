/* eslint-disable */
/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  Button, StyleSheet
} from 'react-native';
import {Text} from "../components/text/text";
import {VStack} from "../components/view-stack";
import {Spacer} from "../components/spacer";
import {spacing} from "../styles";

// import {
//   Text,
//   List,
//   Card,
//   StyleService,
//   useStyleSheet,
//   Input,
//   Icon,
//   Button,
// } from '@ui-kitten/components';
// import Loading from './ActivityIndicator';

const Information = ({route, navigation}) => {
  // const styles = useStyleSheet(themedStyles);
  const styles = themedStyles;
  const {id} = route.params;
  // const [search, setSearch] = useState('');
  // const [characters, setCharacters] = useState(data.characters.nodes);
  // const [load, setLoad] = useState(false);
  //
  // const renderItemHeader = (item) => (
  //   <ImageBackground style={styles.itemHeader} source={{uri: item}} />
  // );
  //
  // useEffect(() => {
  //   setLoad(true);
  //   const arr = [];
  //   data.characters.nodes.map((item) => {
  //     if (item.name.full.toLowerCase().includes(search.toLowerCase())) {
  //       arr.push(item);
  //     }
  //   });
  //   setCharacters(arr);
  //   setLoad(false);
  // }, [search]);
  //
  // const renderProductItem = ({item}) =>
  //   item.name.full.toLowerCase().includes(search.toLowerCase()) ? (
  //     // <Card
  //     //   key={item.id}
  //     //   style={styles.productItem}
  //     //   header={() => renderItemHeader(item.image.large)}>
  //     //   <Text category="s1">{item.name.full}</Text>
  //     //   {/* <Text appearance="hint" category="c1">
  //     //     {item.type}
  //     //   </Text> */}
  //     // </Card>
  //     <View>
  //       <Text>{item.name.full}</Text>
  //     </View>
  //   ) : null;

  return (
    <ScrollView>
      <Spacer height={spacing.extraLarge3} />
      <Text type={'body-bold'}>{id}</Text>
      {/*<Input*/}
      {/*  placeholder="Search By Character's Name"*/}
      {/*  value={search}*/}
      {/*  onChangeText={(nextValue) => setSearch(nextValue)}*/}
      {/*  style={{width: '69%'}}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  onPress={() => {*/}
      {/*    Alert.alert(*/}
      {/*      `${data.title.userPreferred}`,*/}
      {/*      `Popularity: ${data.popularity}\nAverage Score: ${data.averageScore}\nOther Names:\n\t\t\tRomaji: ${data.title.romaji}\n\t\t\tEnglish: ${data.title.english}\n\t\t\tNative: ${data.title.native}`,*/}

      {/*      [{text: 'OK', onPress: () => console.log('OK Pressed')}],*/}
      {/*      {cancelable: false},*/}
      {/*    );*/}
      {/*  }}*/}
      {/*  style={{marginLeft: 10, width: '25%'}}*/}
      {/*  // accessoryLeft={(props) => <Icon {...props} name="info" />}*/}
      {/*>*/}
      {/*  INFO*/}
      {/*</Button>*/}
    </ScrollView>
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
    backgroundColor: 'white',
  },
  itemHeader: {
    height: 200,
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
  icon: {
    position: 'absolute',
    width: 32,
    height: 32,
    top: 0,
    left: 0,
  },
});
export default Information;