// App.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Tab = createBottomTabNavigator();

function Tab1Screen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text>Forward</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Backward</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Sprinkle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.stopButton]}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.sprinkleButton]}>
          <Text style={styles.buttonText}>Sprinkle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Tab2Screen() {
  const data = {
    labels: ['10s', '20s', '30s', '40s', '50s', '60s'],
    datasets: [
      {
        data: [25, 28, 22, 30, 27, 24],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <LineChart
        data={data}
        width={600}
        height={500}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={{ marginVertical: 8 }}
      />
    </View>
  );
}

export default function App() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Controls" component={Tab1Screen} />
        <Tab.Screen name="Temperature" component={Tab2Screen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  stopButton: {
    backgroundColor: '#ff4444', // Red <button class="citation-flag" data-index="7">
  },
  sprinkleButton: {
    backgroundColor: '#44aaff', // Blue <button class="citation-flag" data-index="7">
  },
  buttonText: {
    color: '#ffffff', // White text for better contrast
  },
});