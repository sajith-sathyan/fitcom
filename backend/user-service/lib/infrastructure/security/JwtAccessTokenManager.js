import IAccessTokenManager from "../../application/security/IAccessTokenManager.js";
import env from "../config/environment.js";
import jwt from "jsonwebtoken";

export default class extends IAccessTokenManager {
  generate(payload, expiry) {
    return jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: expiry });
  }

  decode(accessToken) {
    return jwt.verify(accessToken, env.JWT_SECRET_KEY);
  }
}
