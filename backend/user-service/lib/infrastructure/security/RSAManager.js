import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import IRsaManager from "../../application/security/IRSAManagers.js"; 

dotenv.config(); // Load environment variables

const KEY_DIR = process.env.KEY_DIR || path.resolve('../../infrastructure/config/keys');
const PRIVATE_KEY_PATH = path.join(KEY_DIR, 'private.pem');
const PUBLIC_KEY_PATH = path.join(KEY_DIR, 'public.pem');

class RsaKeyManager extends IRsaManager { 
    constructor() {
        super();
        this.ensureKeysExist();
    }

    ensureKeysExist() {
        if (!fs.existsSync(KEY_DIR)) fs.mkdirSync(KEY_DIR, { recursive: true });

        if (!fs.existsSync(PRIVATE_KEY_PATH) || !fs.existsSync(PUBLIC_KEY_PATH)) {
            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
            });

            fs.writeFileSync(PRIVATE_KEY_PATH, privateKey, { mode: 0o600 });
            fs.writeFileSync(PUBLIC_KEY_PATH, publicKey, { mode: 0o644 });
        }
    }

    getPublicKey() {
        return fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');
    }

    getPrivateKey() {
        return fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
    }

    decryptWithPrivateKey(encryptedData) {
        try {
            const privateKey = this.getPrivateKey();
            const decryptedBuffer = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
                },
                Buffer.from(encryptedData, "base64")
            );

            return decryptedBuffer.toString("utf8");
        } catch (error) {
            console.error("Decryption failed:", error);
            throw new Error("Decryption failed. Check encryption process.");
        }
    }
}

const rsaKeyManagerInstance = new RsaKeyManager();
export default rsaKeyManagerInstance;

