import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";

// import styles from "./Styles";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = () => {
    console.log("fetch data");
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

  const handleAddButton = () => {
    if (!categoryName) {
      alert("Enter Category Name, please!");
    } else if (
      categoryData &&
      categoryData.find((o) => o.name === categoryName)
    ) {
      alert("Duplicate Entry");
    } else {
      try {
        firebase.database().ref("Category/").push({ name: categoryName });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setCategoryName("");
  };

  return (
    <>
      <View>
        <TextInput
          // style={styles.input}
          onChangeText={(text) => setCategoryName(text)}
          defaultValue={categoryName}
          placeholder="Enter Category Name"
        />
        <Button title="Add" onPress={handleAddButton} />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Category Name</DataTable.Title>
          </DataTable.Header>
          {categoryData &&
            categoryData.map((i) => {
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

export default AddCategory;
