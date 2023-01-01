import { connect, model, Schema } from "mongoose";
import dotenv from "dotenv";
import { User } from "./peersDb";

export async function rundbweb() {
  console.log("rundbweb Function Started");

  dotenv.config();
  // 4. Connect to MongoDB
  await connect(`${process.env.MONGODB}`)
    .then(() => {
      console.log("Database run succesfully");
    })
    .catch((err: Error) => {
      console.log(err);
    });
}

export async function getPeersDb(): Promise<any> {
  rundbweb();
  const user: any = User.find();

  if (typeof user === "undefined") {
    console.error("This device already in the Db");
    return false;
  }

  console.log(user.userIp);

  return user;
}
