import React, { useEffect, useState } from "react";
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
  const [subCategory, setSubCategory] = useState("");
  const [adhat, setAdhat] = useState("");
  const [firm, setFirm] = useState("");
  const [date, setDate] = useState("");
  const [sold, setSold] = useState(false);
  const [masterData, setMasterData] = useState([]);
  // console.log("Date", date);

  useEffect(() => {
    const itemParam = navigation.getParam("Item");
    if (itemParam) {
      let {
        Adhat,
        Item,
        Rate,
        Firm,
        Company,
        Quantity,
        Category,
        SubCategory,
        PurchaseRate,
        Date,
        Sold,
      } = navigation.state.params;
      setQuantity(Quantity.toString());
      setItem(Item);
      setRate(Rate.toString());
      setPurchaseRate(PurchaseRate.toString());
      setCompany(Company);
      setCategory(Category);
      setSubCategory(SubCategory);
      setAdhat(Adhat);
      setFirm(Firm);
      setDate(Date);
      setSold(Sold);
    }
  }, []);

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    const response = db.collection("Master Data");
    const data = await response.get();
    let tempData = [];
    data.docs.forEach((item) => {
      tempData = [...tempData, item.data()];
    });
    setMasterData(tempData);
  };

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
    } else if (
      masterData &&
      masterData.find((o) => o.Item.toLowerCase() === item.toLowerCase())
    ) {
      Alert.alert("Item already exists");
    } else {
      try {
        db.collection("Master Data").add({
          Item: item,
          Rate: Number(rate),
          PurchaseRate: Number(purchaseRate),
          Quantity: Number(quantity),
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
    setSubCategory("");
    setAdhat("");
    setFirm("");
    setDate("");
    setSold(false);
  };

  const handleDeleteButton = () => {
    Alert.alert("Are your sure?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => deleteYes() },
    ]);
  };

  const deleteYes = () => {
    db.collection("Master Data")
      .where("Item", "==", item)
      .where("Quantity", "==", Number(quantity))
      .where("Rate", "==", Number(rate))
      .where("PurchaseRate", "==", Number(purchaseRate))
      .where("Company", "==", company)
      .where("Category", "==", category)
      .where("Adhat", "==", adhat)
      .where("Firm", "==", firm)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
        Alert.alert("Item Deleted");
        navigation.navigate("Dashboard");
      })
      .catch((err) => {
        console.log("error while deleting", err);
        Alert.alert("Nothing Deleted");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle}>Product Name</Text>
        </View>
        <View style={styles.viewStyle2}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setItem(text)}
            defaultValue={item}
          />
        </View>
      </View>

      <ViewData type="Category" value={category} setValue={setCategory} />

      <View style={styles.viewStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle}>Product Rate</Text>
        </View>
        <View style={styles.viewStyle2}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setRate(text)}
            defaultValue={rate}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.viewStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle}>Purchase Price</Text>
        </View>
        <View style={styles.viewStyle2}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setPurchaseRate(text)}
            defaultValue={purchaseRate}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.viewStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle}>Product Quantity</Text>
        </View>
        <View style={styles.viewStyle2}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setQuantity(text)}
            defaultValue={quantity}
            keyboardType="number-pad"
          />
        </View>
      </View>

      <View style={styles.viewStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle}>Date</Text>
        </View>
        <View style={styles.viewStyle2}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setDate(text)}
            defaultValue={date}
            keyboardType="number-pad"
          />
        </View>
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
        <MyButton
          title="Delete"
          style1={styles.buttonStyle1}
          style2={styles.buttonStyle2}
          onPress={handleDeleteButton}
        />
      </View>
    </View>
  );
};

AddMasterData.navigationOptions = () => {
  return {
    title: "New Item",
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    flex: 1,
  },
  viewStyle: {
    flexDirection: "row",
    backgroundColor: "#666",
    margin: 10,
    height: 50,
    borderRadius: 5,
    marginBottom: 0,
  },
  viewStyle1: {
    flex: 3,
    borderRadius: 5,
    backgroundColor: "#666",
  },
  viewStyle2: {
    flex: 7,
    borderRadius: 5,
    backgroundColor: "#AAA",
  },
  textStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    flex: 3,
    height: "100%",
    color: "white",
  },
  textInputStyle: {
    fontSize: 18,
    flex: 7,
    paddingLeft: 10,
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
