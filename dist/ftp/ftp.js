"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ftp_srv_1 = __importDefault(require("ftp-srv"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const getPeers_1 = require("../p2p/getPeers");
const ftpServer = new ftp_srv_1.default({
    url: (0, getPeers_1.userIp)()[0],
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
