import React from "react";

import AddData from "../components/AddData";

const AddAdhat = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Adhat",
    });
  });
  return <AddData type="Adhat" />;
};

// AddAdhat.navigationOptions = () => {
//   return {
//     title: "New Adhat",
//   };
// };

export default AddAdhat;
