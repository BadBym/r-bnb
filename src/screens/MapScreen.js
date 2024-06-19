import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-paper';
import FlatScreen from './FlatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen({navigation}) {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = async () => {
    try {
      // Récupérer le token depuis AsyncStorage (ou d'où vous le stockez)
      const token = await AsyncStorage.getItem('userToken'); // Remplacez 'userToken' par la clé correcte utilisée pour stocker le token

      if (!token) {
        Alert.alert('Logout Failed', 'No token found');
        return;
      }

      // Envoi des données au backend
      const response = await fetch('http://192.168.1.138:3001/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        },
      });

      if (response.ok) {
        // Déconnexion réussie, rediriger vers l'écran de connexion ou effectuer d'autres actions nécessaires
        Alert.alert('Disconnected', 'Vous vous êtes déconnectés');
        navigation.replace('Signin');

        // Optionnel : Supprimer le token de AsyncStorage après la déconnexion
        await AsyncStorage.removeItem('userToken');
      } else {
        // Gérer les erreurs de l'API backend
        const errorData = await response.json();
        Alert.alert('Logout Failed', errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      // Gérer les erreurs de connexion ou autres erreurs
      console.error('Error Logout:', error);
      Alert.alert('Logout Failed', 'Check your network connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        // Vous pouvez ajouter d'autres propriétés et marqueurs à la carte ici
      />

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
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: 'tomato',
  }
});
