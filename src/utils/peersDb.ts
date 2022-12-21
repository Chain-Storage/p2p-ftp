import { Schema, model } from "mongoose";
import { hostName } from "../accounts/account";
import { userIp } from "../p2p/getPeers";
import { runDb } from "./runDb";

runDb();

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
const User = model<IUser>("User", userSchema);

export async function createPeer(userId: string) {
  checkPeer();

  const user = new User({
    hostName: hostName(),
    userIp: userIp()[1],
    userId: userId,
  });

  await user.save();

  console.log(user);
}

async function checkPeer() {
  const user: any = User.findOne({ userId: userIp()[1] });

  if (typeof user === "undefined") {
    console.error("This device already have in Db");
    return false;
  }

  console.log(user);
}
