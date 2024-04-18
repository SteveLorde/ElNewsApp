
import {DataSource} from "typeorm";
import {SourceLink} from "./Data/Models/SourceLink";
import "reflect-metadata"
import {useEffect} from "react";
import {Navbar} from "./Components/Navbar/Navbar";
import {NewsPage} from "./Pages/NewsPage/NewsPage";
import {registerRootComponent} from "expo";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MenuPage} from "./Pages/NewsMenuPage/MenuPage";
import SQLite from 'react-native-sqlite-storage'
import {AppDataSource} from "./Services/Database/DatabaseSetup";


export default function App() {

  //Initialize Database
  AppDataSource.initialize()

  const Stack = createNativeStackNavigator();


  return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='NewsPage' screenOptions={{header: Navbar}}>
            <Stack.Screen name="NewsScreen" component={NewsPage} />
            <Stack.Screen name="RSSMenu" component={MenuPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
  )
}

registerRootComponent(App);

