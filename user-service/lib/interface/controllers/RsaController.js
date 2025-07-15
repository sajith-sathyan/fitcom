import RsaKeyManager from '../../infrastructure/security/RSAManager.js';

export async function getPublicKey(req, res) {
    try {
        const publicKey = RsaKeyManager.getPublicKey();
        res.status(200).send({ publicKey });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving public key", error: error.message });
    }
}
