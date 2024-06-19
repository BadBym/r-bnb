import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-paper';
import FlatScreen from './FlatScreen';

export default function MapScreen() {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        // Vous pouvez ajouter d'autres propriétés et marqueurs à la carte ici
      />

      <Button
        icon="plus"
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
        labelStyle={styles.addButtonText}
      >
        Ajouter un lieu
      </Button>

      {/* Modal FlatScreen */}
      <FlatScreen visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: 'tomato',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
