import fs from "fs";

async function getFiles(fileHash: string) {
  let fileData: any[] = [];

  for (let index = 0; index < 6; index++) {
    fs.readFile(
      __dirname + `/files/${fileHash}-${index}`,
      {
        encoding: "utf-8",
      },
      (err, data) => {
        console.log(data);
        fileData.push(data);
      }
    );
  }

  console.log(fileData);
}

getFiles("Ecb63dfc5f50b4e447d706a3e549df2ef15228cc80189b976b475a2beeb84904bb");
