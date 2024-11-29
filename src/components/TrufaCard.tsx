import React from "react";
import { View, Text } from "react-native";
import { Trufa } from "../types/Trufa";

const TrufaCard = ({ id, nome, descricao, preco, quantidade, disponivel }: Trufa) => {
  return (
    <View className="bg-white p-4 rounded-lg mb-4 mt-2 shadow-md w-full max-w-sm">
      <Text className="text-lg font-bold">{nome}</Text>
      <Text className="text-gray-500 mb-2">{descricao}</Text>
      <Text className="text-purple-800 font-semibold">Preço: R$ {preco.toFixed(2)}</Text>
      <Text className="text-purple-800 font-semibold">Quantidade: {quantidade}</Text>
      <Text className={`font-bold ${disponivel ? "text-green-500" : "text-red-500"}`}>
        {disponivel ? "Disponível" : "Indisponível"}
      </Text>
    </View>
  );
};

export default TrufaCard;
