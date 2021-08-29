import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/database";
// import { DataTable } from "react-native-paper";

// import styles from "./Styles";

const AddData = ({ type }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

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
          console.log(`List of ${type} Data: `, fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log(`fetched ${type} Data Array:`, fetchedDataArray);
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

  return (
    <View>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setName(text)}
        defaultValue={name}
        placeholder={`Enter ${type} Name`}
      />
      <Button title="Add" onPress={handleAddButton} />

      <FlatList
        // horizontal={true}
        // showsHorizontalScrollIndicator = {false}
        keyExtractor={(data) => data[type]}
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.textStyle}>{item[type]}</Text>
              {/* <Button>Delete</Button> */}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 10,
  },
  textInputStyle: {
    marginVertical: 10,
    height: 40,
  },
});

export default AddData;
