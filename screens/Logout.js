import React from "react";
import firebase from "firebase/app";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { Alert, Text } from "react-native";
const auth = firebase.auth();
const Logout = ({ navigation }) => {
  const { user } = React.useContext(AuthenticatedUserContext);

  const handleSignOutYes = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    Alert.alert("Logout? So soon?", `${user.email}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: handleSignOutYes },
    ]);
  };
  return (
    <>
      {handleSignOut()}
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        You are logging out!
      </Text>
    </>
  );
};
export default Logout;
