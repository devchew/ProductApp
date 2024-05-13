import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {ALERT_ERROR, SCREENS} from '../strings';
import {INVALID_USERNAME_OR_PASSWORD, USERNAME, PASSWORD} from '../strings';

const USER_DATA = {
  username: 'user',
  password: 'password',
};

function LoginScreen({navigation}) {
  const [username, setUsername] = useState(USER_DATA.username);
  const [password, setPassword] = useState(USER_DATA.password);

  const handleLogin = () => {
    if (username === USER_DATA.username && password === USER_DATA.password) {
      navigation.reset({
        index: 1,
        routes: [{name: SCREENS.Home}],
      });
    } else {
      Alert.alert(ALERT_ERROR, INVALID_USERNAME_OR_PASSWORD);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{USERNAME}:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Text>{PASSWORD}:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});

export default LoginScreen;
