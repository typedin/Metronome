import React from "react";
import { StyleSheet, View } from "react-native";

export default function Container({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
