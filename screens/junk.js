const styles = { borderWidth: 1, borderColor: "black" };
/*
<Text style={styles.textStyle}>{item.adhat}</Text>
              <Text style={styles.textStyle}>{item.firm}</Text>
              <Text style={styles.textStyle}>{item.date}</Text>
              <Text style={styles.textStyle}>{item.category}</Text>
              <Text style={styles.textStyle}>{item.subCategory}</Text> 
              <Button>Delete</Button>

 // { name: "Adhat" },
    // { name: "Firm" },
    // { name: "Date" },
    // { name: "Category" },
    // { name: "Sub Category" },




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
{
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
