import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';

export default function FlatScreen({ visible, onDismiss }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Price:', price);

    onDismiss();

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
          multiline
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
