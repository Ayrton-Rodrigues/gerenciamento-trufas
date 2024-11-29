import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Switch, TouchableOpacity } from 'react-native';
import { useTrufas } from '../global/TrufaContext';
import { Trufa } from '../types/Trufa';
import { addTrufa } from '../services/Trufa'
import { Feather } from '@expo/vector-icons';

export default function CadastroTrufaScreen() {
  const { trufas, setTrufas } = useTrufas();

 
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [disponivel, setDisponivel] = useState(true);


  const handleCadastro = async () => {
    if (!nome || !descricao || !preco || !quantidade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    
    const novaTrufa: Trufa = {
      id: trufas.length + 1,
      nome,
      descricao,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      disponivel,
    };

    const frutaSalva = await addTrufa(novaTrufa)
    if(frutaSalva){
      setTrufas((prevTrufas) => [...prevTrufas, novaTrufa]);
  
      Alert.alert('Sucesso', 'Trufa cadastrada com sucesso!');
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
      setDisponivel(true);
    }

  };

  return (
    <View className="flex-1 justify-center items-center bg-slate-300">

    <View className="bg-purple-800 w-full flex items-center">
        <Text className="text-white text-2xl mb-5 mt-10">Cadastro</Text>
    </View>


      <View className="flex-1 bg-slate-300 mt-4 w-full p-4">
        <View className="mb-4">
          <Text className="text-purple-800 text-sm font-semibold mb-1">Nome</Text>
          <TextInput
            className="bg-white border border-purple-300 rounded-md p-3"
            placeholder="Digite o nome da trufa"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View className="mb-4">
          <Text className="text-purple-800 text-sm font-semibold mb-1">Descrição</Text>
          <TextInput
            className="bg-white border border-purple-300 rounded-md p-3"
            placeholder="Digite a descrição"
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <View className="mb-4">
          <Text className="text-purple-800 text-sm font-semibold mb-1">Preço (R$)</Text>
          <TextInput
            className="bg-white border border-purple-300 rounded-md p-3"
            placeholder="Digite o preço"
            keyboardType="numeric"
            value={preco}
            onChangeText={setPreco}
          />
        </View>

        <View className="mb-4">
          <Text className="text-purple-800 text-sm font-semibold mb-1">Quantidade</Text>
          <TextInput
            className="bg-white border border-purple-300 rounded-md p-3"
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
        </View>

        <View className="flex-row items-center mb-6">
          <Text className="text-purple-800 text-sm font-semibold mr-2">Disponível</Text>
          <Switch
            value={disponivel}
            onValueChange={setDisponivel}
            thumbColor={disponivel ? '#6b46c1' : '#d1d5db'}
            trackColor={{ true: '#c4b5fd', false: '#e5e7eb' }}
          />
        </View>

        <TouchableOpacity
          onPress={handleCadastro}
          className="bg-purple-700 rounded-md p-3"
        >
          <Text className="text-white text-center text-lg font-bold">Cadastrar Trufa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


}
