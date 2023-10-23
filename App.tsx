import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {DataSource} from "typeorm";
import {RSS} from "./Data/Models/RSS";
import {SourceLink} from "./Data/Models/SourceLink";
import "reflect-metadata"
import {useEffect} from "react";

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
      console.error("Database connection FAILED" + err)
    }
  }

  useEffect(() => {
    StartDatabase()
  }, []);


  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
