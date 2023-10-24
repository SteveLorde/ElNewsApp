
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

export const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'database',
  location: 'default',
  entities: [SourceLink]
})


export default function App() {


  function StartDatabase() {
    try {
      AppDataSource.initialize()
      console.log("Database Connection Successful")
    }
    catch (err) {
      console.error("Database connection FAILED " + err)
    }
  }

  useEffect(() => {
    StartDatabase()
  }, []);

  const Stack = createNativeStackNavigator();


  return (
      <>
        <Navbar></Navbar>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen  name="Home" component={NewsScreen} />
            <Stack.Screen name="RSSMenu" component={RSSMenu} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
  )
}

registerRootComponent(App);

