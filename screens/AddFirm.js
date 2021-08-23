import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";

// import styles from "./Styles";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [firmData, setFirmData] = useState([]);

  useEffect(() => {
    fetchFirmData();
  }, []);

  const fetchFirmData = () => {
    console.log("fetch data");
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

  const handleAddButton = () => {
    if (!firmName) {
      alert("Enter Firm Name, please!");
    } else if (firmData && firmData.find((o) => o.name === firmName)) {
      alert("Duplicate Entry");
    } else {
      try {
        firebase.database().ref("Firm/").push({ name: firmName });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setFirmName("");
  };

  return (
    <>
      <View>
        <TextInput
          // style={styles.input}
          onChangeText={(text) => setFirmName(text)}
          defaultValue={firmName}
          placeholder="Enter Firm Name"
        />
        <Button title="Add" onPress={handleAddButton} />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Firm Name</DataTable.Title>
          </DataTable.Header>
          {firmData &&
            firmData.map((i) => {
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

export default AddFirm;
