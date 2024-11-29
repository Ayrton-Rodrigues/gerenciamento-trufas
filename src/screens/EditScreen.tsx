import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, Switch } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { getTrufa, updateTrufa } from '../services/Trufa';
import { Trufa } from '../types/Trufa';
import Loading from '../components/Loading';

interface EditScreenProps {
  route: any;
}

const EditScreen = ({ route }: EditScreenProps) => {
  const { trufaId } = route.params;
  const [fetchedTrufa, setTrufa] = useState<Trufa>();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [disponivel, setDisponivel] = useState(true);
  const [loading, setLoading] = useState(true)


  const getTrufaById = async () => {
    try {
      console.log("Buscando trufa com ID:", trufaId);      
      const trufa = await getTrufa(trufaId)
      
      if(trufa){
        setTimeout(() => {
          setTrufa(trufa)           
          setNome(trufa.nome);
          setDescricao(trufa.descricao);
          setPreco(trufa.preco.toString());
          setQuantidade(trufa.quantidade.toString());
          setDisponivel(trufa.disponivel);
          setLoading(false)  
        }, 500);
      } else {
        console.warn("Trufa não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao buscar trufa:", error);
    }
  };

  
  useEffect(() => {
    getTrufaById()
  }, []);
  
  const navigation = useNavigation();

  const goBackButton = () => {
    navigation.goBack();
  }
  
  const handleSave = async () => {
    if (!nome || !descricao || !preco || !quantidade) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }

    const trufaAtualizada: Trufa = {
      id: trufaId,
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      disponivel: parseInt(quantidade) > 0 ? true : false,
    };
  
    try {

      const response = await updateTrufa(parseInt(trufaId), trufaAtualizada);
      
      if(response){
        Alert.alert('Sucesso', 'Trufa atualizada com sucesso!');
        navigation.goBack();
        return;
      }
      Alert.alert('Erro', 'Não foi possível atualizar a trufa.');

    } catch (error) {
        console.error('Erro ao atualizar trufa:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a trufa.');
    }
  };

  if (loading) {
    return <Loading />;
  }

   return (
      <View className="flex-1 bg-purple-800 w-full">
      
        <View className="bg-purple-800">
          <View className="flex-row items-center mt-10 mb-6">
            <TouchableOpacity
              onPress={goBackButton}
              className="ml-4"
            >
              <Feather name="arrow-left" color="white" size={44} />
            </TouchableOpacity>         
          </View>
        </View>
  
      <View className="flex-1 bg-slate-300 mt-4 w-full0 p-4">      
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
            value={preco.toString()}
            onChangeText={(value) => setPreco(value)}
          />
        </View>
  

        <View className="mb-4">
          <Text className="text-purple-800 text-sm font-semibold mb-1">Quantidade</Text>
          <TextInput
            className="bg-white border border-purple-300 rounded-md p-3"
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            value={quantidade.toString()}
            onChangeText={(value) => setQuantidade(value)}
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
          onPress={handleSave}
          className="bg-purple-700 rounded-md p-3"
        >
          <Text className="text-white text-center text-lg font-bold">Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
    );

};

export default EditScreen;
