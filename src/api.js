import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS_KEY = 'PRODUCTS';

// Fetch all products
export const fetchData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PRODUCTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    console.error('Error fetching products', e);
  }
};

// Add a new product
export const addProduct = async product => {
  try {
    const existingProducts = await fetchData();
    const newProducts = [...existingProducts, product];
    const jsonValue = JSON.stringify(newProducts);
    await AsyncStorage.setItem(PRODUCTS_KEY, jsonValue);
  } catch (e) {
    // saving error
    console.error('Error adding product', e);
  }
};

// Delete a product
export const deleteProduct = async productId => {
  try {
    const existingProducts = await fetchData();
    const newProducts = existingProducts.filter(
      product => product.id !== productId,
    );
    const jsonValue = JSON.stringify(newProducts);
    await AsyncStorage.setItem(PRODUCTS_KEY, jsonValue);
  } catch (e) {
    // error deleting product
    console.error('Error deleting product', e);
  }
};

// Update a product
export const updateProduct = async updatedProduct => {
  try {
    const existingProducts = await fetchData();
    const newProducts = existingProducts.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product,
    );
    const jsonValue = JSON.stringify(newProducts);
    await AsyncStorage.setItem(PRODUCTS_KEY, jsonValue);
  } catch (e) {
    // error updating product
    console.error('Error updating product', e);
  }
};
