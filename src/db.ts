import { MongoClient } from "mongodb";

const url = "mongodb://db:27017/";
const dbName = "cnp";

export async function initDB() {
  const client = new MongoClient(url);

  const conn = await client.connect();
  return conn.db(dbName);
}

export default await initDB();
