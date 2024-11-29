import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function Loading() {
  return (
    <View className="flex-1 justify-center items-center bg-purple-100">
      <ActivityIndicator size="large" color="#6b46c1" />
      <Text className="text-purple-800 mt-4 text-lg font-semibold">Carregando...</Text>
    </View>
  );
}