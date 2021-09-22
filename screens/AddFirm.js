import React from "react";
import AddData from "../components/AddData";

const AddFirm = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Firm",
    });
  });
  return <AddData type="Firm" />;
};

// AddFirm.navigationOptions = () => {
//   return {
//     title: `New Firm`,
//   };
// };

export default AddFirm;
