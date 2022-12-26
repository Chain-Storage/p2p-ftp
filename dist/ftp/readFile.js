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
exports.readFiles = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
function readFiles(pathName) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(pathName);
        const buffer = (0, fs_1.readFileSync)(filePath);
        const fileName = path_1.default.basename(pathName);
        console.log(fileName);
        console.log(buffer);
        function mySplit(a, delimiter) {
            const result = [];
            let currentToken = [];
            for (let i = 0; i < a.length; i++) {
                if (a[i] === delimiter) {
                    if (currentToken.length !== 0)
                        result.push(currentToken);
                    currentToken = [];
                }
                else {
                    currentToken.push(a[i]);
                }
            }
            if (currentToken.length !== 0)
                result.push(currentToken);
            return result;
        }
        const fileData = mySplit(buffer, -1)[0];
        const fileDataLenght1 = Math.trunc(fileData.length / 6);
        const fileDataLenght2 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght1);
        const fileDataLenght3 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght2);
        const fileDataLenght4 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght3);
        const fileDataLenght5 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght4);
        const fileDataLenght6 = fileData.length;
        // User Ip Array
        //const peersIpArray: string = (await userIp()).peerHostUrl;
        // User Ip commnet
        let peersLenghtArray = [
            0,
            fileDataLenght1,
            fileDataLenght2,
            fileDataLenght3,
            fileDataLenght4,
            fileDataLenght5,
            fileDataLenght6,
        ];
        console.log(fileData);
        const fileHash = crypto_1.default
            .createHash("sha256")
            .update(buffer)
            .digest("hex");
        console.log(fileHash);
        let peersObject = {
            peerOne: fileData.slice(0, fileDataLenght1),
            peerTwo: fileData.slice(fileDataLenght1, fileDataLenght2),
            peerThree: fileData.slice(fileDataLenght2, fileDataLenght3),
            peerFour: fileData.slice(fileDataLenght3, fileDataLenght4),
            peerFive: fileData.slice(fileDataLenght4, fileDataLenght5),
            peerSix: fileData.slice(fileDataLenght5, fileDataLenght6),
            peerFile: {
                fileName: fileName,
                fileHash: "Ec" + fileHash,
            },
        };
        console.log(peersObject);
        return peersObject;
    });
}
exports.readFiles = readFiles;
readFiles(__dirname + "/files/Notion Setup 2.0.38.exe");
