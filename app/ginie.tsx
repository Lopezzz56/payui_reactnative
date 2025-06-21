import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GinieScreen() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
    <View style={styles.container}>
      {/* Row 1: Title */}
      <Text style={styles.title}>Ginie Page</Text>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000"
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