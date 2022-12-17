import { Level } from "level";
import path from "path";

// Create Peer with calling getPeers Function
export async function createPeer(
  dbInput: string,
  typeInput: any,
  key: string,
  valueInput: string
) {
  // Create a database
  const db = new Level(dbInput, { valueEncoding: "json" });
  db.put(key, valueInput);

  // Add multiple entries
  await db.batch([{ type: typeInput, key: key, value: valueInput }]);

  // Get value of key 'a': 1
  const value = await db.get(key);
  console.log(value);
}

export async function getPeers(dbDir: string, valueInput: string) {
  // Create a database
  const dbPath = path.join(__dirname, dbDir);

  const options = {
    keyEncoding: "binary",
    valueEncoding: "json",
  };

  // Get value of key 'a': 1
  const db = new Level(dbPath, options);

  for await (const [key, value] of db.iterator({ gt: valueInput })) {
    console.log(value); // 2
  }
}

// Only For Test User Case
createPeer("userAccount", "put", "userIp-1", "127.0.333.43");
createPeer("userAccount", "put", "userIp-2", "127.0.4.43");
createPeer("userAccount", "put", "userIp-3", "127.0.984.343");

getPeers("userAccount", "userIp");
