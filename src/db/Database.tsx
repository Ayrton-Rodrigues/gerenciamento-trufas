import * as SQLite from 'expo-sqlite';

const insertTrufas = async () => {
  const db = await SQLite.openDatabaseAsync('trufas.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS trufas (
      id INTEGER PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL,
      disponivel BOOLEAN NOT NULL
    );
  `);

  await db.execAsync(`
    INSERT INTO trufas (id, nome, descricao, preco, quantidade, disponivel) VALUES
    (1, 'Trufa de Chocolate ao Leite', 'Deliciosa trufa feita com chocolate ao leite de alta qualidade.', 3.5, 100, 1),
    (2, 'Trufa de Brigadeiro', 'Trufa recheada com brigadeiro cremoso e coberta de granulado.', 4.0, 50, 1),
    (3, 'Trufa de Limão Siciliano', 'Trufa refrescante com recheio de limão siciliano.', 4.5, 30, 1),
    (4, 'Trufa de Café', 'Trufa com sabor marcante de café, ideal para amantes de café.', 4.0, 25, 0),
    (5, 'Trufa de Maracujá', 'Trufa recheada com creme de maracujá e cobertura de chocolate branco.', 4.5, 40, 1);
  `);

  console.log('Dados de trufas inseridos com sucesso!');
};

insertTrufas();

