import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { DataTable } from "react-native-paper";

// import styles from "./Styles";

const AddCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = () => {
    console.log("fetch data");
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

  const handleAddButton = () => {
    if (!companyName) {
      alert("Enter Company Name, please!");
    } else if (companyData && companyData.find((o) => o.name === companyName)) {
      alert("Duplicate Entry");
    } else {
      try {
        firebase.database().ref("Company/").push({ name: companyName });
      } catch (error) {
        console.log("Insertion Error", error);
      }
    }
    setCompanyName("");
  };

  return (
    <>
      <View>
        <TextInput
          // style={styles.input}
          onChangeText={(text) => setCompanyName(text)}
          defaultValue={companyName}
          placeholder="Enter Company Name"
        />
        <Button title="Add" onPress={handleAddButton} />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Company Name</DataTable.Title>
          </DataTable.Header>
          {companyData &&
            companyData.map((i) => {
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

export default AddCompany;
