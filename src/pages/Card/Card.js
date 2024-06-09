import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dados das comidas
const categorias = [
  {
    id: 1,
    nome: 'Burguers',
    comidas: [
      {
        id: 1,
        nome: 'Combo fritas e refri',
        imagem: require('../../../assets/Lanche1.jpeg'),
        preco: 15.99,
      },
      {
        id: 2,
        nome: 'Hamburguer',
        imagem: require('../../../assets/Lanche2.jpeg'),
        preco: 10.99,
      },
    ],
  },
  {
    id: 2,
    nome: 'Fritas',
    comidas: [
      {
        id: 3,
        nome: 'Fritas com Ketchup',
        imagem: require('../../../assets/Lanche4.jpg'),
        preco: 8.99,
      },
      {
        id: 4,
        nome: 'Fritas',
        imagem: require('../../../assets/Fritas.jpg'),
        preco: 5.99,
      },
    ],
  },
  {
    id: 3,
    nome: 'Bebidas',
    comidas: [
      {
        id: 5,
        nome: 'Milkshake de ovomaltine',
        imagem: require('../../../assets/Shake1.jpg'),
        preco: 12.99,
      },
      {
        id: 6,
        nome: 'Milkshake de Morango',
        imagem: require('../../../assets/Shake2.jpg'),
        preco: 12.99,
      },
    ],
  },
];

const Cardapio = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const { navigate } = useNavigation(); // Inicialize o hook useNavigation

  const toggleModal = (comida) => {
    setSelectedFood(comida);
    setModalVisible(!modalVisible);
  };
<TouchableOpacity onPress={() => addToCart(comida)} style={styles.cartButton}>
  <Image source={require('../../../assets/Carrinho.png')} style={styles.cartIcon} />
</TouchableOpacity>

const addToCart = async (comida) => {
  try {
    // Adicione a lógica para adicionar a comida selecionada ao carrinho aqui
    const produtosCarrinho = await AsyncStorage.getItem('produtosCarrinho');
    let carrinho = [];
    if (produtosCarrinho) {
      carrinho = JSON.parse(produtosCarrinho);
    }
    carrinho.push(comida);
    await AsyncStorage.setItem('produtosCarrinho', JSON.stringify(carrinho));
    setModalVisible(false); // Feche o modal após adicionar ao carrinho
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
  }
};
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Carrinho')} style={styles.cartButton}>
          <Image source={require('../../../assets/Carrinho.png')} style={styles.cartIcon} />
        </TouchableOpacity>
        <Image source={require('../../../assets/Burger.jpeg')} style={styles.coverImage} />
        <Text style={styles.sectionTitle}>Categorias de Comida</Text>
        <Text style={styles.sectionTitle}>----------------------------</Text>

        {categorias.map((categoria) => (
          <View key={categoria.id}>
            <Text style={styles.sectionTitle}>{categoria.nome}</Text>
            <View style={styles.categoryContainer}>
              {categoria.comidas.map((comida) => (
                <View key={comida.id} style={styles.category}>
                  <Image source={comida.imagem} style={styles.categoryImage} />
                  <Text style={styles.categoryTitle}>{comida.nome}</Text>
                  <Text style={styles.categoryPrice}>R$ {comida.preco.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => toggleModal(comida)} style={styles.cartButton}>
                    <Image source={require('../../../assets/Carrinho.png')} style={styles.cartIcon} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Adicionado ao carrinho:</Text>
              <Text style={styles.modalText}>{selectedFood?.nome}</Text>
              <Text style={styles.modalText}>Preço: R$ {selectedFood?.preco.toFixed(2)}</Text>
              <Button title="Adicionar ao carrinho" onPress={addToCart} />
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  category: {
    width: '50%',
    marginBottom: 20,
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 10,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryPrice: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  cartButton: {
    position: 'absolute',
    top: 200,
    right: 5,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Cardapio;
