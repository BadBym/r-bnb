// FlatScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; // Importer Location pour récupérer la position

export default function FlatScreen({ visible, onDismiss, coordinates }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState(null); // State pour stocker l'ID de l'utilisateur

  useEffect(() => {
    // Fonction asynchrone pour récupérer l'ID de l'utilisateur
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const response = await fetch('http://192.168.1.138:3001/auth/current-user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUserId(userData.id); // Mettre à jour l'ID de l'utilisateur dans le state
          } else {
            Alert.alert('User Fetch Failed', 'Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        Alert.alert('User Fetch Failed', 'Check your network connection and try again.');
      }
    };

    fetchUserId(); // Appeler la fonction pour récupérer l'ID de l'utilisateur au montage du composant
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Token Error', 'No token found');
        return;
      }

      const data = {
        title: title,
        description: description,
        price: price,
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        authorId: userId, // Utiliser l'ID de l'utilisateur récupéré automatiquement
      };

      const response = await fetch('http://192.168.1.138:3001/event/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert('Location Saved', 'Emplacement enregistré avec succès');
        onDismiss();
      } else {
        const errorData = await response.json();
        Alert.alert('Save Failed', errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error saving location:', error);
      Alert.alert('Save Failed', 'Check your network connection and try again.');
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <TextInput
          label="Titre"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />
        <TextInput
          label="Prix"
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Enregistrer
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 8,
  },
  input: {
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 10,
  },
});
