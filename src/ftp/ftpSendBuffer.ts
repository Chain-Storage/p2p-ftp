import { ftp } from "./ftp";
import * as ftps from "basic-ftp";

ftp();

interface IsendFilesBuffer {
  message: string;
  data: {
    fileName: string;
    peers: string[];
  };
}

export async function sendFilesBuffer(
  fileName: string,
  buffer: string
): Promise<IsendFilesBuffer> {
  const client = new ftps.Client();

  client.ftp.verbose = true;

  await client.access({
    host: `${process.env.HOST}`,
    port: Number(process.env.PORT),
    user: "yurikaza",
    password: `${process.env.PASSWORD}`,
    secure: false,
  });

  client.uploadFrom(fileName, buffer);

  return {
    message: "file sended to peer",
    data: {
      fileName: "",
      peers: [],
    },
  };
}
