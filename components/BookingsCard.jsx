import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BookingsCard = ({ data }) => {
  const item = data.item;
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex flex-row item-center h-32"
      onPress={() => {
        navigation.navigate("DetailsScreen", { item });
      }}
    >
      <View className="mx-1">
        <Image
          source={{ uri: `https://event-app-server.vercel.app${item?.image}` }}
          className="w-36 h-28 rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View className="flex items-start mt-1 mx-2">
        <View>
          <Text
            className="text-base font-bold px-1 max-w-[180]"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item?.eventName}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text>Booked by:</Text>
          <Text className="text-sm text-[#fc6745] font-semibold">
            {data?.name}
          </Text>
        </View>
        <Text className="text-sm font-light">{item?.location}</Text>
      </View>
    </Pressable>
  );
};

export default BookingsCard;
