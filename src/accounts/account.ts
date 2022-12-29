import { createPeer } from "../database/peersDb";
import { userIp } from "../p2p/peerIp";
import crypto from "crypto";
import os from "os";
import ip from "ip";

declare const userError: Error;

interface IcreateAccount {
  data: string;
  error?: Error;
}

export function hostName(): string {
  const computerName: string = os.hostname();

  return computerName;
}

// İnit Comment
export async function createAccount(): Promise<IcreateAccount> {
  let perrsArray: string[] = [];

  for (let index = 0; index < perrsArray.length; index++) {
    const element = perrsArray[index];
    perrsArray.push(element);
  }

  const userId = crypto
    .createHash("sha256")
    .update((await userIp()).peerUserIp)
    .digest("hex");
  console.log(userId);

  createPeer("Ec" + userId);

  const userIps = ip.address(); // my ip address
  console.log(`Node ip package ip: ${userIps}`);

  const ipCheck = ip.isV4Format(userIps);

  if (!ipCheck) {
    console.error("User Ip Wrong");
    return {
      data: "null",
      error: userError,
    };
  }

  return {
    data: userId.toString(),
  };
}

createAccount();
