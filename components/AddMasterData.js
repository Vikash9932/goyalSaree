import React, { useState, useEffect } from "react";
import { Button, TextInput, Picker } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import { CheckBox } from "react-native-elements";

// import styles from "./Styles"

const AddMasterData = () => {
  const [quantity, setQuantity] = useState();
  const [item, setItem] = useState("");
  const [rate, setRate] = useState();
  const [purchaseRate, setPurchaseRate] = useState();
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [adhat, setAdhat] = useState("");
  const [firm, setFirm] = useState("");
  const [date, setDate] = useState(new Date());
  const [sold, setSold] = useState(false);

  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [adhatData, setAdhatData] = useState([]);
  const [firmData, setFirmData] = useState([]);

  useEffect(() => {
    fetchAdhatData();
    fetchCategoryData();
    fetchSubCategoryData();
    fetchFirmData();
    fetchCompanyData();
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
        date,
        sold,
      });
      console.log("data pushed successfully");
      handleClearButton();
    } catch (error) {
      console.log("Insertion Error", error);
    }
    // }
  };

  const fetchAdhatData = () => {
    try {
      firebase
        .database()
        .ref("Adhat/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Adhat Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched Adhat Data Array:", fetchedDataArray);
            setAdhatData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryData = () => {
    try {
      firebase
        .database()
        .ref("Category/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Category Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched Category Data Array:", fetchedDataArray);
            setCategoryData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompanyData = () => {
    try {
      firebase
        .database()
        .ref("Company/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Company Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched Company Data Array:", fetchedDataArray);
            setCompanyData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFirmData = () => {
    try {
      firebase
        .database()
        .ref("Firm/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Firm Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched Firm Data Array:", fetchedDataArray);
            setFirmData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategoryData = () => {
    try {
      firebase
        .database()
        .ref("SubCategory/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of SubCategory Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched SubCategory Data Array:", fetchedDataArray);
            setSubCategoryData(fetchedDataArray);
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
    setSubCategory("");
    setAdhat("");
    setFirm("");
    setDate(new Date());
  };

  return (
    <>
      <TextInput
        // style={styles.input}
        onChangeText={(text) => setItem(text)}
        defaultValue={item}
        placeholder="Product Name"
      />
      Category
      {/*Category data*/}
      <Picker
        selectedValue={category}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Select An Option" />
        {categoryData.map((item) => {
          return (
            <Picker.Item key={item.name} label={item.name} value={item.name} />
          );
        })}
      </Picker>
      <TextInput
        // style={styles.input}
        onChangeText={(text) => setRate(text)}
        defaultValue={rate}
        placeholder="Produt Rate"
        keyboardType="number-pad"
      />
      <TextInput
        // style={styles.input}
        onChangeText={(text) => setPurchaseRate(text)}
        defaultValue={purchaseRate}
        placeholder="Purchase Price"
        keyboardType="number-pad"
      />
      <TextInput
        // style={styles.input}
        onChangeText={(text) => setQuantity(text)}
        defaultValue={quantity}
        placeholder="Product Quantity"
        keyboardType="number-pad"
      />
      Company
      {/*Company data*/}
      <Picker
        selectedValue={company}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setCompany(itemValue)}
      >
        <Picker.Item label="Select An Option" />
        {companyData.map((item) => {
          return (
            <Picker.Item key={item.name} label={item.name} value={item.name} />
          );
        })}
      </Picker>
      Adhat
      {/*Adhat data*/}
      <Picker
        selectedValue={adhat}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setAdhat(itemValue)}
      >
        <Picker.Item label="Select An Option" />
        {adhatData.map((item) => {
          return (
            <Picker.Item key={item.name} label={item.name} value={item.name} />
          );
        })}
      </Picker>
      Firm
      {/*Firm data*/}
      <Picker
        selectedValue={firm}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setFirm(itemValue)}
      >
        <Picker.Item label="Select An Option" />
        {firmData.map((item) => {
          return (
            <Picker.Item key={item.name} label={item.name} value={item.name} />
          );
        })}
      </Picker>
      Sub Category
      {/*SubCategory data*/}
      <Picker
        selectedValue={subCategory}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSubCategory(itemValue)}
      >
        <Picker.Item label="Select An Option" />
        {subCategoryData.map((item) => {
          return (
            <Picker.Item key={item.name} label={item.name} value={item.name} />
          );
        })}
      </Picker>
      <DatePicker date={date} onDateChange={setDate} />
      <CheckBox
        title="Sold Out"
        checked={sold}
        onPress={() => setSold(!sold)}
      />
      <Button title="Add" onPress={handleAddButton} />
      <Button title="Clear" onPress={handleClearButton} />
    </>
  );
};

export default AddMasterData;
