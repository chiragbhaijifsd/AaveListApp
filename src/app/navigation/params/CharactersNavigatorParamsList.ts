import {CharactersScreen} from '../enums/CharactersScreen';

export type CharactersNavigatorParamsList = {
  [CharactersScreen.CharactersList]: {};
  [CharactersScreen.CharacterDetail]: {id: string};
};
