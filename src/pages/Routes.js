import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home/index'; // Caminho correto para o Home.js
import Cardapio from './Card/Card'; // Caminho correto para o Card.js
import Carrinho from './Carrinho/Carrinho'; // Caminho correto para o Carrinho.js

const Stack = createStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cardapio" component={Cardapio} />
      <Stack.Screen name="Carrinho" component={Carrinho} />
    </Stack.Navigator>
  );
}