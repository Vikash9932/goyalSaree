import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { LogBox } from "react-native";

//import different Screens
import AddAdhat from "./screens/AddAdhat";
import AddMasterData from "./screens/AddMasterData";
import Homepage from "./screens/Homepage";
import AddCompany from "./screens/AddCompany";
import AddFirm from "./screens/AddFirm";
import AddCategory from "./screens/AddCategory";
import AddSubCategory from "./screens/AddSubCategory";

const Stack = createNativeStackNavigator();

const App1 = () => {
  // React.useEffect(() => {
  //   LogBox.ignoreLogs(true);
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Homepage}
          options={{ title: "Goyal Saree" }}
        />
        <Stack.Screen name="MasterData" component={AddMasterData} />
        <Stack.Screen name="Adhat" component={AddAdhat} />
        <Stack.Screen name="Category" component={AddCategory} />
        <Stack.Screen name="Company" component={AddCompany} />
        <Stack.Screen name="Firm" component={AddFirm} />
        <Stack.Screen name="SubCategory" component={AddSubCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default App;

import Routes from "./navigation/index";

export default function App() {
  return <Routes />;
}
