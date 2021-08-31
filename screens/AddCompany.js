import React from "react";
import AddData from "../components/AddData";

const AddCompany = () => {
  return <AddData type="Company" />;
};
AddCompany.navigationOptions = () => {
  return {
    title: `New Company`,
  };
};
export default AddCompany;
