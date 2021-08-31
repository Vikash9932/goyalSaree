import React from "react";

import AddData from "../components/AddData";

const AddAdhat = () => {
  return <AddData type="Adhat" />;
};

AddAdhat.navigationOptions = () => {
  return {
    title: "New Adhat",
  };
};

export default AddAdhat;
