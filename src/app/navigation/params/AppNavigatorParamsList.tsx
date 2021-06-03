import {Navigator} from '../enums/Navigator';
import {ParamsListOption} from '../types/ParamsListOption';
import {CharactersNavigatorParamsList} from './CharactersNavigatorParamsList';

export type AppNavigatorParamsList = {
  [Navigator.CharactersNavigator]: ParamsListOption<CharactersNavigatorParamsList>;
};
