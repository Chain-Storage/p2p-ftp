import { createPeer } from "../utils/db";
import { userIp } from "../p2p/getPeers";
import crypto from "crypto";

// İnit Comment
export function createAccount(): string {
  let perrsArray: string[] = [];

  for (let index = 0; index < perrsArray.length; index++) {
    const element = perrsArray[index];
    perrsArray.push(element);
  }

  const userId = crypto.createHash("sha256").update(userIp()[1]).digest("hex");
  console.log(userId);

  createPeer(
    __dirname + "/userAccount",
    "peer-" + perrsArray.length,
    "Sc" + userId
  );

  return userId.toString();
}
