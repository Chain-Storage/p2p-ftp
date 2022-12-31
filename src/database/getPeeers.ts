import { connect, model, Schema } from "mongoose";
import dotenv from "dotenv";

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
const User = model<IUser>("Userrr", userSchema);

export async function getPeers(): Promise<any> {
  const user: any = User.find();

  if (typeof user === "undefined") {
    console.error("This device already have in Db");
    return false;
  }

  console.log(user);

  return user;
}
