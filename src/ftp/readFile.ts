import { readFileSync } from "fs";
import path from "path";

export async function readFiles(pathName: string) {
  const filePath = path.join(pathName);
  const buffer = readFileSync(filePath);

  console.log(buffer);

  function mySplit(a: Buffer, delimiter: number): any[] {
    const result = [];
    let currentToken = [];

    for (let i: number = 0; i < a.length; i++) {
      if (a[i] === delimiter) {
        if (currentToken.length !== 0) result.push(currentToken);
        currentToken = [];
      } else {
        currentToken.push(a[i]);
      }
    }
    if (currentToken.length !== 0) result.push(currentToken);

    return result;
  }

  const fileData = mySplit(buffer, -1)[0];
  console.log(fileData);
}

readFiles(__dirname + "/files/Notion Setup 2.0.38.exe");
