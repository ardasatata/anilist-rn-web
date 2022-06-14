import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimeList from '../screens/anime-list';
import Information from '../screens/information';
import FavoriteList from "../screens/favorite-list";
import {SearchIcon, StarIcon} from "../assets/svgs";
import {color, spacing} from "../styles";

const StackNav = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Search" options={{headerShown: false, tabBarIcon: ({focused})=> <SearchIcon fill={focused ? color.primary800 : color.lightGrey} height={spacing[20]} width={spacing[20]}/>}} >
        {
          props => {
            return(
              <StackNav.Navigator initialRouteName="Anime List">
                <StackNav.Screen
                  name="Anime List"
                  component={AnimeList}
                />
                <StackNav.Screen
                  options={{headerShown: false}}
                  name="Detail"
                  component={Information}
                />
              </StackNav.Navigator>
            )
          }
        }
      </Tab.Screen>
      <Tab.Screen name="Favorite" options={{headerShown: false, tabBarIcon: ({focused})=> <StarIcon fill={focused ? color.primary800 : color.lightGrey} height={spacing[20]} width={spacing[20]}/>}}>
        {
          props => {
            return(
              <StackNav.Navigator initialRouteName="Favorite">
                <StackNav.Screen
                  name="Favorite"
                  component={FavoriteList}
                />
                <StackNav.Screen
                  options={{headerShown: false}}
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