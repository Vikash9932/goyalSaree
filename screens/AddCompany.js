import React from "react";
import AddData from "../components/AddData";

const AddCompany = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Company",
    });
  });
  return <AddData type="Company" />;
};
// AddCompany.navigationOptions = () => {
//   return {
//     title: `New Company`,
//   };
// };
export default AddCompany;
