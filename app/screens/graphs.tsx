import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import colors from "../colors.json";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: colors.fgcolor,
  backgroundGradientTo: "#d8dee9",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default function GraphScreen() {
  const data = {
    labels: ["6:00", "9:00", "12:00", "15:00", "18:00", "21:00"],
    datasets: [
      {
        data: [22, 24, 28, 29, 27, 23],
        color: (opacity = 1) => `rgba(180, 142, 173, ${opacity})`, // Purple
        strokeWidth: 3,
      },
      {
        data: [18, 20, 24, 26, 25, 21],
        color: (opacity = 1) => `rgba(129, 161, 193, ${opacity})`, // Blue
        strokeWidth: 3,
      },
    ],
    legend: ["Indoor Temp", "Outdoor Temp"],
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
  graphContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  chartContainer: {
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.fgcolor,
    padding: 10,
    elevation: 4,
    shadowColor: colors.fgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    backgroundColor: colors.fgcolor,
    borderRadius: 16,
    padding: 15,
    elevation: 4,
    shadowColor: colors.fgcolor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
