import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../colors.json";

import { View, Text, StyleSheet } from "react-native";

export default function ControlScreen() {
  const [activeButton, setActiveButton] = useState("");

  const handlePress = (buttonName: string) => {
    if (buttonName === "stop") {
      setActiveButton("stop");
      console.log("Stopped");
    } else if (buttonName === "sprinkle") {
      setActiveButton("sprinkle");
      console.log("Sprinkling...");
    } else {
      setActiveButton(buttonName);
      console.log(`Clicked ${buttonName}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.controlPanel}>
        <Text style={styles.title}>Control Panel</Text>

        {/* Top Button */}
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.buttonColor,
              activeButton === "top" && styles.activeButton,
            ]}
            onPress={() => handlePress("top")}
          >
            <Icon name="arrow-up-bold" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Middle Row Buttons */}
        <View style={styles.middleButtonsRow}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.buttonColor,
              activeButton === "left" && styles.activeButton,
            ]}
            onPress={() => handlePress("left")}
          >
            <Icon name="arrow-left-bold" size={30} color="white" />
          </TouchableOpacity>

          {/* Spacer */}
          <View style={styles.buttonSpacer} />

          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.buttonColor,
              activeButton === "right" && styles.activeButton,
            ]}
            onPress={() => handlePress("right")}
          >
            <Icon name="arrow-right-bold" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.buttonColor,
              activeButton === "bottom" && styles.activeButton,
            ]}
            onPress={() => handlePress("bottom")}
          >
            <Icon name="arrow-down-bold" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.sprinkleButton,
              activeButton === "sprinkle" && styles.activeButton,
            ]}
            onPress={() => handlePress("sprinkle")}
          >
            <Icon name="water" size={24} color="white" />
            <Text style={styles.buttonText}>Sprinkle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.stopButton,
              activeButton === "stop" && styles.activeButton,
            ]}
            onPress={() => handlePress("stop")}
          >
            <Icon name="stop-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
    color: colors.fgcolor,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: colors.fgcolor,
  },

  controlPanel: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topButtonContainer: {
    marginBottom: 20,
  },
  middleButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    maxWidth: 300,
    marginBottom: 20,
  },
  bottomButtonContainer: {
    marginBottom: 40,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 350,
  },
  buttonSpacer: {
    width: 80,
  },
  directionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.bgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonColor: {
    backgroundColor: colors.green,
  },
  actionButton: {
    width: 120,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 5,
    shadowColor: colors.bgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sprinkleButton: {
    backgroundColor: colors.blue,
  },
  stopButton: {
    backgroundColor: colors.red,
  },
  activeButton: {
    borderWidth: 3,
    borderColor: colors.yellow,
    transform: [{ scale: 1.1 }],
  },
  buttonText: {
    color: colors.fgcolor,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
