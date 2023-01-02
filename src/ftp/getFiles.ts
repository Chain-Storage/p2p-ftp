import fs from "fs";

export async function getFiles(
  fileHash: string,
  fileName: string
): Promise<void> {
  let fileData: any[] = [];

  for (let index: number = 0; index < 6; index++) {
    const data: any = fs.readFileSync(
      __dirname + `/files/${fileHash}-${index}`,
      {
        encoding: "utf-8",
        flag: "r",
      }
    );

    const buff = Buffer.from(data, "utf-8");
    console.log(buff);

    fileData.push(buff);
  }

  console.log(fileData);

  const newBuffer = Buffer.concat(fileData);
  console.log(newBuffer);

  fs.writeFileSync(`${__dirname}/files/${fileName}`, newBuffer);
}

getFiles(
  "Ecb63dfc5f50b4e447d706a3e549df2ef15228cc80189b976b475a2beeb84904bb",
  ".gitignore"
);
