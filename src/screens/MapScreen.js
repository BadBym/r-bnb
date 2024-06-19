import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-paper';
import FlatScreen from './FlatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showRedFrame, setShowRedFrame] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        Alert.alert('Logout Failed', 'No token found');
        return;
      }

      const response = await fetch('http://192.168.1.138:3001/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Alert.alert('Disconnected', 'Vous vous êtes déconnectés');
        navigation.replace('Signin');
        await AsyncStorage.removeItem('userToken');
      } else {
        const errorData = await response.json();
        Alert.alert('Logout Failed', errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error Logout:', error);
      Alert.alert('Logout Failed', 'Check your network connection and try again.');
    }
  };

  const handleMapPress = (event) => {
    if (showRedFrame) {
      const { coordinate } = event.nativeEvent;
      console.log(`Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`);
      setMarkerCoordinate(coordinate);
      setModalVisible(true);
    }
  };

  if (!region) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg ? errorMsg : 'Loading...'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, showRedFrame ? styles.redFrame : null]}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        onPress={handleMapPress}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            description="Current location"
          />
        )}

        {markerCoordinate && (
          <Marker
            coordinate={markerCoordinate}
            title="New Marker"
            description="New marker position"
          />
        )}
      </MapView>

      <Button
        icon="account"
        mode="contained"
        onPress={handleLogout}
        labelStyle={styles.addButtonText}
        style={styles.logoutButton}
      >
        Déconnexion
      </Button>

      <Button
        icon="plus"
        mode="contained"
        onPress={() => setShowRedFrame(!showRedFrame)}
        style={styles.addButton}
        labelStyle={styles.addButtonText}
      >
        Ajouter un lieu
      </Button>

      <FlatScreen visible={modalVisible} onDismiss={() => setModalVisible(false)} coordinates={markerCoordinate} />
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
  redFrame: {
    borderWidth: 2,
    borderColor: 'red',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: 'tomato',
  },
});
