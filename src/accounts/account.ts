import { createPeer } from "../utils/peersDb";
import { userIp } from "../p2p/getPeers";
import crypto from "crypto";
import os from "os";

export function hostName(): string {
  const computerName: string = os.hostname();

  return computerName;
}

// İnit Comment
export function createAccount(): string {
  let perrsArray: string[] = [];

  for (let index = 0; index < perrsArray.length; index++) {
    const element = perrsArray[index];
    perrsArray.push(element);
  }

  const userId = crypto.createHash("sha256").update(userIp()[1]).digest("hex");
  console.log(userId);

  createPeer("Sc" + userId);

  return userId.toString();
}

createAccount();
