import { connect, model, Schema } from "mongoose";
import dotenv from "dotenv";
import { User } from "./peersDb";

export async function runDbWeb() {
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
  const user: any = User.find();

  if (typeof user === "undefined") {
    console.error("This device already have in Db");
    return false;
  }

  console.log(user);

  return user;
}
