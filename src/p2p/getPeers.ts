import { getPeersDb, rundbweb } from "../database/getPeers";
import * as ftpClient from "basic-ftp";
import { User } from "../database/peersDb";

export interface IgetPeers {
  message: string;
  error?: Error | string | boolean;
  data: string[];
}

// This Function will be update in the feature for sending files under the 6 peers
export async function getPeers(): Promise<IgetPeers> {
  console.log("getPeers Function Started");

  const getpeers: any = getPeersDb();

  rundbweb();
  const user: any = User.find();

  /*
  if (typeof user === "undefined") {
    console.error("This device already in the Db");
    return {
      message: "",
      error: false,
      data: [],
    };
  }
  */

  console.log(user.userIp);
  let userArray: string[] = [];

  const client = new ftpClient.Client();
  client.ftp.verbose = true;

  for (let index = 0; index < getpeers.length; index++) {
    const element = getpeers[index];

    userArray.push(element.userIp);
  }
  console.log("GetPeers Function End");

  return {
    message: "Peers Finded",
    data: userArray,
  };
}
