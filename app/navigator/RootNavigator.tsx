import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthProvider';
import { TabNavigator } from './BottomNav';
import AuthStack from './AuthStack';

const RootNavigator = () => {
  const authContext = useContext(AuthContext);

  if (authContext.isAuth === null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authContext.isAuth ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
