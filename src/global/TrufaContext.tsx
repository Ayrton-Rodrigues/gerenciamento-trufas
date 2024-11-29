import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trufa } from '../types/Trufa';

interface TrufaContextType {
  trufas: Trufa[];
  setTrufas: React.Dispatch<React.SetStateAction<Trufa[]>>;
  atualizarQuantidade: (id: number, operacao: "add" | "remove") => void;
}

const TrufaContext = createContext<TrufaContextType | undefined>(undefined);

export const TrufaProvider = ({ children }: { children: ReactNode }) => {
  const [trufas, setTrufas] = useState<Trufa[]>([]);

  const atualizarQuantidade = (id: number, operacao: "add" | "remove") => {
    setTrufas((prevTrufas) =>
      prevTrufas.map((trufa) =>
        trufa.id === id
          ? {
              ...trufa,
              quantidade: operacao === "add" ? trufa.quantidade + 1 : trufa.quantidade - 1,
            }
          : trufa
      )
    );
  };

  return (
    <TrufaContext.Provider value={{ trufas, setTrufas, atualizarQuantidade }}>
      {children}
    </TrufaContext.Provider>
  );
};

export const useTrufas = (): TrufaContextType => {
  const context = useContext(TrufaContext);
  if (!context) {
    throw new Error('useTrufas must be used within a TrufaProvider');
  }
  return context;
};
