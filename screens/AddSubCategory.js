import React from "react";
import AddData from "../components/AddData";

const AddSubCategory = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Sub Category",
    });
  });
  return <AddData type="SubCategory" />;
};

// AddSubCategory.navigationOptions = () => {
//   return {
//     title: `New Sub Category`,
//   };
// };
export default AddSubCategory;
