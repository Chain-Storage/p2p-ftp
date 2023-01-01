import { createFile } from "../database/filesDb";
import { getPeers, IgetPeers } from "../p2p/getPeers";
import { sendFilesBuffer } from "./ftpSendBuffer";
import { IReadFiles, readFiles } from "./readFile";

interface IsendFile {
  message: string;
  data: {
    fileName: string;
    fileHash: string;
    peers: string[];
  };
}

async function sendFiles(): Promise<IsendFile> {
  console.log("sendFiles Function Started");

  const readFile: Promise<IReadFiles> = readFiles(
    __dirname + "/files/Notion Setup 2.0.38.exe"
  );

  const fileArray: any[] = [
    (await readFile).peerOne,
    (await readFile).peerTwo,
    (await readFile).peerThree,
    (await readFile).peerFour,
    (await readFile).peerFive,
    (await readFile).peerSix,
  ];

  console.log("peers calling..");
  const getPeersData: Promise<IgetPeers> = getPeers();

  const peersUserId: string[] = (await getPeersData).data;
  //const peersUserIp = (await getPeers()).userIp;

  // This code will be update in the feature for sending files under the 6 peers
  const perr: any = peersUserId.slice(0, 6);

  console.log(perr, peersUserId, getPeersData);

  for (let index = 0; index < perr.length; index++) {
    console.log("Send Peers Buffer Loop Start");

    const element = perr[index];
    const fileArrayElement = fileArray[index];

    console.log(element, fileArrayElement);

    //createFile(element, ((await readFile) as any).peer + fileArrayElement);
    sendFilesBuffer(
      (await readFile).peerFile.fileHash + `-${index}`,
      fileArrayElement,
      element.hostName,
      element.userIp
    );
    console.log("File Sending...");
  }

  return {
    message: "File Sended Succesfully",
    data: {
      fileName: (await readFile).peerFile.fileName,
      fileHash: (await readFile).peerFile.fileHash,
      peers: perr,
    },
  };
}

sendFiles();
