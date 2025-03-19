import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screen width for responsive design
const screenWidth = Dimensions.get('window').width;

// Control Screen Component
const ControlScreen = () => {
  const [activeButton, setActiveButton] = useState(null);
  
  const handlePress = (buttonName) => {
    if (buttonName === 'stop') {
      setActiveButton(null);
      console.log('Stopped');
    } else if (buttonName === 'sprinkle') {
      setActiveButton('sprinkle');
      console.log('Sprinkling...');
    } else {
      setActiveButton(buttonName);
      console.log(`Moving ${buttonName}`);
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
              styles.topButton,
              activeButton === 'top' && styles.activeButton
            ]}
            onPress={() => handlePress('top')}
          >
            <Icon name="arrow-up-bold" size={30} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Middle Row Buttons */}
        <View style={styles.middleButtonsRow}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.leftButton,
              activeButton === 'left' && styles.activeButton
            ]}
            onPress={() => handlePress('left')}
          >
            <Icon name="arrow-left-bold" size={30} color="white" />
          </TouchableOpacity>
          
          {/* Spacer */}
          <View style={styles.buttonSpacer} />
          
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.rightButton,
              activeButton === 'right' && styles.activeButton
            ]}
            onPress={() => handlePress('right')}
          >
            <Icon name="arrow-right-bold" size={30} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              styles.bottomButton,
              activeButton === 'bottom' && styles.activeButton
            ]}
            onPress={() => handlePress('bottom')}
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
              activeButton === 'sprinkle' && styles.activeActionButton
            ]}
            onPress={() => handlePress('sprinkle')}
          >
            <Icon name="water" size={24} color="white" />
            <Text style={styles.buttonText}>Sprinkle</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.stopButton]}
            onPress={() => handlePress('stop')}
          >
            <Icon name="stop-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Graph Screen Component
const GraphScreen = () => {
  // Static temperature data for the chart
  const data = {
    labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        data: [22, 24, 28, 29, 27, 23],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Purple
        strokeWidth: 3
      },
      {
        data: [18, 20, 24, 26, 25, 21],
        color: (opacity = 1) => `rgba(65, 164, 244, ${opacity})`, // Blue
        strokeWidth: 3
      }
    ],
    legend: ['Indoor Temp', 'Outdoor Temp']
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#f5f5f5',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726'
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.graphContainer}>
        <Text style={styles.title}>Temperature Monitoring</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={250}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            verticalLabelRotation={0}
            yAxisSuffix="°C"
            yAxisInterval={1}
            xLabelsOffset={-10}
            segments={5}
            fromZero={false}
            legend={data.legend}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Average:</Text>
            <Text style={styles.statValue}>25.5°C</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>High:</Text>
            <Text style={styles.statValue}>29.0°C</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Low:</Text>
            <Text style={styles.statValue}>22.0°C</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Create the tab navigator
const Tab = createBottomTabNavigator();

// Main App Component
export default function App() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Controls') {
              iconName = focused ? 'gamepad-variant' : 'gamepad-variant-outline';
            } else if (route.name === 'Graph') {
              iconName = focused ? 'chart-line' : 'chart-line-variant';
            }
            
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 14 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Controls" component={ControlScreen} />
        <Tab.Screen name="Graph" component={GraphScreen} />
      </Tab.Navigator>
    </>
  );
}

// Styles
const bgcolor = '#2e3440';
const fgcolor = '#d8dee9';
const green = '#8fbcbb';
const yellow = '#ebcb8b';
const red = '#bf616a';
const blue = '#5e81ac';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgcolor,
    color: fgcolor,
  },
  text: {
    color: fgcolor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: fgcolor,
  },
  
  // Control Panel Styles
  controlPanel: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonContainer: {
    marginBottom: 20,
  },
  middleButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: 300,
    marginBottom: 20,
  },
  bottomButtonContainer: {
    marginBottom: 40,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 350,
  },
  buttonSpacer: {
    width: 80,
  },
  directionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: bgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  topButton: {
    backgroundColor: green,
  },
  leftButton: {
    backgroundColor: green,
  },
  rightButton: {
    backgroundColor: green,
  },
  bottomButton: {
    backgroundColor: green,
  },
  actionButton: {
    width: 120,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: bgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sprinkleButton: {
    backgroundColor: blue,
  },
  stopButton: {
    backgroundColor: red,
  },
  activeButton: {
    borderWidth: 3,
    borderColor: yellow, // Yellow
    transform: [{ scale: 1.1 }],
  },
  activeActionButton: {
    borderWidth: 3,
    borderColor: yellow, // Yellow
  },
  buttonText: {
    color: fgcolor,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  // Graph Screen Styles
  graphContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  chartContainer: {
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: fgcolor,
    padding: 10,
    elevation: 4,
    shadowColor: fgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    elevation: 4,
    shadowColor: fgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});