import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import TrufaCard from "../components/TrufaCard";

import { useTrufas } from '../global/TrufaContext';


export default function EstoqueScreen() {
  const {trufas} = useTrufas();

  useEffect(() => {    
      trufas
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-slate-300">

      <View className="bg-purple-800 w-full flex items-center">
          <Text className="text-white text-2xl mb-5 mt-10">Estoque</Text>
      </View>

      <View className="flex-1 justify-center items-center bg-slate-300 mt-2">
        <FlatList
          data={trufas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TrufaCard
              id={item.id}
              nome={item.nome}
              descricao={item.descricao}
              preco={item.preco}
              quantidade={item.quantidade}
              disponivel={item.disponivel}
            />
          )}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
