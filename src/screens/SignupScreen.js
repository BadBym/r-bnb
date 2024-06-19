import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Title } from 'react-native-paper';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = async () => {

        try {
          // Envoi des données au backend
          const response = await fetch('http://192.168.1.138:3001/auth/signup', {
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
            // Inscription réussie, rediriger vers l'écran principal ou effectuer d'autres actions nécessaires
            Alert.alert('Success', 'Votre compte a été créé avec succès');
            navigation.replace('Signin');
          } else {
            // Gérer les erreurs de l'API backend
            const errorData = await response.json();
            Alert.alert('Signup Failed', errorData.message || 'Something went wrong!');
          }
        } catch (error) {
          // Gérer les erreurs de connexion ou autres erreurs
          console.error('Error signing up:', error);
          Alert.alert('Signup Failed', 'Check your network connection and try again.');
        }
      };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Sign Up</Title>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        mode="outlined"
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                        mode="outlined"
                        autoCapitalize="none"
                    />
                    <Button
                        mode="contained"
                        onPress={handleSignUp}
                        style={styles.button}
                    >
                        Inscription
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('Signin')}
                        style={styles.link}
                    >
                        Already have an account? Login
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    link: {
        marginTop: 8,
    },
});
