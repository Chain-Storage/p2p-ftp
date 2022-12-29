import { getPeers, IgetPeers } from "../p2p/getPeers";
import { readFiles } from "./readFile";

export async function sendFiles() {
  readFiles(__dirname + "/files/Notion Setup 2.0.38.exe");

  const getPeersData: Promise<IgetPeers> = getPeers();

  const peersUserId = (await getPeers()).userId;
  const peersUserIp = (await getPeers()).userIp;

  for (let index = 0; index < peersUserId.length; index++) {
    const element = peersUserId[index];
    console.log(element);
  }
}

sendFiles();
