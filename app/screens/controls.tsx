import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview"; // Import WebView
import Video from "react-native-video";
import colors from "../colors.json";

import { View, Text, Dimensions, StyleSheet } from "react-native";

export default function ControlScreen() {
  const [activeButton, setActiveButton] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Establish WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.136.106:81"); // Replace with your WebSocket server URL
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handlePress = (buttonName: string) => {
    setActiveButton(buttonName);

    // Send command via WebSocket
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(buttonName);
      console.log(`Command sent: ${buttonName}`);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Stream */}
      {/* <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
      <iframe src="http://192.168.136.106/stream" height={'300px'} width={'500px'} />
      </View> */}
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: "http://192.168.136.106/stream" }} // Replace with your video stream URL
          style={styles.videoStream}
        />
      </View>

      {/* Control Panel */}
      <View style={styles.controlPanel}>
        <Text style={styles.title}>Control Panel</Text>

        {/* Forward Button */}
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.buttonColor,
              activeButton === "top" && styles.activeButton,
            ]}
            onPress={() => handlePress("W")}
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
            onPress={() => handlePress("A")}
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
            onPress={() => handlePress("D")}
          >
            <Icon name="arrow-right-bold" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Backward Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.buttonColor,
              activeButton === "bottom" && styles.activeButton,
            ]}
            onPress={() => handlePress("S")}
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
            onPress={() => handlePress("P")}
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
            onPress={() => handlePress("X")}
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
  videoContainer: {
    height: 200, // Adjust height as needed
    width: "100%",
    backgroundColor: "black",
  },
  videoStream: {
    flex: 1,
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
  video: {
    width: Dimensions.get("window").width * 0.9,
    height: 200,
  },
});
