import {Character, Info, Maybe} from '../../../services/graphql';
export class CharacterRepository {
  mergeCharacters(
    previousCharacters: Character[],
    newCharacters?: Maybe<Character>[],
  ): Character[] {
    if (!newCharacters || newCharacters?.length === 0) {
      return previousCharacters;
    }

    const totalCharacters = [...previousCharacters];

    newCharacters.forEach(item => {
      if (item !== null) {
        totalCharacters.push(item);
      }
    });

    return totalCharacters;
  }

  hasNextCharactersPage(listInfo?: Maybe<Info>): boolean {
    if (
      listInfo &&
      listInfo.next &&
      listInfo.pages &&
      listInfo.next <= listInfo.pages
    ) {
      return true;
    }

    return false;
  }
}
