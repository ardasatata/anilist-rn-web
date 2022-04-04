import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Text} from "../components/text/text";
import {HStack, VStack} from "../components/view-stack";
import {Spacer} from "../components/spacer";
import {color, spacing} from "../styles";
import {useQuery} from "@apollo/react-hooks";
import {GET_ANIME_DETAIL} from "../query";
import {logger} from "../utils";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {LinearGradient} from "react-native-gradients";

const log = logger().child({module: "Detail"})

export type DetailDataType = {
  id: number
  title: {
    romaji: string
    english: string
    native: string
    userPreferred: string
  }
  description: string
  type: string
  bannerImage: string
  coverImage: {
    extraLarge: string
    large: string
    medium: string
    color: string
  }
  popularity
}

const colorList = [
  {offset: '0%', color: '#000000', opacity: '1'},
  {offset: '29%', color: '#000000', opacity: '0'},
]

const Information = ({route}) => {
  const {id} = route.params;

  const [detail, setDetail] = useState<DetailDataType>(null);

  const {loading, error, data} = useQuery(GET_ANIME_DETAIL, {
    variables: {
      id: id
    }
  });

  useEffect(() => {
    if (data) {
      setDetail(data.Media);
    }
    log.info(data)
  }, [data]);

  return (
    <ScrollView style={{backgroundColor: '#000000'}}>
      {detail !== null ?
        <VStack>
          <ImageBackground source={{uri: detail.coverImage.extraLarge}} style={{
            height: spacing['480'],
          }}>
            <VStack style={{backgroundColor: 'rgba(0,0,0, 0.10)', flex: 1, justifyContent: 'flex-end'}}>
              <LinearGradient colorList={colorList} angle={90}/>
              <VStack horizontal={spacing.medium} bottom={spacing.medium} style={{position: 'absolute'}}>
                <Text type={'body-bold'}
                      style={{color: color.white, fontSize: spacing[32]}}>{detail.title.romaji}</Text>
                <Text type={'body-bold'}
                      style={{color: color.white, fontSize: spacing[24]}}>{detail.title.native}</Text>
              </VStack>
            </VStack>
          </ImageBackground>
          <HStack horizontal={spacing.medium} bottom={spacing.extraMedium}>
            <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>{detail.type}</Text>
            <Spacer width={spacing.medium}/>
            <Text type={'body'} style={{color: color.white, fontSize: spacing[12]}}>{`${detail.popularity} `}
              <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>
                LIKES
              </Text>
            </Text>
          </HStack>
          <VStack horizontal={spacing.medium}>
            {detail.description ? <Text type={'body'} style={{
              color: color.white,
              fontSize: spacing[14]
            }}>{detail.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text> : null}
          </VStack>
        </VStack>
        : null}
      <Spacer height={spacing.extraLarge3}/>
    </ScrollView>
  );
};

export default Information;