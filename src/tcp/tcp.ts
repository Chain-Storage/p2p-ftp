import crypto from "crypto";
import Swarm from "discovery-swarm";
import defaults from "dat-swarm-defaults";
import getPort from "get-port";
import readline from "readline";
import { connect, model, Schema } from "mongoose";
import fs from "fs";

main().catch((err) => console.log(err));

async function main() {
  await connect("mongodb://localhost:27017/digiathonProject");
}

const kittySchema = new Schema({
  name: String,
});

const Kitten = model("File", kittySchema);

/**
 * Here we will save our TCP peer connections
 * using the peer id as key: { peer_id: TCP_Connection }
 */
const peers: any = {};
// Counter for connections, used for identify connections
let connSeq = 0;

// Peer Identity, a random hash for identify your peer
const myId = crypto.randomBytes(32);
console.log("Your identity: " + myId.toString("hex"));

// reference to redline interface
let rl: any;
/**
 * Function for safely call console.log with readline interface active
 */
function log() {
  if (rl) {
    rl.clearLine();
    rl.close();
    rl = undefined;
  }
  for (let i = 0, len = arguments.length; i < len; i++) {
    console.log(arguments[i]);
  }
  askUser();
}

/*
 * Function to get text input from user and send it to other peers
 * Like a chat :)
 */
const askUser = async () => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Send message: ", (message: any) => {
    // Broadcast to peers
    for (let id in peers) {
      console.log(peers.length);
      if (id === id) {
        peers[id].conn.write(message);
      }
    }

    rl.close();
    rl = undefined;
    askUser();
  });
};

/**
 * Default DNS and DHT servers
 * This servers are used for peer discovery and establishing connection
 */
const config = defaults({
  // peer-id
  id: myId,
});

/**
 * discovery-swarm library establishes a TCP p2p connection and uses
 * discovery-channel library for peer discovery
 */
const sw = Swarm(config);

(async () => {
  // Choose a random unused port for listening TCP peer connections
  const port = await getPort();

  sw.listen(port);
  console.log("Listening to port: " + port);

  /**
   * The channel we are connecting to.
   * Peers should discover other peers in this channel
   */
  sw.join("refi-digiathon-project-test-1");

  sw.on("connection", (conn: any, info: any) => {
    // Connection id
    const seq = connSeq;

    const peerId = info.id.toString("hex");

    // Keep alive TCP connection with peer
    if (info.initiator) {
      try {
        conn.setKeepAlive(true, 600);
      } catch (exception) {}
    }

    conn.on("data", (data: any) => {
      async function findKittens() {
        const silence = new Kitten({ name: data.toString() });
        await silence.save();
        console.log(silence);
      }

      //"/Users/yusuf/Downloads/1660591078975-_1_.png"
      fs.readFile(data.toString(), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`received data: ${data.toString().length}`);
        console.log(`received data per peer: ${data.toString().length / 4}`);
        console.log(
          `First Peer: ${data.toString().substr(1, data.toString().length / 4)}`
        );
        console.log(
          `Second Peer: ${data
            .toString()
            .substr(
              data.toString().length / 4 + 1,
              (data.toString().length / 4) * 2
            )}`
        );
        console.log(
          `Third Peer: ${data
            .toString()
            .substr(
              (data.toString().length / 4) * 2 + 1,
              (data.toString().length / 4) * 3
            )}`
        );
        console.log(
          `Fourth Peer: ${data
            .toString()
            .substr(
              (data.toString().length / 4) * 3 + 1,
              data.toString().length / 4
            )}`
        );
      });

      findKittens();
      // Here we handle incomming messages
    });

    conn.on("close", () => {
      // Here we handle peer disconnection
      // log(`Connection ${seq} closed, peer id: ${peerId}`);
      // If the closing connection is the last connection with the peer, removes the peer
      if (peers[peerId].seq === seq) {
        delete peers[peerId];
      }
    });

    // Save the connection
    if (!peers[peerId]) {
      peers[peerId] = {};
    }
    peers[peerId].conn = conn;
    peers[peerId].seq = seq;
    connSeq++;
  });

  // Read user message from command line
  askUser();
})();
