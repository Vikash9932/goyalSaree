import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { DataTable } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/database";

// import styles from "./Styles";

const Homepage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      firebase
        .database()
        .ref("MasterData/")
        .on("value", (snapshot) => {
          const fetchedDataObject = snapshot.val();
          console.log("List of Master Data: ", fetchedDataObject);
          if (fetchedDataObject) {
            const fetchedDataArray = Object.values(fetchedDataObject);
            console.log("fetched Master Data Array:", fetchedDataArray);
            setData(fetchedDataArray);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button title="Refresh" onPress={fetchData} />
      <View
      // style={styles.container}
      >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title
            // style={styles.cell}
            >
              Item
            </DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Rate</DataTable.Title>
            <DataTable.Title numeric>Purchase Rate</DataTable.Title>
            <DataTable.Title>Company</DataTable.Title>
            <DataTable.Title>Adhat</DataTable.Title>
            <DataTable.Title>Firm</DataTable.Title>
          </DataTable.Header>

          {data &&
            data.map((item) => {
              return (
                <DataTable.Row key={item.adhat}>
                  <DataTable.Cell>{item.item}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.rate}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.purchaseRate}</DataTable.Cell>
                  <DataTable.Cell>{item.company}</DataTable.Cell>
                  <DataTable.Cell>{item.adhat}</DataTable.Cell>
                  <DataTable.Cell>{item.firm}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </View>
    </>
  );
};

export default Homepage;
