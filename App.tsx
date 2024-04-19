
import {DataSource} from "typeorm";
import {NewsSource} from "./Data/Models/NewsSource";
import "reflect-metadata"
import {useEffect, useState} from "react";
import {Navbar} from "./Components/Navbar/Navbar";
import {NewsPage} from "./Pages/NewsPage/NewsPage";
import {registerRootComponent} from "expo";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MenuPage} from "./Pages/MenuPage/MenuPage";
import {AppDataSource} from "./Data/DatabaseSetup";
import {MainContextProvider} from "./Services/GlobalStateStore/MainContext";
import {TutorialModal} from "./Components/TutorialModal/TutorialModal";


export default function App() {
    const [isTutorialVisible, setTutorialVisible] = useState<boolean>(true)

    const CloseTutorial = () => {
        setTutorialVisible(false)
    }

  //Initialize Database

    useEffect(() => {
        AppDataSource.initialize()
    }, []);

  const Stack = createNativeStackNavigator();

  return (
      <>
          <MainContextProvider>
              <TutorialModal isVisible={isTutorialVisible} CloseTutorial={CloseTutorial}/>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName='NewsPage' screenOptions={{header: Navbar}}>
                      <Stack.Screen name="NewsPage" component={NewsPage} />
                      <Stack.Screen name="MenuPage" component={MenuPage} />
                  </Stack.Navigator>
              </NavigationContainer>
          </MainContextProvider>
      </>
  )
}

registerRootComponent(App);

