import { readFileSync } from "fs";
import path from "path";

export async function readFiles(pathName: string) {
  const filePath = path.join(pathName);
  const buffer = readFileSync(filePath);

  console.log(buffer);
}

readFiles(__dirname + "/files/text.txt");
