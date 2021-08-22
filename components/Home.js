import React from "react";
import { Text, View, Button, Linking } from "react-native";

import Homepage from "./Homepage";
const Home = (props) => {
  const navigation = props.navigation;
  return (
    <>
      <View>
        <Text
          onPress={() => {
            Linking.openURL("http://www.goyalsaree.com").catch((err) =>
              console.error("An error occurred in Opening goyalsaree.com", err)
            );
          }}
        >
          Goyal Saree
        </Text>

        <Button
          title="Add Adhat"
          onPress={() => {
            navigation.navigate("AddAdhat");
          }}
        />
        <Button
          title="Add Category"
          onPress={() => {
            navigation.navigate("AddCategory");
          }}
        />
        <Button
          title="Add Company"
          onPress={() => {
            navigation.navigate("AddCompany");
          }}
        />
        <Button
          title="Add Firm"
          onPress={() => {
            navigation.navigate("AddFirm");
          }}
        />

        <Button
          title="Add Sub Category"
          onPress={() => {
            navigation.navigate("AddSubCategory");
          }}
        />
        <Button
          title="Add Master Data"
          onPress={() => {
            navigation.navigate("AddMasterData");
          }}
        />
      </View>
      <Homepage />
    </>
  );
};

export default Home;
