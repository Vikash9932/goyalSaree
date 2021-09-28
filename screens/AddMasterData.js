import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, Alert } from "react-native";
import { db } from "../firebase.config";
// import DatePicker from "react-native-date-picker";
import { CheckBox } from "react-native-elements";
import ViewData from "../components/ViewData";
import MyButton from "../components/MyButton";
import DatePicker from "../components/DatePicker";

const AddMasterData = ({ route, navigation }) => {
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
  const [editFlag, setEditFlag] = useState(false);
  const [id, setId] = useState("");
  // const navigation = navigation;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Item",
    });
  });

  useEffect(() => {
    if (route.params) {
      console.log("Item id", route.params.itemId);
      setEditFlag(true);
      setId(route.params.itemId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      console.log("Id to be updated: ", id);
      fetchMasterData();
    }
  }, [id]);

  const fetchMasterData = () => {
    db.collection("Master Data")
      .doc(id)
      .get()
      .then((doc) => {
        console.log("fetched data", doc.data());
        let fetchedData = doc.data();
        setQuantity(fetchedData.Quantity.toString());
        setItem(fetchedData.Item);
        setRate(fetchedData.Rate.toString());
        setPurchaseRate(fetchedData.PurchaseRate.toString());
        setCompany(fetchedData.Company);
        setCategory(fetchedData.Category);
        setSubCategory(fetchedData.SubCategory);
        setAdhat(fetchedData.Adhat);
        setFirm(fetchedData.Firm);
        setDate(fetchedData.Date);
        setSold(fetchedData.Sold);
      })
      .catch((err) => {
        console.log("error while fetching", err);
        Alert.alert("Nothing Fetched");
      });
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

  const handleUpdateButton = () => {
    db.collection("Master Data")
      .doc(id)
      .set({
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
      })
      .then(() => {
        Alert.alert("Item Updated");
      })
      .catch((error) => {
        console.log("Error updating document: ", error);
        Alert.alert("Nothing updated");
      });
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
    console.log("ID in Delete", id);
    db.collection("Master Data")
      .doc(id)
      .delete()
      .then(() => {
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

      <ViewData
        type="Category"
        value={category}
        setValue={setCategory}
        navigation={navigation}
      />

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
          <Text style={styles.textStyle}>Date</Text>
        </View>
        <View style={styles.viewStyle2}>
          <DatePicker date={date} setDate={setDate} />
        </View>
      </View>

      <ViewData
        type="Company"
        value={company}
        setValue={setCompany}
        navigation={navigation}
      />

      <ViewData
        type="Adhat"
        value={adhat}
        setValue={setAdhat}
        navigation={navigation}
      />

      <ViewData
        type="Firm"
        value={firm}
        setValue={setFirm}
        navigation={navigation}
      />

      <ViewData
        type="SubCategory"
        value={subCategory}
        setValue={setSubCategory}
        navigation={navigation}
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
        {editFlag ? (
          <MyButton
            title="Update"
            style1={styles.buttonStyle1}
            style2={styles.buttonStyle2}
            onPress={handleUpdateButton}
          />
        ) : (
          <MyButton
            title="Add"
            style1={styles.buttonStyle1}
            style2={styles.buttonStyle2}
            onPress={handleAddButton}
          />
        )}
        <MyButton
          title="Clear"
          style1={styles.buttonStyle1}
          style2={styles.buttonStyle2}
          onPress={handleClearButton}
        />
        {editFlag && (
          <MyButton
            title="Delete"
            style1={styles.buttonStyle1}
            style2={styles.buttonStyle2}
            onPress={handleDeleteButton}
          />
        )}
      </View>
    </View>
  );
};

// AddMasterData.navigationOptions = () => {
//   return {
//     title: "New Item",
//   };
// };

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
