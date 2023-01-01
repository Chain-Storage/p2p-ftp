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
    __dirname + "/files/.gitignore"
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

  const peersUserId: string[] = (await getPeersData).userIpData;
  const peersUserName: string[] = (await getPeersData).hostNameData;
  //const peersUserIp = (await getPeers()).userIp;

  // This code will be update in the feature for sending files under the 6 peers
  const perr: any = peersUserId.slice(0, 6);
  const perrName: any = peersUserName.slice(0, 6);

  console.log(perr, peersUserId, getPeersData);

  for (let index = 0; index < perr.length; index++) {
    console.log("Send Peers Buffer Loop Start");

    const userIp = perr[index];
    const hostName = perrName[index];
    const fileArrayElement = fileArray[index];

    console.log(userIp.userIp, fileArrayElement);

    //createFile(element, ((await readFile) as any).peer + fileArrayElement);
    sendFilesBuffer(
      (await readFile).peerFile.fileHash + `-${index}`,
      fileArrayElement,
      hostName,
      userIp
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
