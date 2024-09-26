import { View, Text, Alert, Modal, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
const BookingModel = ({ modalVisible, setModalVisible, item }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState("1");

  const handleBooking = async () => {
    if (name && email && tickets) {
      const userBookings = await AsyncStorage.getItem("userBookings");
      if (userBookings) {
        const bookings = JSON.parse(userBookings);
        bookings.push({ item, name, email, tickets });
        await AsyncStorage.setItem("userBookings", JSON.stringify(bookings));
      } else {
        await AsyncStorage.setItem(
          "userBookings",
          JSON.stringify([{ item, name, email, tickets }])
        );
      }
      Alert.alert(
        "Booking Confirmed",
        `Booking successful. \n \n Enjoy your event.`,
        [{ text: "OK", onPress: () => setModalVisible(false) }]
      );
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex justify-center items-center bg-slate-200 bg-opacity-50 h-full">
        <View className="bg-white w-11/12 p-6 rounded-lg">
          <Text className="text-xl font-semibold mb-2">Book Tickets</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Number of Tickets"
            value={tickets}
            onChangeText={setTickets}
            keyboardType="numeric"
          />
          <Pressable
            className="bg-[#fc6745] w-full h-12 items-center justify-center rounded-lg mt-4"
            onPress={handleBooking}
          >
            <Text className="text-white text-xl font-semibold">
              Confirm Booking
            </Text>
          </Pressable>
          <Pressable
            className="bg-gray-300 w-full h-12 items-center justify-center rounded-lg mt-4"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-black text-xl font-semibold">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default BookingModel;
