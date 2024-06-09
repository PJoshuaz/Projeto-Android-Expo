import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para adicionar um login
const adicionarLogin = async (email, senha, callback) => {
  try {
    const logins = JSON.parse(await AsyncStorage.getItem('logins')) || [];
    const id = logins.length > 0 ? logins[logins.length - 1].id + 1 : 1;
    const novoLogin = { id, email, senha };
    logins.push(novoLogin);
    await AsyncStorage.setItem('logins', JSON.stringify(logins));
    callback(id);
  } catch (error) {
    console.error('Erro ao adicionar login:', error);
    callback(null);
  }
};

// Função para listar todos os logins
const listarLogins = async (callback) => {
  try {
    const logins = JSON.parse(await AsyncStorage.getItem('logins')) || [];
    callback(logins);
  } catch (error) {
    console.error('Erro ao listar logins:', error);
    callback([]);
  }
};

// Função para encontrar um login pelo email
const encontrarLoginPorEmail = async (email, callback) => {
  try {
    const logins = JSON.parse(await AsyncStorage.getItem('logins')) || [];
    const login = logins.find(login => login.email === email);
    callback(login || null);
  } catch (error) {
    console.error('Erro ao encontrar login por email:', error);
    callback(null);
  }
};

// Função para alterar um login
const alterarLogin = async (id, email, senha, callback) => {
  try {
    const logins = JSON.parse(await AsyncStorage.getItem('logins')) || [];
    const index = logins.findIndex(login => login.id === id);
    if (index !== -1) {
      logins[index] = { id, email, senha };
      await AsyncStorage.setItem('logins', JSON.stringify(logins));
      callback(1);
    } else {
      callback(0);
    }
  } catch (error) {
    console.error('Erro ao alterar login:', error);
    callback(0);
  }
};

// Função para excluir um login
const excluirLogin = async (id, callback) => {
  try {
    const logins = JSON.parse(await AsyncStorage.getItem('logins')) || [];
    const novoLogins = logins.filter(login => login.id !== id);
    await AsyncStorage.setItem('logins', JSON.stringify(novoLogins));
    callback(1);
  } catch (error) {
    console.error('Erro ao excluir login:', error);
    callback(0);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export { adicionarLogin, listarLogins, alterarLogin, encontrarLoginPorEmail, excluirLogin };
