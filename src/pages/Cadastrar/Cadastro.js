import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { adicionarLogin } from '../../../database/BaseDados';

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');

  const handleCadastro = () => {
    // Verifique se todos os campos estão preenchidos
    if (!email || !senha || !repetirSenha) {
      alert('Preencha todos os campos antes de cadastrar.');
      return;
    }
  
    // Verifique se as senhas coincidem
    if (senha !== repetirSenha) {
      alert('As senhas digitadas não coincidem.');
      return;
    }
  
    // Chame a função adicionarLogin para inserir o login no banco de dados
    adicionarLogin(email, senha, (id) => {
      if (id) {
        // Redirecione o usuário de volta à tela inicial após o cadastro
        alert('Login cadastrado com sucesso.');
        navigation.navigate('Home');
      } else {
        alert('Erro ao cadastrar o login. Tente novamente.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Faça o seu cadastro</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Senha"
          placeholderTextColor="#003f5c"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Repetir Senha"
          placeholderTextColor="#003f5c"
          secureTextEntry
          value={repetirSenha}
          onChangeText={setRepetirSenha}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleCadastro}>
        <Text style={styles.loginText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  SignBtn: {
    width: '80%',
    backgroundColor: '#ffff',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  signupText: {
    color: 'black',
  },
});

export default Cadastro;
