import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable } from "react-native";

const EventCard = ({ item }) => {
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
        <Text className="text-sm text-[#fc6745] font-semibold">
          {item?.date}
        </Text>
        <Text className="text-sm font-light">{item?.location}</Text>
      </View>
    </Pressable>
  );
};

export default EventCard;
