import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DependencyContext from '../../services/di/DependencyContext';
import {AppNavigator} from '../navigation/navigators/AppNavigator';
import {GraphQL} from './GraphQL';

const AppContainer: React.FC = () => {
  const dependencies = React.useContext(DependencyContext);

  return (
    <DependencyContext.Provider value={dependencies}>
      <GraphQL>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GraphQL>
    </DependencyContext.Provider>
  );
};

export default AppContainer;
