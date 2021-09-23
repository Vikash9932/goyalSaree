import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import HomepageTable from "../components/HomepageTable";
import HomepageSearch from "../components/HomepageSearch";

import firebase from "firebase/app";
const auth = firebase.auth();
const Homepage = ({ navigation }) => {
  const [term, setTerm] = React.useState("");
  const { user } = React.useContext(AuthenticatedUserContext);

  const handleSignOutYes = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    Alert.alert("Logout? So soon?", `${user.email}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: handleSignOutYes },
    ]);
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("MasterData")}>
            <Feather name="plus" size={30} style={{ marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut}>
            <Feather name="log-out" size={30} />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation]);
  console.log("user", user.email, user.uid);
  return (
    <View style={styles.container}>
      <HomepageSearch
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
      />
      <HomepageTable searchedTerm={term} navigation={navigation} />
    </View>
  );
};

// Homepage.navigationOptions = ({ navigation }) => {
//   return {
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate("MasterData")}>
//         <Feather name="plus" size={30} style={{ marginRight: 20 }} />
//       </TouchableOpacity>
//     ),
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Homepage;
