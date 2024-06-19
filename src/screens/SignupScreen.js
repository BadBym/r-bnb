import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, Title } from 'react-native-paper';

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Sign Up</Title>
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Button
                        mode="contained"
                        onPress={() => navigation.replace('Login')}
                        style={styles.button}
                    >
                        Sign Up
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('Login')}
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
