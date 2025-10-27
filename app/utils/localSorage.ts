import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveToLocalStorage(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

async function getItemFromLocalStorage(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { saveToLocalStorage, getItemFromLocalStorage };
