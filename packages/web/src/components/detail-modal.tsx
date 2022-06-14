import {ImageBackground, ScrollView, TouchableOpacity} from "react-native";
import {color, spacing} from "@anilist-fe/app/src/styles";
import React from "react";
import {HStack, VStack} from "@anilist-fe/app/src/components/view-stack";
import {Spacer} from "@anilist-fe/app/src/components/spacer";
import {Text} from "@anilist-fe/app/src/components/text/text";

import {AnimeItemType, DetailDataType} from "@anilist-fe/app/src/type";
import {Button, Modal} from "antd";
import {ReactComponent as StarIcon} from "@anilist-fe/app/src/assets/svgs/starIcon.svg";

type DetailModalProps = {
  isModalVisible: boolean
  handleOk(): void
  detail: DetailDataType | null
  favorites: Array<AnimeItemType>
  favoriteToggle(item: AnimeItemType |DetailDataType): void
}

export const DetailModal = ({isModalVisible, handleOk, detail, favorites, favoriteToggle }: DetailModalProps) => {
  return(
    <Modal
      title={detail?.title.native ?? ""} visible={isModalVisible} width={window.screen.availWidth * 0.8} onCancel={handleOk}
      footer={[<Button key="submit" type="primary" onClick={handleOk}>
        OK
      </Button>]}
    >
      <ScrollView style={{backgroundColor: '#000000'}}>
        {detail !== null ?
          <VStack>
            <ImageBackground source={{uri: detail.bannerImage ? detail.bannerImage : detail.coverImage.extraLarge}} style={{
              height: spacing['256'],
            }}>
              <VStack style={{backgroundColor: 'rgba(0,0,0, 0.10)', flex: 1, justifyContent: 'flex-end'}}>
                <div
                  style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0, 0),#000000)",
                    color: "darkred",
                  }}>
                  <VStack horizontal={spacing.medium} bottom={spacing.medium}>
                    <Text type={'body-bold'}
                          style={{color: color.white, fontSize: spacing[32]}}>{detail.title.romaji}</Text>
                    <Text type={'body-bold'}
                          style={{color: color.white, fontSize: spacing[24]}}>{detail.title.native}</Text>
                  </VStack>
                </div>
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
              <Spacer />
              <VStack style={{alignItems: 'flex-end'}} right={spacing.large}>
                <TouchableOpacity onPress={()=> favoriteToggle(detail)}>
                  <StarIcon fill={favorites.find((fav)=> fav.id === detail.id) ? color.yellow500 : color.lightGrey} height={spacing[42]} width={spacing[42]}/>
                </TouchableOpacity>
              </VStack>
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
    </Modal>
  )
}