import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const HomepageSearch = ({ term, onTermChange, type, onTypeChange }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <Picker
        selectedValue={type}
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => {
          onTypeChange(itemValue);
        }}
      >
        <Picker.Item label="Item" value="Item" />
        <Picker.Item label="Adhat" value="Adhat" />
        <Picker.Item label="Company" value="Company" />
        <Picker.Item label="Category" value="Category" />
        <Picker.Item label="Firm" value="Firm" />
        <Picker.Item label="Rate" value="Rate" />
        <Picker.Item label="Sub Category" value="SubCategory" />
      </Picker>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "#A0AAAA",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
  },
  pickerStyle: {
    flex: 4,
  },
  inputStyle: {
    flex: 6,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
export default HomepageSearch;
