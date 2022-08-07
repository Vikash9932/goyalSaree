import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebase.config';
import MyButton from './MyButton';
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

const ViewData = ({ type, value, setValue, navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscriber = db
      .collection(`${type}`)
      .onSnapshot((documentSnapshot) => {
        let tempData = [];
        documentSnapshot.docs.forEach(
          (item) => (tempData = [...tempData, item.data()])
        );
        const sortedData = _.sortBy(tempData, [(o) => o.Name]);
        setData(sortedData);
      });

    return () => subscriber();
  }, []);
  let defValueIndex;
  data.forEach((item, index) => {
    if (item.Name === value) {
      defValueIndex = index;
    }
  });
  // console.log("view data", data, value, defValueIndex)

  return (
    <View style={styles.viewParentStyle}>
      <View style={styles.viewStyle1}>
        <Text style={styles.textStyle}>{type}</Text>
      </View>
      <View style={styles.viewStyle2}>
        <SelectDropdown
          defaultButtonText='Select'
          renderDropdownIcon={() => (
            <AntDesign name='down' size={20} color='black' />
          )}
          defaultValueByIndex={defValueIndex}
          buttonStyle={styles.pickerStyle}
          data={data}
          onSelect={(selectedItem, index) => {
            setValue(selectedItem.Name);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.Name;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.Name;
          }}
        />
        {/* <Picker
          selectedValue={value}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => {
            Keyboard.dismiss();
            setValue(itemValue);
          }}
        >
          <Picker.Item label="Select" />
          {data.map((item) => {
            return (
              <Picker.Item
                key={item.Name}
                label={item.Name}
                value={item.Name}
              />
            );
          })}
        </Picker> */}
      </View>

      <MyButton
        style1={styles.buttonStyle1}
        style2={styles.buttonStyle2}
        onPress={() => {
          navigation.navigate(type);
        }}
        title='New'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewParentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    height: 45,
    borderRadius: 5,
    marginBottom: 2,
    backgroundColor: '#666',
  },
  viewStyle1: {
    flex: 3,
    backgroundColor: '#666',
    borderRadius: 5,
  },
  viewStyle2: {
    backgroundColor: '#AAA',
    flex: 5,
    borderRadius: 5,
  },
  buttonStyle1: {
    borderRadius: 5,
    flex: 2,
    backgroundColor: '#0000ff',
    marginLeft: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    height: '100%',
    textAlignVertical: 'center',
  },
  pickerStyle: {
    fontSize: 16,
    fontWeight: '900',
    height: '100%',
    backgroundColor: '#AAA',
    borderRadius: 5,
  },
  buttonStyle2: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    height: '100%',
    textAlignVertical: 'center',
  },
});

export default ViewData;
