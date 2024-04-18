import {DataSource} from "typeorm";
import {NewsSource} from "./Models/NewsSource";

export const AppDataSource = new DataSource({
    type: 'expo',
    driver: require('expo-sqlite'),
    database: 'newssources.db',
    entities: [NewsSource],
    synchronize: true
})



