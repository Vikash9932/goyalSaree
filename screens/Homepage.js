import React, { useEffect, useState } from "react";
import { View, Button, FlatList, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/database";

// import styles from "./Styles";

const Homepage = ({ navigation }) => {
  const [data, setData] = useState([]);

  const headingData = [
    {
      name: "Rate",
    },
    {
      name: "Item",
    },
    { name: "Company" },
    { name: "Quantity" },
    { name: "Purchase Price" },
    { name: "Adhat" },
    { name: "Firm" },
    { name: "Date" },
    { name: "Category" },
    { name: "Sub Category" },
  ];
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
    <View
    // style={styles.container}
    >
      <Button
        onPress={() => navigation.navigate("MasterData")}
        title="New Item"
      />
      <FlatList
        horizontal={true}
        keyExtractor={(item) => item.name}
        data={headingData}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
              {/* <Button>Delete</Button> */}
            </View>
          );
        }}
      />
      <FlatList
        keyExtractor={(data) =>
          data.rate + data.item + data.company + data.quantity
        }
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textStyle}>{item.rate}</Text>
              <Text style={styles.textStyle}>{item.item}</Text>
              <Text style={styles.textStyle}>{item.company}</Text>
              <Text style={styles.textStyle}>{item.quantity}</Text>
              <Text style={styles.textStyle}>{item.purchaseRate}</Text>
              <Text style={styles.textStyle}>{item.adhat}</Text>
              <Text style={styles.textStyle}>{item.firm}</Text>
              <Text style={styles.textStyle}>{item.date}</Text>
              <Text style={styles.textStyle}>{item.category}</Text>
              <Text style={styles.textStyle}>{item.subCategory}</Text>
              {/* <Button>Delete</Button> */}
            </View>
          );
        }}
      />
      {/* <DataTable>
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
      {/* <DataTable.Cell numeric>{item.rate}</DataTable.Cell>
                  <DataTable.Cell>{item.item}</DataTable.Cell>
                  <DataTable.Cell>{item.company}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity}</DataTable.Cell>

                  <DataTable.Cell numeric>{item.purchaseRate}</DataTable.Cell>

                  <DataTable.Cell>{item.adhat}</DataTable.Cell>
                  <DataTable.Cell>{item.firm}</DataTable.Cell>
                  {/* <DataTable.Cell>{item.date}</DataTable.Cell> */}
      {/* <DataTable.Cell>{item.category}</DataTable.Cell>
                  <DataTable.Cell>{item.subCategory}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 10,
    width: 100,
    marginLeft: 10,
  },
  textInputStyle: {
    marginVertical: 10,
    height: 40,
  },
});

export default Homepage;
