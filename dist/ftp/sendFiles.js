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
exports.sendFiles = void 0;
const filesDb_1 = require("../database/filesDb");
const getPeers_1 = require("../p2p/getPeers");
const ftpSendBuffer_1 = require("./ftpSendBuffer");
const readFile_1 = require("./readFile");
const fileArray = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "File",
];
function sendFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const readFile = (0, readFile_1.readFiles)(__dirname + "/files/Notion Setup 2.0.38.exe");
        const getPeersData = (0, getPeers_1.getPeers)();
        const peersUserId = (yield getPeersData).userId;
        //const peersUserIp = (await getPeers()).userIp;
        const perr = peersUserId.slice(0, 7);
        for (let index = 0; index < perr.length; index++) {
            const element = perr[index];
            const fileArrayElement = fileArray[index];
            console.log(element, fileArrayElement);
            (0, filesDb_1.createFile)(element, (yield readFile).peer + fileArrayElement);
            (0, ftpSendBuffer_1.sendFilesBuffer)((yield readFile).peerFile.fileName, element);
        }
        return {
            message: "File Sended Succesfully",
            data: {
                fileName: (yield readFile).peerFile.fileName,
                peers: [""],
            },
        };
    });
}
exports.sendFiles = sendFiles;
sendFiles();
