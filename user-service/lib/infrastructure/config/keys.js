const fs = require("fs");
const path = require("path");

// Load keys from the filesystem
const publicKeyPath = path.join(__dirname, "../../keys/public.pem");
const privateKeyPath = path.join(__dirname, "../../keys/private.pem");

const publicKey = fs.existsSync(publicKeyPath) ? fs.readFileSync(publicKeyPath, "utf8") : null;
const privateKey = fs.existsSync(privateKeyPath) ? fs.readFileSync(privateKeyPath, "utf8") : null;

module.exports = { publicKey, privateKey };
