import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CharactersScreen} from '../../../app/navigation/enums/CharactersScreen';
import {CharactersNavigatorParamsList} from '../../../app/navigation/params/CharactersNavigatorParamsList';
import {BackBlackIcon} from '../../../constants/SvgImageAssets';
import {Episode} from '../../../services/graphql';
import {useCharacterQuery} from '../apis/useCharacterQuery';
import {EpisodeListItem} from '../components/EpisodeListItem';
import {LocationCard} from '../components/LocationCard';

const bannerHeight = 250;
const backBtnSize = 50;
const backIconSize = 24;

export const CharacterDetail: React.FC<{
  navigation: StackNavigationProp<
    CharactersNavigatorParamsList,
    CharactersScreen.CharacterDetail
  >;
  route: RouteProp<
    CharactersNavigatorParamsList,
    CharactersScreen.CharacterDetail
  >;
}> = ({navigation, route}) => {
  const {id} = route.params;
  const {data, loading} = useCharacterQuery({id});

  const onPressBack = () => {
    navigation.goBack();
  };

  const renderEpisode = ({item}: {item: Episode}) => (
    <EpisodeListItem item={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={onPressBack}>
          <BackBlackIcon width={backIconSize} height={backIconSize} />
        </TouchableOpacity>
      </View>
      <FlatList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={data?.episode ?? []}
        ListHeaderComponent={
          <View style={styles.container}>
            <FastImage
              style={styles.banner}
              source={{uri: data?.image}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.body}>
              <View style={styles.nameContainer}>
                <Text numberOfLines={1} style={styles.name}>
                  {data?.name}
                </Text>
                <View style={styles.statusContainer}>
                  <Text style={styles.status}>{data?.status}</Text>
                </View>
              </View>
              <View style={styles.speciesGenderContainer}>
                <View>
                  <Text style={styles.label}>Species</Text>
                  <Text style={styles.value}>{data?.species}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Gender</Text>
                  <Text style={styles.value}>{data?.gender}</Text>
                </View>
              </View>
              <View style={styles.locationContainer}>
                <LocationCard
                  label="Location"
                  title={data?.location?.name}
                  type={data?.location?.type}
                />
                <LocationCard
                  label="Origin"
                  title={data?.origin?.name}
                  type={data?.origin?.type}
                />
              </View>
              <Text style={styles.episodesLabel}>List of Episodes</Text>
            </View>
          </View>
        }
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderEpisode}
      />
      {loading && <ActivityIndicator size="small" />}
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 20,
    zIndex: 100,
  },
  backBtn: {
    width: backBtnSize,
    height: backBtnSize,
    borderRadius: backBtnSize / 2,
    backgroundColor: '#FFFFFF80',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  container: {backgroundColor: 'white', flex: 1},
  banner: {height: bannerHeight},
  body: {paddingHorizontal: 20, paddingVertical: 3},
  nameContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  name: {fontSize: 18, fontWeight: '500', color: 'black'},
  statusContainer: {
    backgroundColor: 'green',
    borderRadius: 3,
    width: 36,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {color: 'white', fontSize: 12, fontWeight: '700'},
  speciesGenderContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  label: {
    marginBottom: 3,
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  value: {
    width: 64,
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  episodesLabel: {fontSize: 18, fontWeight: '500'},
});

export default CharacterDetail;
