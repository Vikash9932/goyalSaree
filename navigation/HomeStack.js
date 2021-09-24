import React from "react";
// import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import HomeScreen from "../screens/HomeScreen";
import AddAdhat from "../screens/AddAdhat";
import AddMasterData from "../screens/AddMasterData";
import Homepage from "../screens/Homepage";
import AddCompany from "../screens/AddCompany";
import AddFirm from "../screens/AddFirm";
import AddCategory from "../screens/AddCategory";
import AddSubCategory from "../screens/AddSubCategory";
import Logout from "../screens/Logout";
import AboutUs from "../screens/AboutUs";
// const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function HomeStack() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen
        name="Dashboard"
        component={Homepage}
        // options={{ title: "Goyal Saree" }}
      />
      <Drawer.Screen
        name="MasterData"
        component={AddMasterData}
        options={{ title: "New Item" }}
      />
      <Drawer.Screen
        name="Adhat"
        component={AddAdhat}
        options={{ title: "New Adhat" }}
      />
      <Drawer.Screen
        name="Category"
        component={AddCategory}
        options={{ title: "New Category" }}
      />
      <Drawer.Screen
        name="Company"
        component={AddCompany}
        options={{ title: "New Company" }}
      />
      <Drawer.Screen
        name="Firm"
        component={AddFirm}
        options={{ title: "New Firm" }}
      />
      <Drawer.Screen
        name="SubCategory"
        component={AddSubCategory}
        options={{ title: "New Sub Category" }}
      />
      <Drawer.Screen name="About Us" component={AboutUs} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
