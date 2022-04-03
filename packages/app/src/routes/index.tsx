import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimeList from '../components/anime-list';
import Information from '../components/information';

const StackNav = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="Anime List">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Anime List"
        component={AnimeList}
      />
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Characters & Informations"
        component={Information}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;