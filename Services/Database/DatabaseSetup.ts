import {DataSource} from "typeorm";
import {SourceLink} from "../../Data/Models/SourceLink";

export const AppDataSource = new DataSource({
    type: 'expo',
    driver: require('expo-sqlite'),
    database: 'database',
    entities: [SourceLink],
    synchronize: true
})

