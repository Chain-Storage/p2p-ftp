import { getPeersDb } from "../database/getPeeers";
import * as ftpClient from "basic-ftp";

export interface IgetPeers {
  message: string;
  error?: Error | string;
  data: string[];
}

export async function getPeers(): Promise<IgetPeers> {
  const getpeers: any = getPeersDb();
  let userArray: string[] = [];

  const client = new ftpClient.Client();
  client.ftp.verbose = true;

  for (let index = 0; index < getpeers.length; index++) {
    const element = getpeers[index];

    const data = await client.access({
      host: `${element.userIp}`,
      port: Number(process.env.PORT),
      user: `${element.hostName}`,
      password: `${process.env.PASSWORD}`,
      secure: false,
    });

    if (!data) {
      console.log("This User not Connect the network");
    } else {
      userArray.push(element.userIp);
    }
  }

  return {
    message: "Peers Finded",
    data: userArray,
  };
}
