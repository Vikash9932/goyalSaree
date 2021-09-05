//https://app.pluralsight.com/guides/consume-data-from-firebase-firestore-in-a-react-app
//googleapis.dev/nodejs/firestore/latest/QuerySnapshot.html
/*

  // const itemParam = navigation.getParam("Item");
  // if (itemParam) {
  //   let quantity = navigation.getParam("Quantity");
  //   setQuantity(quantity)
  //   setQuantity(navigation.getParam("Quantity"));
  //   setItem(navigation.getParam("Item"));
  //   setRate(navigation.getParam("Rate"));
  //   setPurchaseRate(navigation.getParam("PurchaseRate"));
  //   setCompany(navigation.getParam("Company"));
  //   setCategory(navigation.getParam("Category"));
  //   setSubCategory(navigation.getParam("SubCategory"));
  //   setAdhat(navigation.getParam("Adhat"));
  //   setFirm(navigation.getParam("Firm"));
  //   setDate(navigation.getParam("Date"));
  //   setSold(navigation.getParam("Sold"));
  // const {
  //   Adhat,
  //   Item,
  //   Rate,
  //   Firm,
  //   Company,
  //   Quantity,
  //   Category,
  //   SubCategory,
  //   PurchaseRate,
  //   Date,
  //   Sold,
  // } = params;
  // setQuantity(Quantity);
  // setItem(Item);
  // setRate(Rate);
  // setPurchaseRate(PurchaseRate);
  // setCompany(Company);
  // setCategory(Category);
  // setSubCategory(SubCategory);
  // setAdhat(Adhat);
  // setFirm(Firm);
  // setDate(Date);
  // setSold(Sold);











let moreData = [item.purchaseRate, item.Adhat, item.Firm];



 <Picker style={styles.columnRowTxt}>
              <Picker.Item label="More" />
              {moreData.map((each) => {
                return <Picker.Item key={each} label={each} value={each} />;
              })}
            </Picker>

const styles = { borderWidth: 1, borderColor: "black" };












import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject",
    "postinstall": "patch-package"
  },
  "dependencies": {
    "@expo/vector-icons": "^12.0.5",
    "@react-native-community/masked-view": "0.1.10",
    "@react-native-picker/picker": "1.16.1",
    "@react-navigation/bottom-tabs": "6.0.4",
    "@react-navigation/material-bottom-tabs": "6.0.4",
    "@react-navigation/material-top-tabs": "6.0.2",
    "@react-navigation/native": "^5.9.7",
    "@react-navigation/native-stack": "6.0.5",
    "@react-navigation/stack": "^5.14.8",
    "expo": "^42.0.3",
    "expo-dev-client": "^0.4.7",
    "expo-status-bar": "~1.0.4",
    "firebase": "8.2.3",
    "lodash": "^4.17.21",
    "patch-package": "^6.4.7",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "^0.65.1",
    "react-native-date-picker": "^3.4.3",
    "react-native-datepicker": "^1.7.2",
    "react-native-elements": "^3.4.2",
    "react-native-gesture-handler": "~1.10.2",
    "react-native-pager-view": "5.0.12",
    "react-native-paper": "^4.7.2",
    "react-native-safe-area-context": "3.2.0",
    "react-native-screens": "~3.4.0",
    "react-native-tab-view": "^3.0.0",
    "react-native-web": "^0.17.1",
    "react-navigation": "^4.4.4",
    "react-navigation-stack": "^2.10.4"
  },
  "devDependencies": {
    "@babel/core": "^7.9.6"
  },
  "private": true
}

















<Text style={styles.textStyle}>{item.adhat}</Text>
              <Text style={styles.textStyle}>{item.firm}</Text>
              <Text style={styles.textStyle}>{item.date}</Text>
              <Text style={styles.textStyle}>{item.category}</Text>
              <Text style={styles.textStyle}>{item.subCategory}</Text> 
              <Button>Delete</Button>
// import styles from "./Styles"
import { DataTable } from "react-native-paper";
 // { name: "Adhat" },
    // { name: "Firm" },
    // { name: "Date" },
    // { name: "Category" },
    // { name: "Sub Category" },

 <TouchableOpacity
        onPress={() => navigation.navigate("MasterData")}
        style={styles.TouchableOpacity}
      >
        <Feather name="plus" size={50} style={styles.newItem} />
      </TouchableOpacity>

  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [adhatData, setAdhatData] = useState([]);
  const [firmData, setFirmData] = useState([]);

*/
/*
  // position: "absolute",
    // bottom: 30,
    // right: 0,
    // left: "100",
    // borderWidth: 1,
    // borderColor: "black",

    <Button
        onPress={() => navigation.navigate("MasterData")}
        title="New item"
      />


      <FlatList
        horizontal={true}
        keyExtractor={(item) => item.name}
        data={headingData}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}
      />

      
    */
