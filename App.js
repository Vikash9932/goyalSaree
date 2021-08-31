import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//import different Screens
import AddAdhat from "./screens/AddAdhat";
import AddMasterData from "./screens/AddMasterData";
import Homepage from "./screens/Homepage";
import AddCompany from "./screens/AddCompany";
import AddFirm from "./screens/AddFirm";
import AddCategory from "./screens/AddCategory";
import AddSubCategory from "./screens/AddSubCategory";
import AddData from "./components/AddData";

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
/*
const Stack = createStackNavigator();

const App1 = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Homepage}>
        <Stack.Screen
          name="Dashboard"
          component={Homepage}
          options={{ title: "Goyal Saree" }}
        />
        <Stack.Screen name="NewData" component={AddData} />
        <Stack.Screen name="MasterData" component={AddMasterData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
*/
const navigator = createStackNavigator(
  {
    Dashboard: Homepage,
    MasterData: AddMasterData,
    Adhat: AddAdhat,
    Category: AddCategory,
    Company: AddCompany,
    Firm: AddFirm,
    SubCategory: AddSubCategory,
    MasterData: AddMasterData,
  },
  {
    initialRouteName: "Dashboard",
    defaultNavigationOptions: {
      title: "Goyal Saree",
    },
  }
);

export default createAppContainer(navigator);
// export default App;

/* Trash
    Adhat: AddAdhat,
    Category: AddCategory,
    Company: AddCompany,
    Firm: AddFirm,
    SubCategory: AddSubCategory,
    MasterData: AddMasterData,

*/
