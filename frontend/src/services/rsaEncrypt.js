import forge from "node-forge";

// Function to encrypt data using a dynamic public key
export const encryptData = (data, publicKey) => {
    try {
        if (!publicKey) {
            throw new Error("Public key is missing");
        }

        const rsa = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`);
        return forge.util.encode64(rsa.encrypt(JSON.stringify(data)));
    } catch (error) {
        console.error("Encryption failed:", error);
        return null;
    }
};
