import "react-native-gesture-handler";
import Navigation from "./Navigation";
import { StatusBar } from "expo-status-bar";
const App = () => {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" backgroundColor="#fc6745" />
    </>
  );
};

export default App;
