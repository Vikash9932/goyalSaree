import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";

import db from "../firebase.config";

const HomepageTable = ({ searchedTerm, navigation }) => {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const columns = [
    { name: "Rate" },
    { name: "Item" },
    { name: "Company" },
    { name: "Qty" },
    { name: "More" },
  ];
  useEffect(() => {
    const subscriber = db
      .collection("Master Data")
      .onSnapshot((documentSnapshot) => {
        let tempData = [];
        documentSnapshot.docs.forEach((item) => {
          let eachData = {};
          eachData = { id: item.id, ...item.data() };
          tempData = [...tempData, eachData];
        });
        setData(tempData);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  console.log("data", data);
  const filterData = () => {
    return data.filter((datum) =>
      datum.Item.toLowerCase().includes(searchedTerm.toLowerCase())
    );
  };

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    let columnLower = column;
    switch (columnLower) {
      case "Qty":
        columnLower = "Quantity";
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
    <FlatList
      keyExtractor={(data) => data.id}
      data={filterData()}
      style={{ width: "95%" }}
      ListHeaderComponent={tableHeader}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <View
            style={{
              ...styles.tableRow,
              backgroundColor: index % 2 == 1 ? "#C0CACA" : "#D0DCDC",
            }}
          >
            <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>
              {item.Rate}
            </Text>
            {item.Sold ? (
              <Text
                style={{
                  ...styles.columnRowTxt,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                }}
              >
                {item.Item}
              </Text>
            ) : (
              <Text style={styles.columnRowTxt}>{item.Item}</Text>
            )}
            <Text style={styles.columnRowTxt}>{item.Company}</Text>
            <Text style={styles.columnRowTxt}>{item.Quantity}</Text>
            <Picker
              style={styles.columnRowTxt}
              onValueChange={(itemValue, itemIndex) => {
                if ((itemValue = "Edit")) {
                  navigation.navigate("MasterData", {
                    Adhat: item.Adhat,
                    Item: item.Item,
                    Rate: item.Rate,
                    Firm: item.Firm,
                    Company: item.Company,
                    Quantity: item.Quantity,
                    Category: item.Category,
                    SubCategory: item.SubCategory,
                    PurchaseRate: item.PurchaseRate,
                    Date: item.Date,
                    Sold: item.Sold,
                    Id: item.id,
                  });
                }
              }}
            >
              <Picker.Item label={item.Adhat} />
              <Picker.Item label={item.Item} />
              <Picker.Item label={item.PurchaseRate.toString()} />
              <Picker.Item label={item.Firm} />
              <Picker.Item label={item.Category} />
              <Picker.Item label={item.SubCategory} />
              <Picker.Item label="Edit" value="Edit" />
            </Picker>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
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
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
});

export default HomepageTable;
