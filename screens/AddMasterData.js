import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, Alert } from "react-native";
import db from "../firebase.config";
// import DatePicker from "react-native-date-picker";
import { CheckBox } from "react-native-elements";
import ViewData from "../components/ViewData";
import MyButton from "../components/MyButton";

const AddMasterData = ({ navigation }) => {
  const [quantity, setQuantity] = useState();
  const [item, setItem] = useState("");
  const [rate, setRate] = useState();
  const [purchaseRate, setPurchaseRate] = useState();
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("null");
  const [adhat, setAdhat] = useState("");
  const [firm, setFirm] = useState("");
  const [date, setDate] = useState("");
  const [sold, setSold] = useState(false);
  // console.log("Date", date);

  const handleAddButton = () => {
    if (
      !adhat ||
      !category ||
      !company ||
      !firm ||
      !quantity ||
      !item ||
      !rate ||
      !purchaseRate
    ) {
      Alert.alert("Fill Empty Fields, please!");
    } else {
      try {
        db.collection("Master Data").add({
          Item: item,
          Rate: rate,
          PurchaseRate: purchaseRate,
          Quantity: quantity,
          Adhat: adhat,
          Category: category,
          Company: company,
          Firm: firm,
          SubCategory: subCategory,
          Date: date,
          Sold: sold,
        });
        Alert.alert("Item Inserted");
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
  };

  const handleClearButton = () => {
    setQuantity();
    setItem("");
    setRate();
    setPurchaseRate();
    setCompany("");
    setCategory("");
    setSubCategory("null");
    setAdhat("");
    setFirm("");
    setDate("");
  };

  return (
    <>
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Product Name</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setItem(text)}
          defaultValue={item}
          placeholder="Product Name"
        />
      </View>

      <ViewData type="Category" value={category} setValue={setCategory} />

      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Product Rate</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setRate(text)}
          defaultValue={rate}
          placeholder="Product Rate"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Purchase Price</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setPurchaseRate(text)}
          defaultValue={purchaseRate}
          placeholder="Purchase Price"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Product Quantity</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setQuantity(text)}
          defaultValue={quantity}
          placeholder="Product Quantity"
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Date</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setDate(text)}
          defaultValue={date}
          placeholder="Date"
          keyboardType="number-pad"
        />
      </View>

      <ViewData type="Company" value={company} setValue={setCompany} />

      <ViewData type="Adhat" value={adhat} setValue={setAdhat} />

      <ViewData type="Firm" value={firm} setValue={setFirm} />

      <ViewData
        type="SubCategory"
        value={subCategory}
        setValue={setSubCategory}
      />

      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Sold Out</Text>
        <CheckBox
          style={styles.checkboxStyle}
          checked={sold}
          onPress={() => setSold(!sold)}
        />
      </View>
      <View style={styles.viewButtonStyle}>
        <MyButton
          title="Add"
          style1={styles.buttonStyle1}
          style2={styles.buttonStyle2}
          onPress={handleAddButton}
        />
        <MyButton
          title="Clear"
          style1={styles.buttonStyle1}
          style2={styles.buttonStyle2}
          onPress={handleClearButton}
        />
      </View>
    </>
  );
};

AddMasterData.navigationOptions = () => {
  return {
    title: "New Item",
  };
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFDDDD",
    margin: 10,
    height: 50,
    borderRadius: 5,
    marginBottom: 0,
  },
  textStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    flex: 3,
    height: "100%",
  },
  textInputStyle: {
    fontSize: 18,
    flex: 7,
  },
  checkboxStyle: {},
  viewButtonStyle: {
    flexDirection: "row",
    margin: 10,
    height: 50,
  },
  buttonStyle1: {
    backgroundColor: "#0000ff",
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  buttonStyle2: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default AddMasterData;
