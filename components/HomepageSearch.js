import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'

const dropdownValues = ['Item', "Adhat", 'Company', 'Category', 'Firm', 'Rate', 'SubCategory']
const HomepageSearch = ({ term, onTermChange, type, onTypeChange }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <SelectDropdown
        renderDropdownIcon={() => <AntDesign name="down" size={24} color="black" />}
        defaultValueByIndex={0}
        buttonStyle={styles.pickerStyle}
        buttonTextStyle={styles.pickerStyle1}
        data={dropdownValues}
        onSelect={(selectedItem, index) => {
          onTypeChange(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
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
    flex: 6,
    // fontSize: 40
    backgroundColor: '#A0AAAA',
  },
  pickerStyle1: {
    fontSize: 20
  },
  inputStyle: {
    flex: 6,
    fontSize: 20,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginHorizontal: 15,
    marginRight: 0,
  },
});
export default HomepageSearch;
