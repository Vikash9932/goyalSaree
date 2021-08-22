import firebase from "firebase/app";
import "firebase/database";

export const fetchAdhatData = () => {
  try {
    firebase
      .database()
      .ref("Adhat/")
      .on("value", (snapshot) => {
        const fetchedDataObject = snapshot.val();
        console.log("List of Adhat Data: ", fetchedDataObject);
        if (fetchedDataObject) {
          const fetchedDataArray = Object.values(fetchedDataObject);
          console.log("fetched Adhat Data Array:", fetchedDataArray);
          return fetchedDataArray;
        } else {
          return null;
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryData = () => {
  console.log("fetch data");
  try {
    firebase
      .database()
      .ref("Category/")
      .on("value", (snapshot) => {
        const fetchedDataObject = snapshot.val();
        console.log("List of Category Data: ", fetchedDataObject);
        if (fetchedDataObject) {
          const fetchedDataArray = Object.values(fetchedDataObject);
          console.log("fetched Category Data Array:", fetchedDataArray);
          setCategoryData(fetchedDataArray);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCompanyData = () => {
  console.log("fetch data");
  try {
    firebase
      .database()
      .ref("Company/")
      .on("value", (snapshot) => {
        const fetchedDataObject = snapshot.val();
        console.log("List of Company Data: ", fetchedDataObject);
        if (fetchedDataObject) {
          const fetchedDataArray = Object.values(fetchedDataObject);
          console.log("fetched Company Data Array:", fetchedDataArray);
          setCompanyData(fetchedDataArray);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFirmData = () => {
  console.log("fetch data");
  try {
    firebase
      .database()
      .ref("Firm/")
      .on("value", (snapshot) => {
        const fetchedDataObject = snapshot.val();
        console.log("List of Firm Data: ", fetchedDataObject);
        if (fetchedDataObject) {
          const fetchedDataArray = Object.values(fetchedDataObject);
          console.log("fetched Firm Data Array:", fetchedDataArray);
          setFirmData(fetchedDataArray);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSubCategoryData = () => {
  console.log("fetch data");
  try {
    firebase
      .database()
      .ref("SubCategory/")
      .on("value", (snapshot) => {
        const fetchedDataObject = snapshot.val();
        console.log("List of SubCategory Data: ", fetchedDataObject);
        if (fetchedDataObject) {
          const fetchedDataArray = Object.values(fetchedDataObject);
          console.log("fetched SubCategory Data Array:", fetchedDataArray);
          setSubCategoryData(fetchedDataArray);
        }
      });
  } catch (error) {
    console.log(error);
  }
};
