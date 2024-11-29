import React from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-3 rounded-md mt-3 ${
        disabled ? "bg-slate-400" : "bg-blue-500"
      }`}
    >
      <Text className={`text-center text-white text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
