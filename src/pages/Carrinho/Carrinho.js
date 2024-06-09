import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const Carrinho = ({ navigation }) => {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Combo fritas e refri', preco: 15.99 },
    { id: 2, nome: 'Hambuerguer', preco: 10.99 },
  ]);

  const removerProduto = async (id) => {
    // Simulando uma operação assíncrona de remoção
    // Normalmente, você faria uma chamada para o backend aqui
    // Espera 1 segundo antes de remover o produto
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  const adicionarProduto = async (produto) => {
    // Simulando uma operação assíncrona de adição
    // Normalmente, você faria uma chamada para o backend aqui
    // Espera 1 segundo antes de adicionar o produto
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProdutos([...produtos, produto]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Carrinho</Text>
        <Text style={styles.sectionTitle}>----------------------------</Text>

        {produtos.map((produto) => (
          <View key={produto.id} style={styles.produtoContainer}>
            <Text style={styles.produtoNome}>{produto.nome}</Text>
            <Text style={styles.produtoPreco}>R$ {produto.preco.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removerProduto(produto.id)} style={styles.deleteButton}>
              <Image source={require('../../../assets/Delete.png')} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        ))}

        {produtos.length === 0 && <Text style={styles.emptyCartText}>Carrinho vazio</Text>}

        {/* Botão para voltar ao cardápio */}
        <TouchableOpacity onPress={() => navigation.navigate('Cardapio')} style={styles.button}>
          <Text style={styles.buttonText}>Voltar ao Cardápio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  produtoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  produtoNome: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  produtoPreco: {
    fontSize: 14,
    color: '#fff',
  },
  deleteButton: {
    padding: 5,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  emptyCartText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Carrinho;