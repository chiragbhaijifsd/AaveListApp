import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  CharacterDetail,
  CharactersList,
} from '../../../features/characters/screens';
import {CharactersScreen} from '../enums/CharactersScreen';
import {CharactersNavigatorParamsList} from '../params/CharactersNavigatorParamsList';

const Stack = createStackNavigator<CharactersNavigatorParamsList>();

export const CharactersNavigator = () => (
  <Stack.Navigator
    initialRouteName={CharactersScreen.CharactersList}
    mode="modal"
    headerMode="none">
    <Stack.Screen
      name={CharactersScreen.CharactersList}
      component={CharactersList}
    />
    <Stack.Screen
      name={CharactersScreen.CharacterDetail}
      component={CharacterDetail}
    />
  </Stack.Navigator>
);
