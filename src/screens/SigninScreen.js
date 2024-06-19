import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, TextInput, Title } from 'react-native-paper';

export default function SigninScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('connecté')
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
});

