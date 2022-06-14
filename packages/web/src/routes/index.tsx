import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimeList from '../screens/anime-list';
import Information from "../screens/information";
// import Information from '../screens/information';

import { ReactComponent as ArrowLeft } from '@anilist-fe/app/src/assets/svgs/arrowLeft.svg';
import {color, spacing} from "@anilist-fe/app/src/styles";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FavoriteList from "../screens/favorite-list";
import { ReactComponent as SearchIcon} from "@anilist-fe/app/src/assets/svgs/searchIcon.svg";
import { ReactComponent as StarIcon} from "@anilist-fe/app/src/assets/svgs/starIcon.svg";

const StackNav = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Search" options={{headerShown: false, tabBarIcon : ({focused})=> <SearchIcon fill={focused ? color.primary800 : color.lightGrey} height={spacing[12]} width={spacing[12]}/>}}>
        {
          props => {
            return(
              <StackNav.Navigator
                initialRouteName="Anime List"
                screenOptions={{
                  headerBackImage: () => <ArrowLeft fill={color.dark900} height={spacing[12]} width={spacing[12]} />,
                }}>
                <StackNav.Screen
                  name="Anime List"
                  component={AnimeList}
                />
                <StackNav.Screen
                  name="Detail"
                  component={Information}
                />
              </StackNav.Navigator>
            )
          }
        }
      </Tab.Screen>
      <Tab.Screen name="Favorite" options={{headerShown: false, tabBarIcon : ({focused})=> <StarIcon fill={focused ? color.primary800 : color.lightGrey} height={spacing[12]} width={spacing[12]}/>}}>
        {
          props => {
            return(
              <StackNav.Navigator
                initialRouteName="Anime List"
                screenOptions={{
                  headerBackImage: () => <ArrowLeft fill={color.dark900} height={spacing[12]} width={spacing[12]} />,
                }}>
                <StackNav.Screen
                  name="Favorite List"
                  component={FavoriteList}
                />
                <StackNav.Screen
                  name="Detail"
                  component={Information}
                />
              </StackNav.Navigator>
            )
          }
        }
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
);

export default Navigator;