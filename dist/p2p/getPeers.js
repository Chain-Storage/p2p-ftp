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
exports.getPeers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
// This Function will be update in the feature for sending files under the 6 peers
function getPeers() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getPeers Function Started");
        dotenv_1.default.config();
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)(`${process.env.MONGODB}`);
        // 2. Create a Schema corresponding to the document interface.
        const userSchema = new mongoose_1.Schema({
            hostName: { type: String, required: true },
            userIp: { type: String, required: true },
            userId: { type: String, required: true },
        });
        // 3. Create a Model.
        const User = (0, mongoose_1.model)("User", userSchema);
        const user = yield User.find({});
        console.log(user);
        let userArray = [];
        let usersHostName = [];
        for (let index = 0; index < user.length; index++) {
            const element = user[index];
            userArray.push(element.userIp);
            usersHostName.push(element.hostName);
        }
        console.log("GetPeers Function End");
        return {
            message: "Peers Finded",
            userIpData: userArray,
            hostNameData: usersHostName,
        };
    });
}
exports.getPeers = getPeers;
