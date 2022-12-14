import { Schema, model, connect } from "mongoose";
import { hostName } from "../accounts/account";
import { userIp } from "../p2p/peerIp";
import dotenv from "dotenv";

async function rundbweb() {
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

rundbweb();

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

async function checkPeer() {
  const user: any = User.findOne({ userId: (await userIp()).peerUserIp });

  if (typeof user === "undefined") {
    console.error("This device already have in Db");
    return false;
  }

  console.log(user);
}

export async function createPeer(userId: string) {
  checkPeer();

  const user = new User({
    hostName: hostName(),
    userIp: (await userIp()).peerUserIp,
    userId: userId,
  });

  await user.save();

  console.log(user);
}
