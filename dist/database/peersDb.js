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
exports.createPeer = exports.User = void 0;
const mongoose_1 = require("mongoose");
const account_1 = require("../accounts/account");
const peerIp_1 = require("../p2p/peerIp");
const dotenv_1 = __importDefault(require("dotenv"));
function rundbweb() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)(`${process.env.MONGODB}`)
            .then(() => {
            console.log("Database run succesfully");
        })
            .catch((err) => {
            console.log(err);
        });
    });
}
rundbweb();
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    hostName: { type: String, required: true },
    userIp: { type: String, required: true },
    userId: { type: String, required: true },
});
// 3. Create a Model.
exports.User = (0, mongoose_1.model)("User", userSchema);
function checkPeer() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = exports.User.findOne({ userId: (yield (0, peerIp_1.userIp)()).peerUserIp });
        if (typeof user === "undefined") {
            console.error("This device already have in Db");
            return false;
        }
        console.log(user);
    });
}
function createPeer(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        checkPeer();
        const user = new exports.User({
            hostName: (0, account_1.hostName)(),
            userIp: (yield (0, peerIp_1.userIp)()).peerUserIp,
            userId: userId,
        });
        yield user.save();
        console.log(user);
    });
}
exports.createPeer = createPeer;
