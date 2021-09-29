import React, { useState } from "react";
import { View, Button, Platform, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";

const DatePicker = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "Android");
    setDate(currentDate.toDateString());
  };

  const showDatepicker = () => {
    setShow(true);
  };
  console.log("date data", date);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={showDatepicker}
          style={{
            flex: 2,
            flexDirection: "row",
          }}
        >
          <Feather
            name="calendar"
            size={30}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              marginLeft: "20%",
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 8,
          }}
        >
          {date}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
