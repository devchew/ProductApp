import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {fetchData, deleteProduct} from '../api.js';
import {useIsFocused} from '@react-navigation/native';
import {ADD_PRODUCT, SCREENS, ADD_NEW_ZERO_PRODUCTS} from '../strings.js';

function HomeScreen({navigation}) {
  const [products, setProducts] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchData();
      setProducts(data);
    };
    loadProducts();
  }, [isFocused]);

  const handleAddProduct = () => {
    navigation.navigate(SCREENS.AddProduct);
  };

  const handleProductPress = product => {
    navigation.navigate(SCREENS.ProductDetails, {product});
  };

  const handleDeleteProduct = async productId => {
    await deleteProduct(productId);
    setProducts(products.filter(product => product.id !== productId));
  };

  if (products.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.infoText}>{ADD_NEW_ZERO_PRODUCTS}</Text>
        <Button
          title={ADD_PRODUCT}
          onPress={() => navigation.navigate(SCREENS.AddProduct)}
        />
      </View>
    );
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleProductPress(item)}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemName}>{item.description}</Text>
      <Text style={styles.itemPrice}>{item.price} pln</Text>
      <Button
        title="🗑"
        onPress={() => handleDeleteProduct(item.id)}
        color="red"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title={ADD_PRODUCT} onPress={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    marginBottom: 20,
    fontSize: 16,
  },
});

export default HomeScreen;
