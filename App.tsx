import { StyleSheet } from 'react-native';
import React from 'react';
import SignIn from './app/views/auth/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUp from './app/views/auth/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './app/navigator/AuthStack';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <AuthStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
