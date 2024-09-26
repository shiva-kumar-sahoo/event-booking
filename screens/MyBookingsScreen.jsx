import { View, Text, ToastAndroid, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import BookingsCard from "../components/BookingsCard";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const [bookingsData, setBookingsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchBookings = async () => {
    try {
      const userBookings = await AsyncStorage.getItem("userBookings");
      if (userBookings) {
        const bookings = JSON.parse(userBookings);
        setBookingsData(bookings);
      } else {
        setBookingsData([]);
      }
    } catch (error) {
      ToastAndroid.show("Error fetching bookings", ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const refreshBookings = () => {
    setRefreshing(true);
    fetchBookings();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchBookings();
  }, []);
  return (
    <GestureHandlerRootView>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={80} color="#fc6745" />
        </View>
      ) : (
        <View className="flex-1 pb-10">
          <View className="flex flex-row items-center bg-[#fc6745] py-6 px-1">
            <View>
              <Ionicons
                name="chevron-back-outline"
                size={44}
                color="white"
                onPress={() => navigation.goBack()}
              />
            </View>
            <Text className="text-white text-xl font-semibold ml-auto mr-auto">
              My Bookings
            </Text>
          </View>
          <View className="my-4 px-2 pb-10">
            <FlatList
              data={bookingsData}
              refreshing={refreshing}
              onRefresh={refreshBookings}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <BookingsCard data={item} />}
            />
          </View>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default MyBookingsScreen;
