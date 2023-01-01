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
exports.createAccount = exports.hostName = void 0;
const peersDb_1 = require("../database/peersDb");
const peerIp_1 = require("../p2p/peerIp");
const crypto_1 = __importDefault(require("crypto"));
const os_1 = __importDefault(require("os"));
const ip_1 = __importDefault(require("ip"));
function hostName() {
    const computerName = os_1.default.hostname();
    return computerName;
}
exports.hostName = hostName;
// İnit Comment
function createAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        let perrsArray = [];
        for (let index = 0; index < perrsArray.length; index++) {
            const element = perrsArray[index];
            perrsArray.push(element);
        }
        const userId = crypto_1.default
            .createHash("sha256")
            .update((yield (0, peerIp_1.userIp)()).peerUserIp)
            .digest("hex");
        console.log(userId);
        (0, peersDb_1.createPeer)("Ec" + userId);
        const userIps = ip_1.default.address(); // my ip address
        console.log(`Node ip: ${userIps}`);
        const ipCheck = ip_1.default.isV4Format(userIps);
        if (!ipCheck) {
            console.error("User Ip Wrong");
            return {
                data: "null",
                error: userError,
            };
        }
        return {
            data: userId.toString(),
        };
    });
}
exports.createAccount = createAccount;
createAccount();
