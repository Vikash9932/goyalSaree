import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  Picker,
  StyleSheet,
  Text,
  View,
} from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";
// import DatePicker from "react-native-datepicker";
import { CheckBox } from "react-native-elements";
import ViewData from "../components/ViewData";
// import styles from "./Styles"
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
  const [date, setDate] = useState(null);
  const [sold, setSold] = useState(false);

  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [adhatData, setAdhatData] = useState([]);
  const [firmData, setFirmData] = useState([]);
  const [data, setData] = useState([]);
  const [comapny, setComapny] = useState("");
  // console.log("Date", date);
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddButton = () => {
    // if (
    //   !adhat |
    //   !category |
    //   !company |
    //   !firm |
    //   !subCategory |
    //   !quantity |
    //   !item |
    //   !rate |
    //   !purchaseRate
    // ) {
    //   alert("Fill Empty Fields, please!");
    // }
    // else if (
    //   subCategoryData &&
    //   subCategoryData.find((o) => o.name === subCategoryName)
    // ) {
    //   alert("Duplicate Entry");
    // }
    // else {
    try {
      firebase.database().ref("MasterData/").push({
        item,
        rate,
        purchaseRate,
        quantity,
        adhat,
        category,
        company,
        firm,
        subCategory,
        // date,
        sold,
      });
      console.log("data pushed successfully");
      handleClearButton();
    } catch (error) {
      console.log("Insertion Error", error);
    }
    // }
  };

  const fetchData = () => {
    try {
      firebase
        .database()
        .ref("Data/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            setData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
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
    // setDate(new Date());
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

      <ViewData
        type="Category"
        data={data}
        value={category}
        setValue={setCategory}
      />

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

      <ViewData
        type="Company"
        data={data}
        value={company}
        setValue={setCompany}
      />

      <ViewData type="Adhat" data={data} value={adhat} setValue={setAdhat} />

      <ViewData type="Firm" data={data} value={firm} setValue={setFirm} />

      <ViewData
        type="SubCategory"
        data={data}
        value={subCategory}
        setValue={setSubCategory}
      />

      {/* <Date date={date} onDateChange={setDate} /> */}
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
          sty
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
