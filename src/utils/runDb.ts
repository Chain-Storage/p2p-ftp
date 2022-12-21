import { connect } from "mongoose";

export async function runDb() {
  // 4. Connect to MongoDB
  await connect("mongodb://localhost:27017/ethursChain")
    .then((data) => {
      console.log("Database run succesfully");
    })
    .catch((err: Error) => {
      console.log(err);
    });
}
