import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";

import MyButton from "./MyButton";

const AddData = ({ navigation, type }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  // const type = navigation.getParam("type");
  // navigation.title(`New ${type}`);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      firebase
        .database()
        .ref("Data/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log(`List of Data: `, fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log(`fetched Data Array:`, fetchedDataArray);
            const typeData = fetchedDataArray.filter((i) => i[type]);
            setData(typeData);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddButton = () => {
    if (!name) {
      alert(`Enter ${type} Name, please!`);
    } else if (data && data.find((o) => o[type] === name)) {
      alert("Duplicate Entry");
    } else {
      try {
        firebase
          .database()
          .ref("Data/")
          .push({
            [type]: name,
          });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setName("");
  };

  const deleteYes = (deletedName) => {
    console.log("Deleted item is : ", type, deletedName);

    // console.log("sdkfs", database().ref("/Data/"));
  };

  const handleDeleteButton = (deletedName) => {
    Alert.alert("Are your sure?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => deleteYes(deletedName) },
    ]);
  };

  return (
    <View>
      <View style={styles.viewParentStyle}>
        <View style={styles.viewStyle1}>
          <Text style={styles.textStyle}>{type}</Text>
        </View>
        <View style={styles.viewStyle2}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setName(text)}
            defaultValue={name}
            placeholder="Name"
          />
        </View>

        <MyButton
          title="Add"
          style1={styles.buttonStyle1}
          style2={styles.buttonStyle2}
          onPress={handleAddButton}
        />
      </View>
      <FlatList
        // horizontal={true}
        // showsHorizontalScrollIndicator = {false}
        keyExtractor={(data) => data[type]}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewFlatListParentStyle}>
              <Text style={styles.textFlatListStyle}>{item[type]}</Text>
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => handleDeleteButton(item[type])}
              >
                <MaterialIcons
                  style={styles.iconStyle}
                  name="delete"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewParentStyle: {
    flexDirection: "row",
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
    marginLeft: 5,
  },
  textStyle: {
    color: "#1c1ce6",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    height: "100%",
    borderColor: "black",
    textAlignVertical: "center",
  },
  textInputStyle: {
    fontSize: 18,
    flex: 7,
    marginLeft: 5,
  },
  buttonStyle1: {
    borderRadius: 5,
    flex: 2,
    backgroundColor: "#0000ff",
    marginLeft: 5,
  },
  buttonStyle2: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },

  viewFlatListParentStyle: {
    flexDirection: "row",
    margin: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  textFlatListStyle: {
    color: "black",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    height: "100%",
    textAlignVertical: "center",
    flex: 8,
  },
  touchableStyle: {
    flex: 2,
  },
  iconStyle: {
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },
});

export default AddData;
