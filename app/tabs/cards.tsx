import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground,   Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, usePathname } from "expo-router";
import { faker } from '@faker-js/faker';
import { useFonts } from 'expo-font';
import * as Clipboard from 'expo-clipboard';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function CardScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [isFrozen, setIsFrozen] = useState(false);
  const fogAnim = useRef(new Animated.Value(isFrozen ? 1 : 0)).current;
const [cardData] = useState(() => ({
  cardHolder: faker.person.fullName(),
  cardNumber: faker.finance.creditCardNumber('#### #### #### ####'),
  expiry: faker.date.future().toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
  }),
  cvv: faker.finance.creditCardCVV(),
}));
const [cvvVisible, setCvvVisible] = useState(false);

const handleCopy = () => {
  const details = `Card No: ${cardData.cardNumber}\nExpiry: ${cardData.expiry}\nCVV: ${cardData.cvv}`;
  Clipboard.setStringAsync(details);
};

  const toggleFreeze = () => setIsFrozen((prev) => !prev);
    useEffect(() => {
    Animated.timing(fogAnim, {
        toValue: isFrozen ? 0.2 : 0,
        duration: 500,
        useNativeDriver: true,
    }).start();
    }, [isFrozen]);
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>YOUR DIGITAL DEBIT CARD</Text>

      <View style={styles.splitRow}>
        {/* Left: Card with Background Image */}
        <ImageBackground
          source={require("D:/Projects/assignments/Pay_ui_reactnative/payui_reactnative/assets/images/cardbg.png")} // or use a remote URL
  style={styles.leftCard}
  imageStyle={{ borderRadius: 16, opacity: isFrozen ? 1 : 0.4}}
        >
              {/* Fog overlay */}
  <Animated.View
    pointerEvents="none"
    style={[
      StyleSheet.absoluteFillObject,
      {
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: 16,
        opacity: fogAnim,
      },
    ]}
  />


  {/* Show content only if card is NOT frozen */}
  {!isFrozen && (
    <>
      {/* Top left image */}
      <Image
        source={require("../../assets/images/yoloimg.png")}
        style={styles.topLeftImage}
      />

      {/* Top right image */}
      <Image
        source={require("../../assets/images/yesbanklogo.png")}
        style={styles.topRightImage}
      />

      {/* Bottom right image */}
<View style={styles.bottomRightGroup}>
  <Image
    source={require("../../assets/images/rupayimg.png")}
    style={styles.bottomRightImage}
  />
  <Text style={styles.prepaidText}>PREPAID</Text>
</View>


 <View style={styles.infoRow}>
  {/* Left: Card Number in 4 blocks */}
<View style={styles.infoLeft}>
  {/* <View style={styles.cardChunkRow}> */}
    {cardData.cardNumber.split(" ").map((chunk, index) => (
      <View key={index} style={styles.cardChunk}>
        <Text style={styles.cardChunkText}>{chunk}</Text>
      </View>
    ))}
  {/* </View> */}
</View>

  {/* Right: Expiry and CVV */}
  <View style={styles.infoRight}>
    <View style={styles.infoBlock}>
      <Text style={styles.cardLabel}>expiry</Text>
      <Text style={styles.cardValue}>{cardData.expiry}</Text>
    </View>
    <View style={styles.infoBlock}>
      <Text style={styles.cardLabel}>cvv</Text>
     <View style={styles.cvvRow}>
{cvvVisible ? (
  <Text style={styles.astValue}>{cardData.cvv}</Text>
) : (
  <MaskedView
    maskElement={
      <Text style={[styles.astValue, { backgroundColor: 'transparent' }]}>
        ***
      </Text>
    }
  >
    <LinearGradient
      colors={['#888888', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={[styles.astValue, { opacity: 0 }]}>***</Text>
    </LinearGradient>
  </MaskedView>
)}

  <TouchableOpacity onPress={() => setCvvVisible(!cvvVisible)}>
    <Icon
      name={cvvVisible ? "eye" : "eye-off"}
      size={28}
      color="#D30000"
      style={{ marginLeft: 8 }}
    />
  </TouchableOpacity>
</View>

    </View>
  </View>
</View>

<TouchableOpacity style={styles.copyRow} onPress={handleCopy}>
  <Icon name="copy-outline" size={18} color="#D30000" />
  <Text style={styles.copyText}>Copy details</Text>
</TouchableOpacity>


    </>
  )}
        </ImageBackground>

        {/* Right: Freeze/Unfreeze Button */}
        <View style={styles.rightIconContainer}>
          <TouchableOpacity onPress={toggleFreeze}>
            <View
              style={[
                styles.lsideiconWrapper,
                isFrozen && styles.lsideiconWrapperActive,
              ]}
            >
              <Icon
                name={isFrozen ? "snow" : "snow-outline"}
                size={24}
                color={isFrozen ? "#A90808" : "#cccccc"}
              />
            </View>
          </TouchableOpacity>
            <Text style={{ color: isFrozen ? "#A90808" : "#cccccc" }}>
            {isFrozen ? "Unfreeze" : "Freeze"}
            </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 25,
  },
  splitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  leftCard: {
    height: 300,
    flex: 6,
    justifyContent: "center",
    padding: 20,
    borderRadius: 16,
    overflow: "hidden",

  // iOS shadow
  shadowColor: "#ffffff",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.4,
  shadowRadius: 15,

  // Android shadow
  elevation: 8,
  backgroundColor: "black", // important for shadow contrast on Android
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  rightIconContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
lsideiconWrapper: {
  padding: 12,
  borderRadius: 100,
  borderWidth: 1, // fixed width to avoid layout shift
  borderColor: "#cccccc",
  backgroundColor: "transparent",
  opacity: 0.5,

  shadowColor: "transparent",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,

  elevation: 0,
},

lsideiconWrapperActive: {
  opacity: 1,
  borderColor: "#A90808", // only border color changes

  shadowColor: "#A90808",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.6,
  shadowRadius: 5,

  elevation: 6,
},

  buttonText: {
    marginTop: 8,
    color: "#A90808",
    fontSize: 12,
    textAlign: "center",
  },

  topLeftImage: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 70,
    height: 40,
    resizeMode: "contain",
  },
  topRightImage: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 60,
    height: 40,
    resizeMode: "contain",
  },

  bottomRightGroup: {
  position: "absolute",
  bottom: 10,
  right: 2,
  alignItems: "center",
},

