import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LocationCardBase: React.FC<{
  label: string;
  title: string;
  type: string;
}> = ({label, title, type}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.text}>{type}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '45%',
    backgroundColor: 'lightgrey',
    shadowColor: 'black',
    borderRadius: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
});

export const LocationCard = React.memo(LocationCardBase);
