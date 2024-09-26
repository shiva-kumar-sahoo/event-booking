import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import BookingModel from "../components/BookingModel";

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params.item;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView
      className="flex-1"
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
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
          Event Details
        </Text>
      </View>
      <View className="mb-4">
        <View>
          <Image
            source={{
              uri: `https://event-app-server.vercel.app${item?.image}`,
            }}
            className="w-full h-60"
            resizeMode="cover"
          />
        </View>
        <View className="px-4 mt-4">
          <Text className="text-xl text-[#fc6745] font-semibold">
            {item?.date}
          </Text>
          <Text className="text-2xl font-bold mt-2">{item?.eventName}</Text>
          <View className="flex flex-row items-center mt-2 gap-x-4">
            <FontAwesome name="location-arrow" size={24} color="black" />
            <Text className="text-lg">{item?.location}</Text>
          </View>
          <View className="flex gap-y-2 mt-4">
            <Text className="text-xl font-semibold">About this event</Text>
            <Text className="text-base">{item?.about}</Text>
          </View>
          <View className="flex flex-row items-center gap-x-2 mt-4">
            <Text className="text-lg font-semibold">Contact Details:</Text>
            <Text className="text-base font-medium">{item?.contact}</Text>
          </View>
          <View>
            <Pressable
              className="bg-[#fc6745] w-full h-12 items-center justify-center rounded-lg mt-4"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white text-xl font-semibold">Book Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <BookingModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
    </ScrollView>
  );
};

export default DetailsScreen;
