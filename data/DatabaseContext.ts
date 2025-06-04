import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("ElNewsSources", {
  enableChangeListener: false,
  finalizeUnusedStatementsBeforeClosing: false,
  useNewConnection: false,
});

export const createDb = async () => {
  // create a table called "Sources"
  // create config variables table
};

export const fetchSources = async () => {
  const allSources = await db.getAllAsync("SELECT * FROM test");
};
