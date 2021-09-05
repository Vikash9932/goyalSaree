import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import HomepageTable from "../components/HomepageTable";
import HomepageSearch from "../components/HomepageSearch";

const Homepage = ({ navigation }) => {
  const [term, setTerm] = useState("");

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

Homepage.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("MasterData")}>
        <Feather name="plus" size={30} style={{ marginRight: 20 }} />
      </TouchableOpacity>
    ),
  };
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
