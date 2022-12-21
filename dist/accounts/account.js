"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.hostName = void 0;
const peersDb_1 = require("../utils/peersDb");
const getPeers_1 = require("../p2p/getPeers");
const crypto_1 = __importDefault(require("crypto"));
const os_1 = __importDefault(require("os"));
function hostName() {
    const computerName = os_1.default.hostname();
    return computerName;
}
exports.hostName = hostName;
// İnit Comment
function createAccount() {
    let perrsArray = [];
    for (let index = 0; index < perrsArray.length; index++) {
        const element = perrsArray[index];
        perrsArray.push(element);
    }
    const userId = crypto_1.default.createHash("sha256").update((0, getPeers_1.userIp)()[1]).digest("hex");
    console.log(userId);
    (0, peersDb_1.createPeer)("Sc" + userId);
    return userId.toString();
}
exports.createAccount = createAccount;
createAccount();
