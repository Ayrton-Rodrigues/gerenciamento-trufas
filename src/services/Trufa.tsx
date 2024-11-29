import axios from "axios";
import { Trufa } from "../types/Trufa";


const API_URL = "http://127.0.0.1:8000/trufas";

export const getTrufas = async (): Promise<Trufa[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTrufa = async (id: number): Promise<Trufa> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addTrufa = async (trufa: Omit<Trufa, "id">): Promise<Trufa> => {
  const response = await axios.post(API_URL, trufa);
  console.log(response)
  return response.data;
};
export const updateTrufa = async (id: number, trufa: Trufa): Promise<Trufa> => {
  const response = await axios.put(`${API_URL}/${id}`, trufa);
  console.log(response)
  return response.data;
};

export const deleteTrufa = async (): Promise<Trufa[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};



export const atualizarQuantidade = async (  id: number,  operacao: "add" | "remove") => {
  if (!id) return [];

  try {
    const endpoint =
      operacao === "add"
        ? `${API_URL}/${id}/aumentar?quantidade=1`
        : `${API_URL}/${id}/diminuir?quantidade=1`;

        console.log(endpoint)
    const response = await axios.put(endpoint);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);    
  }
};
