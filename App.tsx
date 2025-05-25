import "reflect-metadata";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { NewsPage } from "./pages/NewsPage/NewsPage";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuPage } from "./pages/MenuPage/MenuPage";
import { AppDataSource } from "./data/DatabaseContext";
import { MainContextProvider } from "./services/GlobalStateStore/MainContext";
import { TutorialModal } from "./components/TutorialModal/TutorialModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isTutorialVisible, setTutorialVisible] = useState<boolean>(true);

  const CloseTutorial = async () => {
    await DoneTutorial();
    setTutorialVisible(false);
  };

  async function CheckIfTutorialDone() {
    const isTutorialDoneKey = await AsyncStorage.getItem("tutorialDone");
    if (isTutorialDoneKey !== null && isTutorialDoneKey === "true") {
      setTutorialVisible(false);
    } else {
      await AsyncStorage.setItem("tutorialDone", "false");
    }
  }

  async function DoneTutorial() {
    await AsyncStorage.setItem("tutorialDone", "true");
  }

  //Initialize Database

  useEffect(() => {
    AppDataSource.initialize();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <>
      <MainContextProvider>
        <TutorialModal
          isVisible={isTutorialVisible}
          CloseTutorial={CloseTutorial}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="NewsPage"
            screenOptions={{ header: Navbar }}
          >
            <Stack.Screen name="NewsPage" component={NewsPage} />
            <Stack.Screen name="MenuPage" component={MenuPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </MainContextProvider>
    </>
  );
}

registerRootComponent(App);
