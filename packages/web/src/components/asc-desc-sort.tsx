import {TouchableOpacity} from "react-native";
import {color, spacing} from "@anilist-fe/app/src/styles";
import React from "react";
import {HStack} from "@anilist-fe/app/src/components/view-stack";
// import {SortAsc, SortDesc} from "@anilist-fe/app/src/assets/svgs";
import {Spacer} from "@anilist-fe/app/src/components/spacer";
import {Text} from "@anilist-fe/app/src/components/text/text";

import { ReactComponent as SortAsc } from '@anilist-fe/app/src/assets/svgs/sortAsc.svg';
import { ReactComponent as SortDesc } from '@anilist-fe/app/src/assets/svgs/sortDesc.svg';

export type AscDescSortType = {
  isDesc: boolean
  onTogglePress(value: boolean): void
}

export const AscDescSort = ({isDesc, onTogglePress}: AscDescSortType) => {
  if (isDesc)
    return (
      <TouchableOpacity onPress={() => onTogglePress(false)}>
        <HStack>
          <SortDesc fill={color.dark900} height={spacing[20]} width={spacing[20]}/>
          <Spacer width={spacing.small}/>
          <Text>{`Descending`}</Text>
        </HStack>
      </TouchableOpacity>
    )

  else
    return (
      <TouchableOpacity onPress={() => onTogglePress(true)}>
        <HStack>
          <SortAsc fill={color.dark900} height={spacing[20]} width={spacing[20]}/>
          <Spacer width={spacing.small}/>
          <Text>{`Ascending`}</Text>
        </HStack>
      </TouchableOpacity>
    )
}