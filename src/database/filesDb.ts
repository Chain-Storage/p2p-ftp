import { Schema, model, connect } from "mongoose";
import { readFiles } from "../ftp/readFile";
import { runDb } from "./runDb";

runDb();

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
