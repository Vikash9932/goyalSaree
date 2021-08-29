import React from "react";
import {
  Button,
  TextInput,
  Picker,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MyButton from "./MyButton";

const ViewData = ({ type, data, value, setValue, navigation }) => {
  const typeData = data.filter((i) => i[type]);
  //   console.log("typeData", typeData);
  return (
    <View style={styles.viewParentStyle}>
      <View style={styles.viewStyle1}>
        <Text style={styles.textStyle}>{type}</Text>
      </View>
      <View style={styles.viewStyle2}>
        <Picker
          selectedValue={value}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
        >
          <Picker.Item label="Select" />
          {typeData.map((item) => {
            return (
              <Picker.Item
                key={item[type]}
                label={item[type]}
                value={item[type]}
              />
            );
          })}
        </Picker>
      </View>
      {/* <View style={styles.viewStyle3}> */}
      <MyButton
        style1={styles.viewStyle3}
        style2={styles.buttonStyle}
        onPress={() => navigation.navigate(`${type}`)}
        title="New"
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewParentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    height: 50,
    borderRadius: 5,
  },
  viewStyle1: {
    flex: 3,
    backgroundColor: "#28cf02",
    borderRadius: 5,
  },
  viewStyle2: {
    backgroundColor: "#e6841c",
    flex: 5,
    borderRadius: 5,
  },
  viewStyle3: {
    borderRadius: 5,
    flex: 2,
    backgroundColor: "#0000ff",
  },
  textStyle: {
    color: "#1c1ce6",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    paddingTop: "10%",
  },
  pickerStyle: {
    fontSize: 16,
    fontWeight: "900",
  },
  buttonStyle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    paddingTop: "10%",
  },
});

export default ViewData;
