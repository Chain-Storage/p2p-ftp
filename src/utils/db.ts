import { Level } from "level";

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
  const value = await db.getMany([key]);
  console.log(value);
}

export async function getPeers(dbInput: string, valueInput: string) {
  // Create a database
  const db = new Level(dbInput, { valueEncoding: "json" });

  // Get value of key 'a': 1
  const value = await db.get(valueInput);
  console.log(value);
}

// Only For Test User Case
//createPeer("userAccount", "put", "userIp", "name");
