import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons/";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        "https://event-app-server.vercel.app/api/get-events"
      );
      if (response.data.success) {
        setEventsData(response.data.data);
        setFilteredEvents(response.data.data);
      } else {
        ToastAndroid.show("Error fetching events", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("Error fetching events", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = () => {
    if (searchQuery == "") {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(
        eventsData.filter((event) =>
          event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getEvents();
  }, []);
  return (
    <GestureHandlerRootView>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={80} color="#fc6745" />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex items-center justify-center bg-[#fc6745] py-8 pb-4">
            <Text className="text-white text-xl font-semibold">Home</Text>
          </View>
          <View className="p-4">
            <View className="flex flex-row items-center justify-between bg-white rounded-full px-4">
              <AntDesign name="search1" size={30} color="gray" />
              <TextInput
                placeholder="Search an event"
                keyboardType="default"
                className="ml-4 w-60 h-14 text-lg"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  handleSearch();
                }}
              />
            </View>
          </View>
          <View>
            <View className="flex items-start jucstify-center mt-2 px-4">
              <Text className="text-2xl font-bold">UpComming Events</Text>
            </View>
            <View className="my-4 px-2">
              <FlatList
                data={filteredEvents}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <EventCard item={item} />}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
