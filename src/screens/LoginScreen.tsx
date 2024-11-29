import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import Button from "../components/Button";
import { router } from "expo-router";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <View className="flex-1 justify-center items-center bg-purple-200 p-5">
      <Text className="text-white text-2xl mb-5">Entrar</Text>
      <View className="w-full max-w-sm">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="black"
          className="w-full bg-purple-50 black-white py-4 px-6 rounded-md mb-3"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor="black"
          secureTextEntry
          className="w-full bg-purple-50 black-white py-4 px-6 rounded-md mb-3"
        />
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
}
