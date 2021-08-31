import React from "react";
import AddData from "../components/AddData";

const AddFirm = () => {
  return <AddData type="Firm" />;
};

AddFirm.navigationOptions = () => {
  return {
    title: `New Firm`,
  };
};

export default AddFirm;
