import os, { networkInterfaces } from "os";

interface resultsI extends String {
  wlp8s0: any;
}

interface IuserIp {
  peerHostUrl: string;
  peerUserIp: string;
}

export async function userIp(): Promise<IuserIp> {
  const nets: any = networkInterfaces();
  const results: resultsI | any = Object.create(null);

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  console.log(results);

  let hostUrl: string = "";
  let userIp: string = "";
  const port = 9001;

  if (os.type() === "Windows_NT") {
    hostUrl = `ftp://${results["VirtualBox Host-Only Network"][0]}:` + port;
    userIp = results["VirtualBox Host-Only Network"][0];
  } else if (os.type() === "Linux") {
    hostUrl = `ftp://${results.wlp8s0[0]}:` + port;
    userIp = results.wlp8s0[0];
  } else {
    console.error("This ftp server only support Windows and Linux");
  }

  console.log(hostUrl);

  return {
    peerHostUrl: hostUrl,
    peerUserIp: userIp,
  };
}
