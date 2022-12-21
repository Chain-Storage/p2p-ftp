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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.createPeer = void 0;
const mongoose_1 = require("mongoose");
const account_1 = require("../accounts/account");
const readFile_1 = require("../ftp/readFile");
const getPeers_1 = require("../p2p/getPeers");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    hostName: { type: String, required: true },
    userIp: { type: String, required: true },
    userId: { type: String, required: true },
});
// 3. Create a Model.
const User = (0, mongoose_1.model)("User", userSchema);
function createPeer(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)("mongodb://localhost:27017/ethursChain");
        const user = new User({
            hostName: (0, account_1.hostName)(),
            userIp: (0, getPeers_1.userIp)()[1],
            userId: userId,
        });
        yield user.save();
        console.log(user);
    });
}
exports.createPeer = createPeer;
// 2. Create a Schema corresponding to the document interface.
const fileSchema = new mongoose_1.Schema({
    buffer: { type: String, required: true },
});
// 3. Create a Model.
const File = (0, mongoose_1.model)("File", fileSchema);
function createFile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)("mongodb://localhost:27017/ethursChain");
        const file = new File({
            buffer: (0, readFile_1.readFiles)(__dirname + "/files/text.txt"),
        });
        yield file.save();
        console.log(file);
    });
}
exports.createFile = createFile;
