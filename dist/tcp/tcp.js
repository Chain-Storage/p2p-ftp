"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const discovery_swarm_1 = __importDefault(require("discovery-swarm"));
const dat_swarm_defaults_1 = __importDefault(require("dat-swarm-defaults"));
const get_port_1 = __importDefault(require("get-port"));
const readline_1 = __importDefault(require("readline"));
const mongoose_1 = require("mongoose");
const runDb_1 = require("../utils/runDb");
(0, runDb_1.runDb)();
const kittySchema = new mongoose_1.Schema({
    name: String,
});
const Kitten = (0, mongoose_1.model)("File", kittySchema);
/**
 * Here we will save our TCP peer connections
 * using the peer id as key: { peer_id: TCP_Connection }
 */
const peers = {};
// Counter for connections, used for identify connections
let connSeq = 0;
// Peer Identity, a random hash for identify your peer
const myId = crypto_1.default.randomBytes(32);
console.log("Your identity: " + myId.toString("hex"));
// reference to redline interface
let rl;
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
const askUser = () => __awaiter(void 0, void 0, void 0, function* () {
    rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Send message: ", (message) => {
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
});
/**
 * Default DNS and DHT servers
 * This servers are used for peer discovery and establishing connection
 */
const config = (0, dat_swarm_defaults_1.default)({
    // peer-id
    id: myId,
});
/**
 * discovery-swarm library establishes a TCP p2p connection and uses
 * discovery-channel library for peer discovery
 */
const sw = (0, discovery_swarm_1.default)(config);
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Choose a random unused port for listening TCP peer connections
    const port = yield (0, get_port_1.default)();
    sw.listen(port);
    console.log("Listening to port: " + port);
    /**
     * The channel we are connecting to.
     * Peers should discover other peers in this channel
     */
    sw.join("ethursChain-project-test-1");
    sw.on("connection", (conn, info) => {
        // Connection id
        const seq = connSeq;
        const peerId = info.id.toString("hex");
        // Keep alive TCP connection with peer
        if (info.initiator) {
            try {
                conn.setKeepAlive(true, 600);
            }
            catch (exception) { }
        }
        conn.on("data", (data) => {
            function findKittens() {
                return __awaiter(this, void 0, void 0, function* () {
                    const silence = new Kitten({ name: data.toString() });
                    yield silence.save();
                    console.log(silence);
                });
            }
            //"/Users/yusuf/Downloads/1660591078975-_1_.png"
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
}))();
