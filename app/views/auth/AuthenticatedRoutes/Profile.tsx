import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';

const Profile = () => {
  const { profile, logout } = useAuth();
  if (!profile) {
    return (
      <SafeAreaView>
        <Text>You are not authenticated</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.root}>
      <Text>{profile.name}</Text>
      <Text>{profile.email}</Text>
      <PrimaryButton
        title="Logout"
        backgroundColor="red"
        onPress={logout}
        textStyle={{
          color: 'white',
        }}
      ></PrimaryButton>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
});
