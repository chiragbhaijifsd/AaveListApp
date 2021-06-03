import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {firstName} from '../../../common/utilities';

const EpisodeCharactersListItemBase: React.FC<{
  name?: string;
  species?: string;
  gender?: string;
  style?: object;
}> = ({name, species, gender, style}) => (
  <View style={[styles.container, style]}>
    <Text style={styles.name} numberOfLines={1} ellipsizeMode="middle">
      {firstName(name ?? '')}
    </Text>
    <Text style={styles.text}>
      {species} | {gender}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 60,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
  },
  name: {fontSize: 14, fontWeight: '500', color: 'black'},
  text: {fontSize: 14, color: 'black'},
});

export const EpisodeCharactersListItem = React.memo(
  EpisodeCharactersListItemBase,
);
