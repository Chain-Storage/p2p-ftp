import { readFile, readFileSync } from "fs";
import path from "path";
import { userIp } from "../p2p/peerIp";

// ipfs add /fileFolader/file.jpeg

interface IReadFiles {
  peerOne: string;
  peerTwo: string;
  peerThree: string;
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

  console.log(fileData);

  console.log(fileName);
  console.log(fileDataLenght1);
  console.log(fileDataLenght2);
  console.log(fileDataLenght3);
  console.log(fileDataLenght4);
  console.log(fileDataLenght5);
  console.log(fileDataLenght6);

  // User Ip Array
  const peersIpArray: string = (await userIp()).peerHostUrl;

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

  console.log(fileData.length);
  let peersDatas: any[] = [];

  for (let index = 0; index < peersLenghtArray.length; index++) {
    let elementFirst = peersLenghtArray[index] as number;
    let elementSecond = peersLenghtArray[index + 1] as number;

    console.log(elementFirst, elementSecond);

    if (elementFirst === 0) {
      for (elementFirst; elementFirst < elementSecond; elementFirst++) {
        const element = fileData[elementFirst] as number;
        console.log(element);

        peersDatas.push(element);
      }
    } else if (elementFirst > 0) {
      for (elementFirst + 1; elementFirst < elementSecond; elementFirst++) {
        const element = fileData[elementFirst] as number;
        console.log(element);

        peersDatas.push(element);
      }
    }
  }

  console.log(peersDatas);

  return {
    peerOne: "fileDataLenght1",
    peerTwo: "fileDataLenght1",
    peerThree: "",
  };
}

readFiles(__dirname + "/files/.gitignore");
