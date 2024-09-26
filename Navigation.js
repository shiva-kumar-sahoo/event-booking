import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";

import { AntDesign, Feather } from "@expo/vector-icons/";

const EventsStack = createNativeStackNavigator();

const EventsStackNavigation = () => {
  return (
    <EventsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <EventsStack.Screen name="HomeScreen" component={HomeScreen} />
      <EventsStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </EventsStack.Navigator>
  );
};

const TabNavigation = createBottomTabNavigator();

const TabScreenNavigation = () => {
  return (
    <TabNavigation.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <TabNavigation.Screen
        name="Home"
        component={EventsStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <TabNavigation.Screen
        name="My Bookings"
        component={MyBookingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bookmark" size={24} color={color} />
          ),
        }}
      />
    </TabNavigation.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabScreenNavigation />
    </NavigationContainer>
  );
};
export default Navigation;
