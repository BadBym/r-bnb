import {View, Text, StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react'
import { Button, Card, TextInput, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SigninScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      try {
          // Envoi des données au backend
          const response = await fetch('http://192.168.1.138:3001/auth/signin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email,
                  password,
              }),
          });

          if (response.ok) {
              const responseData = await response.json();
              const token = responseData.token;

              // Stocker le token dans AsyncStorage
              await AsyncStorage.setItem('userToken', token);

              // Connexion réussie, rediriger vers l'écran principal ou effectuer d'autres actions nécessaires
                      navigation.replace('Home');
          } else {
              // Gérer les erreurs de l'API backend
              const errorData = await response.json();
              Alert.alert('Login Failed', errorData.message || 'Something went wrong!');
          }
      } catch (error) {
          // Gérer les erreurs de connexion ou autres erreurs
          console.error('Error Login:', error);
          Alert.alert('Signup Failed', 'Check your network connection and try again.');
      }
  };


  return (
    <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>Connexion</Title>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    autoCapitalize="none"
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Se connecter
                </Button>
                <Button onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
                    Je n'ai pas de compte, m'inscrire
                </Button>
            </Card.Content>
        </Card>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
  },
  card: {
      width: '90%',
      padding: 20,
  },
  title: {
      textAlign: 'center',
      marginBottom: 20,
  },
  input: {
      marginBottom: 15,
  },
  button: {
      marginTop: 10,
  },
    signupButton: {
        marginTop: 8,
    },
});

