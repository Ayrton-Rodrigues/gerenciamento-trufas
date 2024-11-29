import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, FlatList, TouchableOpacity } from "react-native";
import { getTrufas, atualizarQuantidade } from "../services/Trufa";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useTrufas } from '../global/TrufaContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default function GerenciarScreen() {
  const navigation = useNavigation();
  const {trufas, setTrufas } = useTrufas();

  const excluirTrufa = (id: number) => {
    Alert.alert('Excluir Trufa', 'Tem certeza que deseja excluir esta trufa?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: () => {
          setTrufas((prevTrufas) => prevTrufas.filter((trufa) => trufa.id !== id));
        },
      },
    ]);
  };

  
  const getTrufasFromAPI = async () => {
    const data = await getTrufas();
    setTrufas(data);
  }
  

  const handleQuantityChange = async (id: number, operacao: "add" | "remove") => {
    console.log(id)
    console.log(operacao)
    atualizarQuantidade(id, operacao);

    getTrufasFromAPI()
    
  };
  
  useEffect(() => {   
    getTrufasFromAPI() 
    trufas   
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getTrufasFromAPI(); 
    }, [])
  );



  return (
    <View className="flex-1 justify-center items-center bg-slate-300 ">
      <View className="bg-purple-800 w-full flex items-center">
          <Text className="text-white text-2xl mb-5 mt-10">Gerenciar</Text>
      </View> 

      <View className="flex-1 justify-center items-center bg-slate-300 mt-4"> 

            <FlatList
              data={trufas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="mb-4 p-4 bg-white rounded-lg shadow-md min">
                  <View className="flex-row justify-between">
                    <Text className="text-lg font-semibold">{item.nome}</Text>
                    <View className="flex-row"> 
                      <TouchableOpacity
                          onPress={() => navigation.navigate('editar', { trufaId: item.id })}
                          style={{ marginRight: 10 }}
                      >
                        <Feather name="edit" color={"black"} size={24}></Feather>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => excluirTrufa(item.id)}>
                      <Feather name="trash-2" color={"red"} size={24}></Feather>
                      </TouchableOpacity>
                    </View>

                  </View>
                  <Text className="text-sm text-gray-500">{item.descricao}</Text>
                  <Text className="text-lg mt-2">Quantidade: {item.quantidade}</Text>

                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, "add")}
                      style={{ flexDirection: "row", alignItems: "center", padding: 8 }}
                    >
                      <MaterialIcons name="add" size={24} color="green" />
                      <Text className="ml-2">Adicionarr</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        if (item.quantidade > 0) {
                          handleQuantityChange(item.id, "remove");
                        } else {
                          Alert.alert("Erro", "Quantidade não pode ser menor que 0.");
                        }
                      }}
                      style={{ flexDirection: "row", alignItems: "center", padding: 8 }}
                    >
                      <MaterialIcons name="remove" size={24} color="red" />
                      <Text className="ml-2">Removerr</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
      </View>
    </View>

      );
    }





      