https: {
  /* <DataTable>
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
                  {/* To be done */
}
{
  /* <DataTable.Cell numeric>{item.rate}</DataTable.Cell>
                  <DataTable.Cell>{item.item}</DataTable.Cell>
                  <DataTable.Cell>{item.company}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity}</DataTable.Cell>

                  <DataTable.Cell numeric>{item.purchaseRate}</DataTable.Cell>

                  <DataTable.Cell>{item.adhat}</DataTable.Cell>
                  <DataTable.Cell>{item.firm}</DataTable.Cell>
                  {/* <DataTable.Cell>{item.date}</DataTable.Cell> */
}
{
  /* <DataTable.Cell>{item.category}</DataTable.Cell>
                  <DataTable.Cell>{item.subCategory}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable> */
}

/*

https://reactnativemaster.com/sortable-react-native-table-example/

 
  const sortTable = (<em>column</em>) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(pets, [<em>column</em>],[newDirection])
    setSelectedColumn(<em>column</em>)
    setDirection(newDirection)
    setPets(sortedData)
  }
  const tableHeader = () => (
    <View <em>style</em>={styles.tableHeader}>
      {
        columns.map((<em>column</em>, <em>index</em>) => {
          {
            return (
              <TouchableOpacity 
                <em>key</em>={<em>index</em>}
                <em>style</em>={styles.columnHeader} 
                <em>onPress</em>={()=> sortTable(<em>column</em>)}>
                <Text <em>style</em>={styles.columnHeaderTxt}>{<em>column</em> + " "} 
                  { selectedColumn === <em>column</em> && <MaterialCommunityIcons 
                      <em>name</em>={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  return (
    <View <em>style</em>={styles.container}>
      <FlatList 
        <em>data</em>={pets}
        <em>style</em>={{width:"90%"}}
        <em>keyExtractor</em>={(<em>item</em>, <em>index</em>) => <em>index</em>+""}
        <em>ListHeaderComponent</em>={tableHeader}
        <em>stickyHeaderIndices</em>={[0]}
        <em>renderItem</em>={({<em>item</em>, <em>index</em>})=> {
          return (
            <View <em>style</em>={{...styles.tableRow, backgroundColor: <em>index</em> % 2 == 1 ? "#F0FBFC" : "white"}}>
              <Text <em>style</em>={{...styles.columnRowTxt, fontWeight:"bold"}}>{<em>item</em>.Name}</Text>
              <Text <em>style</em>={styles.columnRowTxt}>{<em>item</em>.Gender}</Text>
              <Text <em>style</em>={styles.columnRowTxt}>{<em>item</em>.Breed}</Text>
              <Text <em>style</em>={styles.columnRowTxt}>{<em>item</em>.Weight}</Text>
              <Text <em>style</em>={styles.columnRowTxt}>{<em>item</em>.Age}</Text>
            </View>
          )
        }}
      />
      <StatusBar <em>style</em>="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
  }
});




*/
