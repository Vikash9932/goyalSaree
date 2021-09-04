import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";

import db from "../firebase.config";

const HomepageTable = ({ searchedTerm }) => {
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
    fetchData();
  }, []);

  const filterData = () => {
    return data.filter((datum) =>
      datum.Item.toLowerCase().includes(searchedTerm.toLowerCase())
    );
  };

  const fetchData = async () => {
    try {
      const response = db.collection("Master Data");
      const masterData = await response.get();
      masterData.docs.forEach((item) => setData([...data, item.data()]));
    } catch (error) {
      console.log(error);
    }
  };

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    let columnLower = column.toLowerCase();
    switch (columnLower) {
      case "qty":
        columnLower = "Quantity";
        break;
      case "p. price":
        columnLower = "Purchase Rate";
        break;
      case "subcategory":
        columnLower = "Sub Category";
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
      keyExtractor={(data) => `${data.Item}`}
      data={filterData()}
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
              {item.Rate}
            </Text>
            <Text style={styles.columnRowTxt}>{item.Item}</Text>
            <Text style={styles.columnRowTxt}>{item.Company}</Text>
            <Text style={styles.columnRowTxt}>{item.Quantity}</Text>
            <Picker style={styles.columnRowTxt}>
              <Picker.Item label={item.Adhat} />
              <Picker.Item label={item.Item} />
              {/* <Picker.Item label={String(item["Purchase Rate"])} /> */}

              <Picker.Item label={item.Firm} />
              <Picker.Item label={item.Category} />
              {/* <Picker.Item label={item["Sub Category"]} /> */}
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
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
});

export default HomepageTable;
