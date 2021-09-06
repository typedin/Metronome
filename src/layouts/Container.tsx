import React from "react";
import { StyleSheet, View } from "react-native";

export default function Container({
  children,
  isLoaded,
}: {
  children: JSX.Element | JSX.Element[];
  isLoaded: boolean;
}) {
  return <View style={styles.container}>{isLoaded && children}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
