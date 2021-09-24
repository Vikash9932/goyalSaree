import React from "react";
import { Alert, Text, Image } from "react-native";

const AboutUs = () => {
  return (
    <>
      <Text style={{ fontSize: 30, textAlign: "center" }}>Goyal Saree</Text>
      <Image
        style={{
          width: 250,
          height: 250,
          borderRadius: 5,
        }}
        source={require("../assets/goyalsaree.jpg")}
      />
    </>
  );
};
export default AboutUs;
