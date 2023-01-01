import { readFileSync } from "fs";
import path from "path";
import crypto from "crypto";

export interface IReadFiles {
  peerOne: string | number | any[];
  peerTwo: string | number | any[];
  peerThree: string | number | any[];
  peerFour: string | number | any[];
  peerFive: string | number | any[];
  peerSix: string | number | any[];
  peerFile: {
    fileName: string;
    fileHash: string;
  };
}

export async function readFiles(pathName: string): Promise<IReadFiles> {
  const filePath = path.join(pathName);
  const buffer = readFileSync(filePath);
  const fileName = path.basename(pathName);

  console.log(fileName);
  console.log(buffer);

  function mySplit(a: Buffer, delimiter: number): number[][] {
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

  const fileData: number[] = mySplit(buffer, -1)[0];
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

  // User Ip Array
  //const peersIpArray: string = (await userIp()).peerHostUrl;

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

  console.log(fileData);

  // Hash will be upadte for create with file buffer
  const fileHash = crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex") as string;
  console.log(fileHash);

  let peersObject: IReadFiles = {
    peerOne: fileData.slice(0, fileDataLenght1),
    peerTwo: fileData.slice(fileDataLenght1, fileDataLenght2),
    peerThree: fileData.slice(fileDataLenght2, fileDataLenght3),
    peerFour: fileData.slice(fileDataLenght3, fileDataLenght4),
    peerFive: fileData.slice(fileDataLenght4, fileDataLenght5),
    peerSix: fileData.slice(fileDataLenght5, fileDataLenght6),
    peerFile: {
      fileName: fileName,
      fileHash: "Ec" + fileHash,
    },
  };

  console.log(peersObject);

  return peersObject;
}
