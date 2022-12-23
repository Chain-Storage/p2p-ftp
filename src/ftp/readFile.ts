import { readFile, readFileSync } from "fs";
import path from "path";
import { userIp } from "../p2p/getPeers";

// ipfs add /fileFolader/file.jpeg

export async function readFiles(pathName: string) {
  const filePath = path.join(pathName);
  const buffer = readFileSync(filePath);
  const fileName = path.basename(pathName);

  console.log(fileName);
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

  console.log(fileName);
  console.log(fileDataLenght1);
  console.log(fileDataLenght2);
  console.log(fileDataLenght3);
  console.log(fileDataLenght4);
  console.log(fileDataLenght5);
  console.log(fileDataLenght6);

  // User Ip Array
  const userIps: string[] = userIp();

  let peersIpArray: string[] = [userIps[0]];

  // User Ip commnet
  let peersLenghtArray: number[] = [
    0,
    fileDataLenght1,
    fileDataLenght2,
    fileDataLenght3,
    fileDataLenght4,
    fileDataLenght5,
    fileDataLenght6,
  ];

  for (let index = 0; index < peersLenghtArray.length; index++) {
    const element: any = peersLenghtArray[index];
    if (fileData.length > 0 || fileData.length < 14) {
      peersIpArray.push(element);
    }
  }
}

readFiles(__dirname + "/files/.gitignore");
