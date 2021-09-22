import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebase.config";
import { MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import MyButton from "./MyButton";

const AddData = ({ type }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscriber = db
      .collection(`${type}`)
      .onSnapshot((documentSnapshot) => {
        let tempData = [];
        documentSnapshot.docs.forEach(
          (item) => (tempData = [...tempData, item.data()])
        );
        const sortedData = _.sortBy(tempData, [(o) => o.Name]);
        setData(sortedData);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const handleAddButton = () => {
    if (!name) {
      alert(`Enter ${type} Name, please!`);
    } else if (
      data &&
      data.find((o) => o["Name"].toLowerCase() === name.toLowerCase())
    ) {
      alert("Duplicate Entry");
    } else {
      try {
        console.log("type", `${type}`);
        db.collection(`${type}`).add({
          Name: name,
        });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setName("");
  };

  const deleteYes = (deletedName) => {
    console.log("Deleted item is : ", type, deletedName);
    db.collection(`${type}`)
      .where("Name", "==", deletedName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      })
      .catch((err) => {
        console.log("error while deleting", err);
        Alert.alert("Nothing Deleted");
      });
    setData([]);
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
        keyExtractor={(data) => data["Name"]}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewFlatListParentStyle}>
              <Text style={styles.textFlatListStyle}>{item["Name"]}</Text>
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => handleDeleteButton(item["Name"])}
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
