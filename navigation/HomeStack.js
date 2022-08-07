import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from "../screens/HomeScreen";
import AddAdhat from '../screens/AddAdhat';
import AddMasterData from '../screens/AddMasterData';
import Homepage from '../screens/Homepage';
import AddCompany from '../screens/AddCompany';
import AddFirm from '../screens/AddFirm';
import AddCategory from '../screens/AddCategory';
import AddSubCategory from '../screens/AddSubCategory';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen
        name='Dashboard'
        component={Homepage}
        options={{ title: 'Goyal Saree' }}
      />
      <Stack.Screen name='MasterData' component={AddMasterData} />
      <Stack.Screen name='Adhat' component={AddAdhat} />
      <Stack.Screen name='Category' component={AddCategory} />
      <Stack.Screen name='Company' component={AddCompany} />
      <Stack.Screen name='Firm' component={AddFirm} />
      <Stack.Screen name='SubCategory' component={AddSubCategory} />
    </Stack.Navigator>
  );
}
