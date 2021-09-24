import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import HomepageTable from "../components/HomepageTable";
import HomepageSearch from "../components/HomepageSearch";

import firebase from "firebase/app";
const auth = firebase.auth();
const Homepage = ({ navigation }) => {
  const [term, setTerm] = React.useState("");
  const [type, setType] = React.useState("Item");
  const { user } = React.useContext(AuthenticatedUserContext);
  const [searchBarVisibility, setSearchBarVisibility] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setSearchBarVisibility(!searchBarVisibility)}
        >
          <Feather name="search" size={25} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, searchBarVisibility]);
  console.log("user", user.email, user.uid);
  return (
    <View style={styles.container}>
      {searchBarVisibility && (
        <HomepageSearch
          term={term}
          onTermChange={(newTerm) => setTerm(newTerm)}
          type={type}
          onTypeChange={(newType) => setType(newType)}
        />
      )}
      <HomepageTable
        searchedTerm={term}
        searchedType={type}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Homepage;
