import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function Animation() {
 
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
    
        style={{
          width: "100%",
          aspectRatio: 1,
          backgroundColor: "#eee",
        }}
  
        source={require("../../assets/netflix.json")}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
