import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";

// import styles from "./Styles";

const AddAdhat = () => {
  const [adhatName, setAdhatName] = useState("");
  const [adhatData, setAdhatData] = useState([]);

  useEffect(() => {
    fetchAdhatData();
  }, []);

  const fetchAdhatData = () => {
    try {
      firebase
        .database()
        .ref("Adhat/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Adhat Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            // const fetchedDataKey = Object.keys(fetchedDataObject);
            // console.log("fetchedDataKey", fetchedDataKey);
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched Adhat Data Array:", fetchedDataArray);
            setAdhatData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddButton = () => {
    if (!adhatName) {
      alert("Enter Adhat Name, please!");
    } else if (adhatData && adhatData.find((o) => o.name === adhatName)) {
      alert("Duplicate Entry");
    } else {
      try {
        firebase.database().ref("Adhat/").push({ name: adhatName });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setAdhatName("");
  };

  return (
    <>
      <View>
        <TextInput
          // style={styles.input}
          onChangeText={(text) => setAdhatName(text)}
          defaultValue={adhatName}
          placeholder="Enter Adhat Name"
        />
        <Button title="Add" onPress={handleAddButton} />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Adhat Name</DataTable.Title>
          </DataTable.Header>
          {adhatData &&
            adhatData.map((i) => {
              return (
                <DataTable.Row key={i.name}>
                  <DataTable.Cell>{i.name}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </View>
    </>
  );
};

export default AddAdhat;
