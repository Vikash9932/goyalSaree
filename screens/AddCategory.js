import React from "react";
import AddData from "../components/AddData";

const AddCategory = () => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Category",
    });
  });
  return <AddData type="Category" />;
};

// AddCategory.navigationOptions = () => {
//   return {
//     title: `New Category`,
//   };
// };

export default AddCategory;
