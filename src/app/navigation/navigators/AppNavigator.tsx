import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Navigator} from '../enums/Navigator';
import {AppNavigatorParamsList} from '../params/AppNavigatorParamsList';
import {CharactersNavigator} from './CharactersNavigator';

const Stack = createStackNavigator<AppNavigatorParamsList>();

export const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={Navigator.CharactersNavigator}
    mode="modal"
    headerMode="none">
    <Stack.Screen
      name={Navigator.CharactersNavigator}
      component={CharactersNavigator}
    />
  </Stack.Navigator>
);
