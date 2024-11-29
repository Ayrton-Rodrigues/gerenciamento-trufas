import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  secureTextEntry?: boolean;
}

const Input = ({ label, secureTextEntry = false, ...props }: InputProps) => {
  return (
    <div className="w-full">
      <label className="text-white">{label}</label>
      <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        className="w-full bg-slate-800 text-white py-2 px-4 rounded-md mt-2"
      />
    </div>
  );
};

export default Input;
