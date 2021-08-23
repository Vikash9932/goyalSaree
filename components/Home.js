import React from "react";
import { Text, View, Button, Linking } from "react-native";

const Home = (props) => {
  const navigation = props.navigation;
  return (
    <>
      <View>
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
    </>
  );
};

export default Home;
