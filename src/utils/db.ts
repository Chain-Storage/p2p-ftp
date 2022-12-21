import { Schema, model, connect } from "mongoose";
import { hostName } from "../accounts/account";
import { readFiles } from "../ftp/readFile";
import { userIp } from "../p2p/getPeers";

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
  // 4. Connect to MongoDB
  await connect("mongodb://localhost:27017/ethursChain");

  const user = new User({
    hostName: hostName(),
    userIp: userIp()[1],
    userId: userId,
  });
  await user.save();

  console.log(user);
}

interface IFile {
  buffer: string;
}

// 2. Create a Schema corresponding to the document interface.
const fileSchema = new Schema<IFile>({
  buffer: { type: String, required: true },
});

// 3. Create a Model.
const File = model<IFile>("File", fileSchema);

export async function createFile(userId: string) {
  // 4. Connect to MongoDB
  await connect("mongodb://localhost:27017/ethursChain");

  const file = new File({
    buffer: readFiles(__dirname + "/files/text.txt"),
  });
  await file.save();

  console.log(file);
}
