import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, TextInput, Title } from 'react-native-paper';

export default function SigninScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('connecté')
  };
    const handleSignup = () => {
        // Navigation vers l'écran d'inscription
        navigation.navigate('Signup');
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
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Se connecter
                </Button>
                <Button onPress={handleSignup} style={styles.signupButton}>
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

