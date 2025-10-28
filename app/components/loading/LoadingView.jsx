import { ActivityIndicator, View } from 'react-native';
import React from 'react';

const LoadingView = () => {
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
};

export default LoadingView;
