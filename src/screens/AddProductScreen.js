import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {addProduct} from '../api';
import {
  ALERT_ERROR,
  ALERT_ERROR_PRODUCT_MISSING_DATA,
  ALERT_SUCCESS,
  PRODUCT_ADDED_SUCCESS,
  ALERT_ERROR_ADDING_PRODUCT,
  NAME_OF_PRODUCT,
  PRODUCT_DESCRIPTION,
  PRODUCT_PRICE,
  ADD_PRODUCT,
} from '../strings';

function AddProductScreen({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = async () => {
    if (!name || !price) {
      Alert.alert(ALERT_ERROR, ALERT_ERROR_PRODUCT_MISSING_DATA);
      return;
    }

    const newProduct = {
      id: Date.now().toString(), // Użycie timestamp jako unikalne ID
      name,
      description,
      price,
    };

    try {
      await addProduct(newProduct);
      Alert.alert(ALERT_SUCCESS, PRODUCT_ADDED_SUCCESS);
      navigation.goBack();
    } catch (error) {
      Alert.alert(ALERT_ERROR, ALERT_ERROR_ADDING_PRODUCT);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={NAME_OF_PRODUCT}
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder={PRODUCT_DESCRIPTION}
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        placeholder={PRODUCT_PRICE}
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title={ADD_PRODUCT} onPress={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default AddProductScreen;
