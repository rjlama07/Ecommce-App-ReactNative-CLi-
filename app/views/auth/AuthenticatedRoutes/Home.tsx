import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigator/AuthStack';

type Props = StackScreenProps<AuthStackParamList, 'home'>;
const Home: FC<Props> = ({ route }) => {
  const params = route.params;
  return (
    <SafeAreaView>
      <Text>{params.profile.name}</Text>
      <Text>{params.profile.email}</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
