import { Level } from "level";
import path from "path";
import { userIp } from "../p2p/getPeers";

// Create Peer with calling getPeers Function
export async function createPeer(
  dbDir: string,
  key: string,
  valueInput: string
) {
  // Create a database
  const dbPath = path.join(__dirname, dbDir);

  const options = {
    keyEncoding: "binary",
    valueEncoding: "json",
  };

  const db = new Level(dbPath, options);

  db.put(key, valueInput);

  // Get value of key 'a': 1
  const value = await db.get(key);

  // Add multiple entries
  await db.batch([
    { type: "put", key: "userIp-" + value.length, value: userIp()[1] },
  ]);

  console.log(value);
}

export async function getPeers(dbDir: string, valueInput: string) {
  // Create a database
  const dbPath = path.join(__dirname, dbDir);

  const options = {
    keyEncoding: "binary",
    valueEncoding: "json",
  };

  const db = new Level(dbPath, options);

  const value = await db.get(valueInput);
  console.log(value.length);
}

// Only For Test User Case
//createPeer("userAccount", "userIp-1", "<userIp>");

getPeers("userAccount", "userIp-1");
