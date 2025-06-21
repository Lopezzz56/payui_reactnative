import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Svg, Path, Defs, LinearGradient as SVGLinearGradient, Stop } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BadgePercent } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from "react-native";

  
export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
const { width } = useWindowDimensions();

  return (
    <View style={styles.wrapper}>
      {/* SVG Background with curve */}
      <Svg
        width={width}
        height={140}
        viewBox={`0 0 ${width} 140`}
        style={styles.svg}
      >
        <Path
          d={`M0 40 Q${width / 2} 0 ${width} 40 L${width} 140 L0 140 Z`}
          fill="#000"
        />
  <Defs>
    <SVGLinearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0%" stopColor="#000000" />
      <Stop offset="3%" stopColor="#000000" />
      <Stop offset="10%" stopColor="#ffffff" />
      <Stop offset="90%" stopColor="#ffffff" />
      <Stop offset="97%" stopColor="#000000" />
      <Stop offset="100%" stopColor="#000000" />
    </SVGLinearGradient>
  </Defs>
  <Path
    d={`M0 40 Q${width / 2} 0 ${width} 40`}
    stroke="url(#curveGradient)"
    strokeWidth={2}
    fill="none"
  />
      </Svg>

      {/* Buttons placed inside SVG */}
      <View style={styles.buttonContainer}>
        {/* Home Button */}
<TouchableOpacity
  style={[styles.sideButton, { left: 50 }]}
  onPress={() => router.push("/home")}
>
  <View
    style={[
      styles.lsideiconWrapper,
      pathname === "/home" && styles.lsideiconWrapperActive,
    ]}
  >
    <Icon
      name="gite"
      size={28}
      color={pathname === "/home" ? "#ffffff" : "#cccccc"}
    />
    {/* "dull white" = #ccc, active = white */}
  </View>
  <Text style={styles.label}>home</Text>
</TouchableOpacity>

        {/* Center Button (now centered inside curve) */}
        <TouchableOpacity
          style={styles.centerButton}
          // onPress={() => router.push("/yolo-pay")}
        >
            <LinearGradient
    colors={["#ffffff", "#000000"]}
    start={{ x: 0.5, y: 0.5 }}
    end={{ x: 0.55, y: 1 }}
    style={[
      styles.gradientBorder,
      pathname === "/yolopay" && styles.gradientBorderActive,
    ]}
  >
    <View style={styles.iconInner}>
          <Icon
            name="qr-code-scanner"
            size={44}
            color={pathname === "/yolopay" ? "#ffffff" : "#cccccc"}
          />
    </View>
  </LinearGradient>

          <Text style={styles.centerLabel}>yolo pay</Text>
        </TouchableOpacity>

        {/* Ginie Button */}
<TouchableOpacity
  style={[styles.sideButton, { right: 55 }]}
  onPress={() => router.push("/ginie")}
>
    <View
    style={[
      styles.rsideiconWrapper,
      pathname === "/ginie" && styles.rsideiconWrapperActive,
    ]}
  >
  <BadgePercent
    size={28}
      color={pathname === "/ginie" ? "#ffffff" : "#cccccc"}
  />
    {/* "dull white" = #ccc, active = white */}
  </View>

  <Text style={styles.label}>ginie</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120, // Must match SVG height
    alignItems: "center",
    justifyContent: "flex-end",
  },
    lsideiconWrapper: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "transparent",
    opacity: 0.5, // faded
    overflow: "hidden",
    position: "relative",
  },
  lsideiconWrapperActive: {
    borderWidth: 2,
    opacity: 1,
  },
    rsideiconWrapper: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "transparent",
    opacity: 0.5, // faded
    overflow: "hidden",
    position: "relative",
  },
  rsideiconWrapperActive: {
    borderWidth: 2,
    opacity: 1,
  },
  svg: {
    position: "absolute",
    bottom: 0,
  },
    gradientBorder: {
    padding: 2, // controls thickness of border
    borderRadius: 50,
  },
  gradientBorderActive: {
    padding: 3, // thicker border when active
  },
  iconInner: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperActive: {
    borderWidth: 2,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabel: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
    textAlign: "center",
  },
  sideButton: {
    position: "absolute",
    alignItems: "center",
    width: 60,
  },
  label: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
});
