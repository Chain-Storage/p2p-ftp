"use strict";

import FtpSrv from "ftp-srv";
import os, { networkInterfaces } from "os";
import fs from "fs";
import { userIp } from "../p2p/getPeers";

const ftpServer = new FtpSrv({
  url: userIp(),
  anonymous: true,
});

function closeServer() {
  ftpServer.on("disconnect", ({}) => {
    console.log("Server Closed");
  });
}

ftpServer.on(
  "login",
  (
    ftpLogin: { username: any; password: any },
    resolve: any,
    reject: any
  ): void => {
    const computerName: any = os.hostname();
    if (typeof computerName === "undefined") {
      closeServer();
      console.error("This Device Not support ftp server");
    }

    if (
      (ftpLogin.username === computerName &&
        ftpLogin.password === process.env.PASSWORD) ||
      "anonymous"
    ) {
      const dir = `${__dirname}/files`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      return resolve({
        root: `${__dirname}/files`,
      });
    }

    return closeServer();
  }
);

ftpServer.listen().then(() => {
  console.log("Ftp server is starting...");
});
