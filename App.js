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

const Drawer = createDrawerNavigator();

const App1 = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={Homepage}>
        <Drawer.Screen name="Dashboard" component={AddAdhat} />
        <Drawer.Screen name="New Item" component={AddMasterData} />
        <Drawer.Screen name="New Adhat" component={AddAdhat} />
        <Drawer.Screen name="New Company" component={AddCompany} />
        <Drawer.Screen name="New Category" component={AddCategory} />
        <Drawer.Screen name="New Sub Category" component={AddSubCategory} />
        <Drawer.Screen name="New Firm" component={AddFirm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const navigator = createStackNavigator(
  {
    Dashboard: Homepage,
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
