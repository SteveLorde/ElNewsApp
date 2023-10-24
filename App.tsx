
import {DataSource} from "typeorm";
import {SourceLink} from "./Data/Models/SourceLink";
import "reflect-metadata"
import {useEffect} from "react";
import {Navbar} from "./Components/Navbar/Navbar";
import {NewsScreen} from "./Components/NewsScreen/NewsScreen";
import {registerRootComponent} from "expo";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RSSMenu} from "./Components/RSSMenu/RSSMenu";
import SQLite from 'react-native-sqlite-storage'
import {AppDataSource} from "./Services/Database/DatabaseSetup";


export default function App() {

  //Initialize Database
  AppDataSource.initialize()

  const Stack = createNativeStackNavigator();


  return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='NewsScreen' screenOptions={{header: Navbar}}>
            <Stack.Screen name="NewsScreen" component={NewsScreen} />
            <Stack.Screen name="RSSMenu" component={RSSMenu} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
  )
}

registerRootComponent(App);

