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
      const token = await AsyncStorage.getItem('userToken'); // Remplacez 'userToken' par la clé correcte utilisée pour stocker le token

      if (!token) {
        Alert.alert('Logout Failed', 'No token found');
        return;
      }

      const response = await fetch('http://192.168.1.138:3001/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        },
      });

      if (response.ok) {
        Alert.alert('Disconnected', 'Vous vous êtes déconnectés');
        navigation.replace('Signin');

        // Optionnel : Supprimer le token de AsyncStorage après la déconnexion
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
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Vous êtes"
            description="Location actuelle"
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
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
        labelStyle={styles.addButtonText}
      >
        Ajouter un lieu
      </Button>

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
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: 'tomato',
  }
});
