import dotenv from "dotenv";
import { connect, model, Schema } from "mongoose";

export interface IgetPeers {
  message: string;
  error?: Error | string | boolean;
  userIpData: string[];
  hostNameData: string[];
}

console.log("getPeers Function Started");

dotenv.config();
// 4. Connect to MongoDB
async function dataBase() {
  await connect(`${process.env.MONGODB}`);
}

dataBase();

interface IUser {
  hostName: string;
  userIp: string;
  userId: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  hostName: { type: String, required: true },
  userIp: { type: String, required: true },
  userId: { type: String, required: true },
});

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);

// This Function will be update in the feature for sending files under the 6 peers
export async function getPeers(): Promise<IgetPeers> {
  const user: any = await User.find({});

  console.log(user);

  let userArray: string[] = [];
  let usersHostName: string[] = [];

  for (let index = 0; index < user.length; index++) {
    const element = user[index];

    userArray.push(element.userIp);
    usersHostName.push(element.hostName);
  }
  console.log("GetPeers Function End");

  return {
    message: "Peers Finded",
    userIpData: userArray,
    hostNameData: usersHostName,
  };
}
