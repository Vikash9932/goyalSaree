import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";

const Homepage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const columns = [
    { name: "Rate" },
    { name: "Item" },
    { name: "Company" },
    { name: "Qty" },
    { name: "P. Price" },
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

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    let columnLower = column.toLowerCase();
    switch (columnLower) {
      case "qty":
        columnLower = "quantity";
        break;
      case "p. price":
        columnLower = "purchaseRate";
        break;
      case "subcategory":
        columnLower = "subCategory";
        break;
      default:
        break;
    }
    const sortedData = _.orderBy(data, [columnLower], [newDirection]);
    setSelectedColumn(column);
    setDirection(newDirection);
    setData(sortedData);
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => sortTable(column.name)}
            >
              <Text style={styles.columnHeaderTxt}>
                {column.name + " "}
                {selectedColumn === column.name && (
                  <MaterialCommunityIcons
                    name={
                      direction === "desc"
                        ? "arrow-down-drop-circle"
                        : "arrow-up-drop-circle"
                    }
                  />
                )}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(data) =>
          data.rate + data.item + data.company + data.quantity
        }
        data={data}
        style={{ width: "95%" }}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                ...styles.tableRow,
                backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white",
              }}
            >
              <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>
                {item.rate}
              </Text>
              <Text style={styles.columnRowTxt}>{item.item}</Text>
              <Text style={styles.columnRowTxt}>{item.company}</Text>
              <Text style={styles.columnRowTxt}>{item.quantity}</Text>
              <Text style={styles.columnRowTxt}>{item.purchaseRate}</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("MasterData")}
        style={styles.TouchableOpacity}
      >
        <Feather name="plus" size={60} style={styles.newItem} />
      </TouchableOpacity>
    </View>
  );
};

Homepage.navigationOptions = () => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => {}}>
        <Feather name="search" size={20} style={{ marginRight: 10 }} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
  TouchableOpacity: {
    textAlign: "right",
    width: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 30,
    right: 0,
  },
  newItem: {},
});

export default Homepage;