bottomRightImage: {
  width: 100,       
  height: 50,        
  resizeMode: "cover",
},
astValue: {
 fontSize: 28,
  color: "#fff",

},
prepaidText: {
  color: "#fff",
  fontSize: 14,
  fontStyle: "italic",
  fontWeight: "bold",
  letterSpacing: 1,
    marginTop: -10,
},

 infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 12,
},
infoLeft: {
  flex: 1,
  justifyContent: "center",
},
cardChunk: {
  borderWidth: 0.5,
//   borderColor: "#fff",
//   borderRadius: 4,
//   paddingVertical: 4,
  paddingHorizontal: 8,
  marginBottom: 18,
//   backgroundColor: "rgba(255,255,255,0.05)",
},
cardChunkText: {
  color: "#fff",
  fontSize: 30,
  fontFamily: "MICR",
},
infoRight: {
  flex: 1,
  justifyContent: "space-between",
},
infoBlock: {
  marginBottom: 16,
},
cardLabel: {
  color: "#4A4A4A",
  fontSize: 12,
  textTransform: "lowercase",
  marginBottom: 4,
},
cardValue: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "500",
},
cvvRow: {
  flexDirection: "row",
  alignItems: "center",
},


copyRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 5,
},

copyText: {
  marginLeft: 6,
  color: "#D30000",
  fontWeight: "bold",
  fontSize: 16,
},

  
});

