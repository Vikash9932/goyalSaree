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
      <View
      // style={styles.container}
      >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title numeric>Rate</DataTable.Title>
            <DataTable.Title
            // style={styles.cell}
            >
              Item
            </DataTable.Title>
            <DataTable.Title>Company</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>

            <DataTable.Title numeric>Purchase Price</DataTable.Title>

            <DataTable.Title>Adhat</DataTable.Title>
            <DataTable.Title>Firm</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title>Sub Category</DataTable.Title>
          </DataTable.Header>

          {data &&
            data.map((item) => {
              return (
                <DataTable.Row key={item.item}>
                  {/* To be done */}
                  <DataTable.Cell numeric>{item.rate}</DataTable.Cell>
                  <DataTable.Cell>{item.item}</DataTable.Cell>
                  <DataTable.Cell>{item.company}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity}</DataTable.Cell>

                  <DataTable.Cell numeric>{item.purchaseRate}</DataTable.Cell>

                  <DataTable.Cell>{item.adhat}</DataTable.Cell>
                  <DataTable.Cell>{item.firm}</DataTable.Cell>
                  {/* <DataTable.Cell>{item.date}</DataTable.Cell> */}
                  <DataTable.Cell>{item.category}</DataTable.Cell>
                  <DataTable.Cell>{item.subCategory}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </View>
    </>
  );
};

export default Homepage;
