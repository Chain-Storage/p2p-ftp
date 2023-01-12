import { ftp } from "./ftp";
import * as ftpClient from "basic-ftp";
import fs from "fs";
import { hostName } from "../accounts/account";

//ftp();

interface IsendFilesBuffer {
  message: string;
  data: {
    fileName: string;
    peers: string[];
  };
}

export async function sendFilesBuffer(
  fileName: string,
  buffer: string | Buffer | any,
  hostName: string,
  hostIp: string
): Promise<void> {
  console.log("sendFilesBuffer Function Started");

  const client = new ftpClient.Client();

  client.ftp.verbose = true;

  await client.access({
    host: hostIp,
    port: Number(process.env.PORT),
    user: hostName,
    password: `${process.env.PASSWORD}`,
    secure: false,
  });

  const fileBuffer = Buffer.from(buffer);

  fs.writeFile(fileName, fileBuffer, (data: any): void => {
    console.log(data);

    client.uploadFrom(fileName, data);
  });

  /*
  return {
    message: "file sended to peer",
    data: {
      fileName: "",
      peers: [],
    },
  };
  */
}
