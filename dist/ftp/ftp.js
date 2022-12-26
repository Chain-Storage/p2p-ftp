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
exports.ftp = void 0;
const ftp_srv_1 = __importDefault(require("ftp-srv"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const peerIp_1 = require("../p2p/peerIp");
function ftp() {
    return __awaiter(this, void 0, void 0, function* () {
        const ftpServer = new ftp_srv_1.default({
            url: (yield (0, peerIp_1.userIp)()).peerHostUrl,
            anonymous: true,
        });
        function closeServer() {
            ftpServer.on("disconnect", ({}) => {
                console.log("Server Closed");
            });
        }
        ftpServer.on("login", (ftpLogin, resolve, reject) => {
            const computerName = os_1.default.hostname();
            if (typeof computerName === "undefined") {
                closeServer();
                console.error("This Device Not support ftp server");
            }
            if ((ftpLogin.username === computerName &&
                ftpLogin.password === process.env.PASSWORD) ||
                "MirzaYusufulOnur23041920.27051960.09031971") {
                const dir = `${__dirname}/files`;
                if (!fs_1.default.existsSync(dir)) {
                    fs_1.default.mkdirSync(dir);
                }
                return resolve({
                    root: `${__dirname}/files`,
                });
            }
            return closeServer();
        });
        ftpServer.listen().then(() => {
            console.log("Ftp server is starting...");
        });
    });
}
exports.ftp = ftp;
ftp();
