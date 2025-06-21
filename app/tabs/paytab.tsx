import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PayScreen() {

  return (
    <View style={styles.container}>
      {/* Row 1: Title */}
      <Text style={styles.title}>Pay</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 25,
  }})