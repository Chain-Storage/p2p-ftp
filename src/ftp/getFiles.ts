import fs from "fs";
import { getPeers } from "../p2p/getPeers";
import * as ftpClient from "basic-ftp";
import { removeDuplicates } from "../utils/removeDuplicates";

interface IgetFiles {
  message: string;
  errCode?: number | Error;
  data: {
    status: string;
    buffer: Buffer | any;
  };
}

export async function getFiles(
  fileHash: string,
  fileName: string
): Promise<IgetFiles> {
  let fileData: any = [];
  const userIp = (await getPeers()).userIpData;
  const userHostName = (await getPeers()).hostNameData;

  console.log(userIp, userHostName);
  removeDuplicates(userIp);
  removeDuplicates(userHostName);

  console.log(userIp, userHostName);

  for (let index = 0; index < userIp.length; index++) {
    const userIpIndex = userIp[index];
    const hostNameIndex = userHostName[index];

    const client = new ftpClient.Client();

    client.ftp.verbose = true;

    await client
      .access({
        host: userIpIndex,
        port: Number(process.env.PORT),
        user: hostNameIndex,
        password: `${process.env.PASSWORD}`,
        secure: false,
      })
      .then((data: ftpClient.FTPResponse) => {
        console.log(data.code);
      })
      .catch((err: ftpClient.FTPResponse | Error | any) => {
        console.error(err);

        if (err.code === "ECONNREFUSED") {
          //process.exit(1);
          console.log("hello world");
        } else {
          console.log("No Waaaay!!!");
        }
      });

    for (let index = 0; index < 6; index++) {
      const file = await client
        .downloadTo(fileName, `${__dirname}/files/${fileName}-${index}`)
        .then((data: ftpClient.FTPResponse) => {
          console.log(data);
        })
        .catch((err: any) => {});
    }
  }

  for (let index: number = 0; index < 6; index++) {
    const data: any = fs.readFileSync(
      __dirname + `/files/${fileHash}-${index}`
    );

    fileData.push(data);
  }

  const fileBuffer = Buffer.concat(fileData);

  var readWriteFile = function (req: any) {
    var fs = require("fs");
    var data = Buffer.from(req);
    fs.writeFile(
      `${__dirname}/download/${fileName}`,
      data,
      "binary",
      function (err: any) {
        if (err) {
          console.log("There was an error writing the image");
        } else {
          console.log("The sheel file was written");
        }
      }
    );
  };

  readWriteFile(fileBuffer);

  return {
    message: "File Sended",
    data: {
      status: "Succesfully",
      buffer: fileBuffer,
    },
  };
}

getFiles(
  "Ecb63dfc5f50b4e447d706a3e549df2ef15228cc80189b976b475a2beeb84904bb",
  ".gitignore"
);
