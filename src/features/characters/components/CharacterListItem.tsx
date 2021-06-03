import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Character} from '../../../services/graphql';

const avatarSize = 60;

const CharacterListItemBase: React.FC<{
  item: Character;
  onPress: () => void;
  style: object;
}> = ({item, onPress, style}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={[styles.container, style]}>
        {item?.image && (
          <Image
            style={styles.avatar}
            source={{uri: item.image}}
            resizeMode={'cover'}
          />
        )}

        <View style={styles.body}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.text}>
            {item?.species} | {item?.gender}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: 'lightgrey',
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
});

export const CharacterListItem = React.memo(CharacterListItemBase);
