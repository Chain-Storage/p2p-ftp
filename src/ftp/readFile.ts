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
  const fileDataLenght1 = Math.trunc(fileData.length / 6);

  const fileDataLenght2 =
    Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght1);

  const fileDataLenght3 =
    Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght2);

  const fileDataLenght4 =
    Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght3);

  const fileDataLenght5 =
    Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght4);

  const fileDataLenght6 = fileData.length;

  console.log(fileData);
  console.log(fileDataLenght1);
  console.log(fileDataLenght2);
  console.log(fileDataLenght3);
  console.log(fileDataLenght4);
  console.log(fileDataLenght5);
  console.log(fileDataLenght6);
}

readFiles(__dirname + "/files/Notion Setup 2.0.38.exe");
