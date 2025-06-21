import { Slot, usePathname, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomNav from "../app/BottomNav";
import { useFonts } from "expo-font";

export default function Layout() {
  const pathname = usePathname();
  const [fontsLoaded] = useFonts({
    MICR: require('../assets/fonts/MICR.ttf'), // path to your font
  });

  if (!fontsLoaded) {
    return null; // or <AppLoading />
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      {/* Always visible bottom nav */}
      {pathname !== "/auth" && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
