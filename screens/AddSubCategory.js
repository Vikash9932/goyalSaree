import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";

// import styles from "./Styles";

const AddSubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryData, setSubCategoryData] = useState([]);

  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  const fetchSubCategoryData = () => {
    console.log("fetch data");
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

  const handleAddButton = () => {
    if (!subCategoryName) {
      alert("Enter SubCategory Name, please!");
    } else if (
      subCategoryData &&
      subCategoryData.find((o) => o.name === subCategoryName)
    ) {
      alert("Duplicate Entry");
    } else {
      try {
        firebase.database().ref("SubCategory/").push({ name: subCategoryName });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setSubCategoryName("");
  };

  return (
    <>
      <View>
        <TextInput
          // style={styles.input}
          onChangeText={(text) => setSubCategoryName(text)}
          defaultValue={subCategoryName}
          placeholder="Enter SubCategory Name"
        />
        <Button title="Add" onPress={handleAddButton} />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>SubCategory Name</DataTable.Title>
          </DataTable.Header>
          {subCategoryData &&
            subCategoryData.map((i) => {
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

export default AddSubCategory;
