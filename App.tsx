
import {DataSource} from "typeorm";
import {NewsSource} from "./Data/Models/NewsSource";
import "reflect-metadata"
import {useEffect} from "react";
import {Navbar} from "./Components/Navbar/Navbar";
import {NewsPage} from "./Pages/NewsPage/NewsPage";
import {registerRootComponent} from "expo";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MenuPage} from "./Pages/NewsMenuPage/MenuPage";
import SQLite from 'react-native-sqlite-storage'
import {AppDataSource} from "./Data/DatabaseSetup";
import {MainContextProvider} from "./Services/GlobalStateStore/MainContext";


export default function App() {

  //Initialize Database
  AppDataSource.initialize()

  const Stack = createNativeStackNavigator();


  return (
      <>
          <MainContextProvider>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName='NewsPage' screenOptions={{header: Navbar}}>
                      <Stack.Screen name="NewsScreen" component={NewsPage} />
                      <Stack.Screen name="RSSMenu" component={MenuPage} />
                  </Stack.Navigator>
              </NavigationContainer>
          </MainContextProvider>
      </>
  )
}

registerRootComponent(App);

