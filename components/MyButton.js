import React from "react";
import { TouchableOpacity, Text } from "react-native";

const MyButton = ({ onPress, title, style1, style2 }) => (
  <TouchableOpacity onPress={onPress} style={style1}>
    <Text style={style2}>{title}</Text>
  </TouchableOpacity>
);

export default MyButton;
