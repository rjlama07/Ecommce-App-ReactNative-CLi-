import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import AntDesign from '@react-native-vector-icons/ant-design';
import { launchImageLibrary } from 'react-native-image-picker';
import client, { NetworkRoutes } from '../../../api/client';
import { getItemFromLocalStorage } from '../../../utils/localSorage';
import LocalStorageKey from '../../../constants/localstorage';

const profileUrl =
  'https://scontent.fmel11-1.fna.fbcdn.net/v/t39.30808-1/475864602_4039317336290123_4764508345204025327_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_ohc=cl24u36tAmcQ7kNvwFTkn9p&_nc_oc=Adm94oHAC6UDuqThMFBfEsGyO8drHGi4CacR5dGGS7W5Gm8JPazxoOsb0n7_Dim-o3A&_nc_zt=24&_nc_ht=scontent.fmel11-1.fna&_nc_gid=tN-7GRT7vwTtJrd0UwQ2uA&oh=00_AfcDP0NKH3jnrbjSD74EaWAebGzU3u2v1sBXnmSkpF8tSg&oe=690A3955';
const Profile = () => {
  const { profile, logout, updateProfile } = useAuth();
  if (!profile) {
    return (
      <SafeAreaView>
        <Text>You are not authenticated</Text>
      </SafeAreaView>
    );
  }
  async function pickImage() {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.didCancel || !result.assets) {
        return;
      }
      if (result.assets) {
        const image = result.assets[0];
        const formData = new FormData();
        formData.append('image', {
          name: image.fileName ?? '',
          uri: image.uri,
          type: image.type,
          size: image.fileSize,
        });
        const token = await getItemFromLocalStorage(LocalStorageKey.token);
        const { data } = await client.post(
          NetworkRoutes.uplodProfile,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        updateProfile(data.result);
      }
    } catch (e) {
      Alert.alert('Error', 'Error');
    }
  }
  function logUserOut() {
    Alert.alert(
      'Are you sure?',
      'You will be logged out',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => logout(), // <-- call your logout function here
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  }
  console.log(profile);
  return (
    <View style={styles.root}>
      <View style={{ height: '30%' }}>
        <Image
          source={require('../../../../source/background.jpg')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        <View style={styles.profileImageContainer}>
          {profile.image ? (
            <Image
              source={{ uri: profile.image }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'stretch',
              }}
            />
          ) : (
            <Pressable
              onPress={pickImage}
              style={{
                backgroundColor: 'lightgrey',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <AntDesign name="user-add" size={40} />
            </Pressable>
          )}
        </View>
      </View>
      {/* this will be user details*/}
      <View style={styles.userDetailsContainer}>
        <Text style={styles.profileNameText}>{profile.name}</Text>
        <PrimaryButton
          title="Logout"
          backgroundColor="red"
          textStyle={{
            color: 'white',
          }}
          onPress={logUserOut}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 16,
  },
  profileImageContainer: {
    borderWidth: 6,
    borderColor: 'black',
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    bottom: -50,
    left: '50%',
    right: '50%',
    overflow: 'hidden',
    transform: [{ translateX: -50 }],
    zIndex: 1,
  },
  userDetailsContainer: {
    marginTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  profileNameText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 600,
  },
});
