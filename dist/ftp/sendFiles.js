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
const getPeers_1 = require("../p2p/getPeers");
const ftpSendBuffer_1 = require("./ftpSendBuffer");
const readFile_1 = require("./readFile");
function sendFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("sendFiles Function Started");
        const readFile = (0, readFile_1.readFiles)(__dirname + "/files/.gitignore");
        const fileArray = [
            (yield readFile).peerOne,
            (yield readFile).peerTwo,
            (yield readFile).peerThree,
            (yield readFile).peerFour,
            (yield readFile).peerFive,
            (yield readFile).peerSix,
        ];
        console.log("peers calling..");
        const getPeersData = (0, getPeers_1.getPeers)();
        const peersUserId = (yield getPeersData).userIpData;
        const peersUserName = (yield getPeersData).hostNameData;
        //const peersUserIp = (await getPeers()).userIp;
        // This code will be update in the feature for sending files under the 6 peers
        const perr = peersUserId.slice(0, 6);
        const perrName = peersUserName.slice(0, 6);
        console.log(perr, peersUserId, getPeersData);
        for (let index = 0; index < perr.length; index++) {
            console.log("Send Peers Buffer Loop Start");
            const userIp = perr[index];
            const hostName = perrName[index];
            const fileArrayElement = fileArray[index];
            console.log(userIp.userIp, fileArrayElement);
            //createFile(element, ((await readFile) as any).peer + fileArrayElement);
            (0, ftpSendBuffer_1.sendFilesBuffer)((yield readFile).peerFile.fileHash + `-${index}`, fileArrayElement, hostName, userIp);
            console.log("File Sending...");
        }
        return {
            message: "File Sended Succesfully",
            data: {
                fileName: (yield readFile).peerFile.fileName,
                fileHash: (yield readFile).peerFile.fileHash,
                peers: perr,
            },
        };
    });
}
sendFiles();
