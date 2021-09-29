import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db } from "../firebase.config";

const HomepageTable = ({ searchedTerm, searchedType, navigation }) => {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tempData, setTempData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // useEffect(() => {
  //   setRefreshing(true);
  //   fetchData();
  // }, []);

  useEffect(() => {
    setRefreshing(true);
    let asyncData = getData();
    asyncData.then(
      (value) => {
        console.log("Fulfilled", value);
        if (!value || value.length === 0) {
          console.log("Inside no data");
          // fetchData();
          storeData(fetchData());
        } else if (
          Object.keys(value).length === 0 &&
          value.constructor === Object
        ) {
          console.log("Inside empty object");
          storeData(fetchData());
        } else {
          console.log(value.length);
          setTempData(value.slice(0, 10));
        }
        setRefreshing(false);
      },
      (reason) => {
        console.error("rejected", reason);
      }
    );
  }, []);

  useEffect(() => {
    filterDataFunc();
  }, [searchedTerm, searchedType]);

  const storeData = async (value) => {
    try {
      value.then((nestedValue) => {
        const jsonValue = JSON.stringify(nestedValue);
        // console.log("Inside store data", jsonValue, nestedValue);
        AsyncStorage.setItem("MasterData", jsonValue);
      });
    } catch (e) {
      console.error("Saving error");
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("MasterData");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Fetching error");
    }
  };

  const fetchData = async () => {
    console.log("Inside fetchData");
    const response = db.collection("Master Data");
    const fetchedData = await response.limit(20).get();
    let tempData = [];
    fetchedData.docs.forEach((item) => {
      let eachData = { id: item.id, ...item.data() };
      tempData = [...tempData, eachData];
    });
    const sortedData = _.sortBy(tempData, [(o) => o.Item]);
    setData(sortedData);
    setTempData(sortedData.slice(0, 10));
    setRefreshing(false);
    return sortedData;
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleLoadMore = () => {
    let loadMore = [];
    if (searchedTerm.length > 0) {
      loadMore = filterData.slice(tempData.length, tempData.length + 10);
    } else {
      loadMore = data.slice(tempData.length, tempData.length + 10);
    }
    setTempData([...tempData, ...loadMore]);
  };

  const filterDataFunc = () => {
    let filteredData = [];
    if (searchedType === "Rate") {
      filteredData = data.filter((datum) =>
        datum[searchedType].toString().startsWith(searchedTerm)
      );
    } else {
      filteredData = data.filter((datum) =>
        datum[searchedType].toLowerCase().includes(searchedTerm.toLowerCase())
      );
    }
    setFilterData(filteredData);
    setTempData(filteredData.slice(0, 10));
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
    const sortedData = _.orderBy(tempData, [columnLower], [newDirection]);
    setSelectedColumn(column);
    setDirection(newDirection);
    setTempData(sortedData);
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      <TouchableOpacity
        style={{ ...styles.columnHeader, flex: 1.5 }}
        onPress={() => sortTable("Rate")}
      >
        <Text style={styles.columnHeaderTxt}>
          Rate
          {selectedColumn === "Rate" && (
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
      <TouchableOpacity
        style={{ ...styles.columnHeader, flex: 3 }}
        onPress={() => sortTable("Item")}
      >
        <Text style={styles.columnHeaderTxt}>
          Item
          {selectedColumn === "Item" && (
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
      <TouchableOpacity
        style={{ ...styles.columnHeader, flex: 3 }}
        onPress={() => sortTable("Company")}
      >
        <Text style={styles.columnHeaderTxt}>
          Company
          {selectedColumn === "Company" && (
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
      <TouchableOpacity
        style={{ ...styles.columnHeader, flex: 1.5 }}
        onPress={() => sortTable("Qty")}
      >
        <Text style={styles.columnHeaderTxt}>
          Qty
          {selectedColumn === "Qty" && (
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
      <TouchableOpacity
        style={{ ...styles.columnHeader, flex: 1 }}
        onPress={() => sortTable("More")}
      >
        <Text style={styles.columnHeaderTxt}>
          ..
          {selectedColumn === "More" && (
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
    </View>
  );

  const tableFooter = () => (
    <View>
      <TouchableOpacity onPress={handleLoadMore}>
        <Text style={styles.tableFooter}>Load More ...</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      keyExtractor={(data) => data.id}
      // data={filterData()}
      data={tempData}
      style={{ width: "95%" }}
      ListHeaderComponent={tableHeader}
      stickyHeaderIndices={[0]}
      // showsVerticalScrollIndicator={false}
      // initialNumToRender={5}
      // onEndReachedThreshold={5} // so when you are at 5 pixel from the bottom react run onEndReached function
      // onEndReached={() => {
      //   handleLoadMore();
      // }}
      ListFooterComponent={tableFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item, index }) => {
        return (
          <View
            style={{
              ...styles.tableRow,
              backgroundColor: index % 2 == 1 ? "#C0CACA" : "#D0DCDC",
            }}
          >
            <Text
              style={{ ...styles.columnRowTxt, fontWeight: "bold", flex: 1.5 }}
            >
              {item.Rate}
            </Text>
            {item.Sold ? (
              <Text
                style={{
                  ...styles.columnRowTxt,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  fontWeight: "bold",
                  flex: 3,
                  marginRight: 5,
                }}
              >
                {item.Item}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.columnRowTxt,
                  fontWeight: "bold",
                  flex: 3,
                  marginRight: 5,
                }}
              >
                {item.Item}
              </Text>
            )}
            <Text style={{ ...styles.columnRowTxt, flex: 3 }}>
              {item.Company}
            </Text>
            <Text style={{ ...styles.columnRowTxt, flex: 1.5 }}>
              {item.Quantity}
            </Text>
            <Picker
              style={{ ...styles.columnRowTxt, flex: 1 }}
              onValueChange={(itemValue, itemIndex) => {
                if ((itemValue = "Edit")) {
                  navigation.navigate("MasterData", {
                    itemId: item.id,
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
    textAlign: "center",
    // margin:10
  },
  tableFooter: {
    backgroundColor: "#C0CACA",
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    color: "blue",
    width: "100%",
    borderWidth: 0,
  },
});

export default HomepageTable;
