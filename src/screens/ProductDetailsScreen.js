import React from 'react';
import {Text, StyleSheet, ScrollView, Button} from 'react-native';
import {GO_BACK} from '../strings';

function ProductDetailsScreen({route, navigation}) {
  const {product} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} pln</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title={GO_BACK} onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

export default ProductDetailsScreen;
