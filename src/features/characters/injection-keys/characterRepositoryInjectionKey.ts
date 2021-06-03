import {InjectionKey, InjectionKeyScope} from '../../../services/di';
import {CharacterRepository} from '../repositories/CharacterRepository';

export const characterRepositoryInjectionKey: InjectionKey<CharacterRepository> =
  {
    name: 'characterRepository',
    scope: InjectionKeyScope.singleton,
    closure: () => {
      return new CharacterRepository();
    },
  };
