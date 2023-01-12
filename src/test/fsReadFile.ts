import fs from "fs";

fs.readFile("../src/ftp/files/Screenshot (5).png", (data: any): void => {
  console.log(data);
});
