import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NativeSampleModule from "../tm/NativeSampleModule";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{NativeSampleModule.reverseString("BONJOUR LES AMIS")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
});
