import { Level } from "level";

export async function createDb(
  dbInput: string,
  typeInput: any,
  key: string,
  valueInput: string,
  get: string
) {
  // Create a database
  const db = new Level(dbInput, { valueEncoding: "json" });

  // Add multiple entries
  await db.batch([{ type: typeInput, key: key, value: valueInput }]);

  // Get value of key 'a': 1
  const value = await db.get(get);
  console.log(value);
}

export async function getUser(dbInput: string, valueInput: string) {
  // Create a database
  const db = new Level(dbInput, { valueEncoding: "json" });

  // Get value of key 'a': 1
  const value = await db.get(valueInput);
  console.log(value);
}

getUser("userAccount", "userIp");
