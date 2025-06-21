import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PayTab from "../app/tabs/paytab";
import CardTab from "../app/tabs/cards";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"pay" | "card">("pay");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
    <View style={styles.container}>
      {/* Row 1: Title */}
      <Text style={styles.title}>select payment mode</Text>

      {/* Row 2: Subtext */}
      <Text style={styles.subtitle}>Choose your preferred payment method to make payment.</Text>

      {/* Row 3: Toggle buttons */}
<View style={styles.tabButtonRow}>
  {["pay", "card"].map((tab) => {
    const isActive = activeTab === tab;

  return isActive ? (
    <LinearGradient
      key={tab}
      colors={["#A90808", "#000000"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.55, y: 1 }}
      style={styles.gradientBorder}
    >
      <TouchableOpacity
        style={styles.tabButtonInner}
        onPress={() => setActiveTab(tab as "pay" | "card")}
      >
        <Text style={styles.tabButtonTextActive}>
          {tab === "pay" ? "Pay" : "Card"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  
  ) : (
    //  Gradient Border when inactive
    <LinearGradient
      key={tab}
      colors={["#ffffff", "#000000"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.55, y: 1 }}
      style={styles.gradientBorder}
    >
      <TouchableOpacity
        style={styles.tabButtonInner}
        onPress={() => setActiveTab(tab as "pay" | "card")}
      >
        <Text style={styles.tabButtonText}>
          {tab === "pay" ? "Pay" : "Card"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
  })}
</View>

      {/* Row 4: Tab content */}
      <View style={styles.tabContent}>
        {activeTab === "pay" ? <PayTab /> : <CardTab />}
      </View>
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
  },
tabButtonRow: {
  flexDirection: "row",
  marginBottom: 16,
},

gradientBorder: {
  padding: 1,
  borderRadius: 24,
  marginHorizontal: 8,
},

gradientBorderActive: {
  padding: 2,
//   backgroundColor: "#A90808", 

},

tabButtonInner: {
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 24,
  backgroundColor: "#000", 
},

tabButtonText: {
  fontSize: 20,
  color: "#ccc",
  fontWeight: "600",
},

tabButtonTextActive: {
  fontSize: 20,
  color: "#A90808", 
  fontWeight: "700",
},

  tabContent: {
    height: 400,
    width: "100%",
    borderRadius: 12,
  },
});
