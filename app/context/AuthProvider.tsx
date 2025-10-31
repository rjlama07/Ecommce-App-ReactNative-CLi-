import { createContext, FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from '../utils/localSorage';
import LocalStorageKey from '../constants/localstorage';
import client, { NetworkRoutes } from '../api/client';

export interface AuthResponse {
  profile: { email: string; id: string; name: string; image?: string };
}
interface DefaultAuthContext {
  isAuth: boolean | null;
  profile: AuthResponse['profile'] | null;
  logout: () => void;
  setAuthenticate: () => void;
  updateProfile: (profile: AuthResponse['profile']) => void;
}

export const AuthContext = createContext<DefaultAuthContext>({
  isAuth: null,
  profile: null,
  logout: () => {},
  setAuthenticate: () => {},
  updateProfile: (profile: AuthResponse['profile']) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<
    AuthResponse['profile'] | null
  >(null);
  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await getItemFromLocalStorage(LocalStorageKey.token);
        if (token) {
          const response = await client.get(NetworkRoutes.isAuth, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          const authResponse: AuthResponse = response.data;
          const profileData = authResponse.profile;
          console.log(
            profileData.id,
            profileData.email,
            profileData.name,
            profileData.image,
          );
          setIsAuthenticated(true);
          setUserProfile(authResponse.profile);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    }
    fetchToken();
  }, [isAuthenticated]);

  async function logOut() {
    await removeItemFromLocalStorage(LocalStorageKey.token);
    setIsAuthenticated(false);
  }
  function authenticate() {
    setIsAuthenticated(true);
  }
  function updateProfile(profile: AuthResponse['profile']) {
    setUserProfile(profile);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        profile: userProfile,
        logout: logOut,
        setAuthenticate: authenticate,
        updateProfile: updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
