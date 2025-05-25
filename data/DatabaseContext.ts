import * as SQLite from "expo-sqlite/next";

const db = SQLite.openDatabaseSync("ElNewsSources", {
  enableChangeListener: false,
  enableCRSQLite: false,
  finalizeUnusedStatementsBeforeClosing: false,
  useNewConnection: false,
});

export const createSourcesDb = async () => {
  // create a table called "Sources"
};

export const fetchSources = async () => {
  const allSources = await db.getAllAsync("SELECT * FROM test");
};
