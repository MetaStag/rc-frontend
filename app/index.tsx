import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GraphsScreen from "./screens/graphs";
import ControlScreen from "./screens/controls";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Controls"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Controls") {
            iconName = focused ? "gamepad-variant" : "gamepad-variant-outline";
          } else if (route.name === "Graphs") {
            iconName = focused ? "chart-line" : "chart-line-variant";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 14 },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Controls"
        component={ControlScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Graphs"
        component={GraphsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
