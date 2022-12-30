import { createFile } from "../database/filesDb";
import { getPeers, IgetPeers } from "../p2p/getPeers";
import { sendFilesBuffer } from "./ftpSendBuffer";
import { IReadFiles, readFiles } from "./readFile";

interface IsendFile {
  message: string;
  data: {
    fileName: string;
    peers: string[];
  };
}

const fileArray: string[] = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "File",
];

export async function sendFiles(): Promise<IsendFile> {
  const readFile: Promise<IReadFiles> = readFiles(
    __dirname + "/files/Notion Setup 2.0.38.exe"
  );

  const getPeersData: Promise<IgetPeers> = getPeers();

  const peersUserId = (await getPeersData).userId;
  //const peersUserIp = (await getPeers()).userIp;

  const perr: any[] = peersUserId.slice(0, 7);

  for (let index = 0; index < perr.length; index++) {
    const element = perr[index];
    const fileArrayElement = fileArray[index];

    console.log(element, fileArrayElement);

    createFile(element, ((await readFile) as any).peer + fileArrayElement);
    sendFilesBuffer((await readFile).peerFile.fileName, element);
  }

  return {
    message: "File Sended Succesfully",
    data: {
      fileName: (await readFile).peerFile.fileName,
      peers: [""],
    },
  };
}

sendFiles();
