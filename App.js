import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { LogBox } from "react-native";

//import different Screens
import AddAdhat from "./screens/AddAdhat";
import AddMasterData from "./screens/AddMasterData";
import Homepage from "./screens/Homepage";
import AddCompany from "./screens/AddCompany";
import AddFirm from "./screens/AddFirm";
import AddCategory from "./screens/AddCategory";
import AddSubCategory from "./screens/AddSubCategory";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

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
