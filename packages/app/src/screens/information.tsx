import React, {useContext} from 'react';
import {
  ImageBackground,
  ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';
import {Text} from "../components/text/text";
import {HStack, VStack} from "../components/view-stack";
import {Spacer} from "../components/spacer";
import {color, spacing} from "../styles";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {LinearGradient} from "react-native-gradients";
import {ArrowLeft, StarIcon} from "../assets/svgs";
import {Spinner} from "../components/spinner";
import {CenterText} from "../components/center-text";
import useDetailAnime from "../hooks/useDetailAnime";
import {AnimeContext} from "../hooks/AnimeContextProvider";

const colorList = [
  {offset: '0%', color: '#000000', opacity: '1'},
  {offset: '29%', color: '#000000', opacity: '0'},
]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types,@typescript-eslint/explicit-module-boundary-types
const Information = ({route, navigation}) => {
  // eslint-disable-next-line react/prop-types
  const {id} = route.params;

  const { loading, error, detail } = useDetailAnime(id)

  const { favoriteToggle, favorites } = useContext(AnimeContext)

  if (loading && detail === undefined) {
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
    <ScrollView style={{backgroundColor: '#000000'}}>
      <StatusBar barStyle={"light-content"} backgroundColor={color.primary900} />
      {detail !== null ?
        <VStack>
          <ImageBackground source={{uri: detail.coverImage.extraLarge}} style={{
            height: spacing['480'],
          }}>
            <VStack style={{flex: 1, justifyContent: 'flex-start'}}>
              <LinearGradient colorList={colorList} angle={270}/>
              <Spacer height={spacing.extraLarge3} />
              <TouchableOpacity
                onPress={navigation.goBack}
                style={{position: 'absolute', top: spacing.extraLarge3, width: '100%'}}>
                <HStack horizontal={spacing.medium}>
                  <ArrowLeft fill={color.white} height={spacing[16]} width={spacing[16]}/>
                  <Spacer width={spacing.tiny} />
                  <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>
                    Back
                  </Text>
                </HStack>
              </TouchableOpacity>
            </VStack>
            <VStack style={{flex: 1, justifyContent: 'flex-end'}}>
              <LinearGradient colorList={colorList} angle={90}/>
              <VStack horizontal={spacing.medium} bottom={spacing.medium} style={{position: 'absolute', bottom: -spacing.large}}>
                <Text type={'body-bold'}
                      style={{color: color.white, fontSize: spacing[32]}}>{detail.title.romaji}</Text>
                <Text type={'body-bold'}
                      style={{color: color.white, fontSize: spacing[24]}}>{detail.title.native}</Text>
              </VStack>
            </VStack>
          </ImageBackground>
          <Spacer height={spacing.extraLarge2} />
          <HStack horizontal={spacing.medium} bottom={spacing.extraMedium}>
            <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>{detail.type}</Text>
            <Spacer width={spacing.medium}/>
            <Text type={'body'} style={{color: color.white, fontSize: spacing[12]}}>{`${detail.popularity} `}
              <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>
                LIKES
              </Text>
            </Text>
            <Spacer/>
            <VStack style={{alignItems: 'flex-end'}} right={spacing.large}>
              <TouchableOpacity onPress={()=> favoriteToggle(detail)}>
                <StarIcon fill={favorites.find((fav)=> fav.id === detail.id) ? color.yellow500 : color.lightGrey} height={spacing[42]} width={spacing[42]}/>
              </TouchableOpacity>
            </VStack>
          </HStack>
          <HStack horizontal={spacing.small} bottom={spacing.medium}>
            {detail.tags.map((item, index)=>{
              if (index > 2) return null
              return(
                <Text type={'body-bold'} style={{fontSize: spacing[12], color: color.white}}>{` ${item.name},`}</Text>
              )
            })}
          </HStack>
          <VStack horizontal={spacing.medium}>
            {detail.description ? <Text type={'body'} style={{
              color: color.white,
              fontSize: spacing[14],
              lineHeight: spacing[24]
            }}>{detail.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text> : null}
          </VStack>
        </VStack>
        : null}
      <Spacer height={spacing.extraLarge3}/>
    </ScrollView>
  );
};

export default Information;