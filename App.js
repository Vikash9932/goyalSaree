import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";

//import different Screens
import Home from "./components/Home";
import AddAdhat from "./components/AddAdhat";
import AddCategory from "./components/AddCategory";
import AddFirm from "./components/AddFirm";
import AddCompany from "./components/AddCompany";
import AddSubCategory from "./components/AddSubCategory";
import AddMasterData from "./components/AddMasterData";

let firebaseConfig = {
  apiKey: "AIzaSyDbNa3jcniq66sPKsbIBWljPa_CJSv7CVI",
  authDomain: "goyalsaree-99edd.firebaseapp.com",
  projectId: "goyalsaree-99edd",
  storageBucket: "goyalsaree-99edd.appspot.com",
  databaseURL: "https://goyalsaree-99edd-default-rtdb.firebaseio.com/",
  messagingSenderId: "294097089707",
  appId: "1:294097089707:web:87f19164c54a38cc9e33ee",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Goyal Saree" }}
        />
        <Stack.Screen name="AddAdhat" component={AddAdhat} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name="AddCompany" component={AddCompany} />
        <Stack.Screen name="AddFirm" component={AddFirm} />
        <Stack.Screen name="AddSubCategory" component={AddSubCategory} />
        <Stack.Screen name="AddMasterData" component={AddMasterData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
