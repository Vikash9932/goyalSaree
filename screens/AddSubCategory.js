import React from "react";
import AddData from "../components/AddData";

const AddSubCategory = () => {
  return <AddData type="SubCategory" />;
};

AddSubCategory.navigationOptions = () => {
  return {
    title: `New Sub Category`,
  };
};
export default AddSubCategory;
