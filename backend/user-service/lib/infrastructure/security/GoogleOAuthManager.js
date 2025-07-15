import IOAuthManager from '../../application/security/IOAuthManager.js';
import axios from 'axios';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import slugify from 'slugify';
import crypto from 'crypto';

import User from '../../domain/entities/User.js';
import env from '../../infrastructure/config/environment.js';

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_OAUTH_CLIENT_ID,
  env.GOOGLE_OAUTH_CLIENT_SECRET,
  'postmessage'
);

export default class extends IOAuthManager {
  async getUser(code) {
    console.log("code--------->",code)
    try {
      // Step 1: Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const idToken = tokens.id_token;
      const googleUser = jwt.decode(idToken);

      if (!googleUser.email_verified) {
        return null;
      }

      const userName = slugify(googleUser.name, { lower: true });
      const userEmail = googleUser.email;
      const dummyPassword = crypto.randomBytes(8).toString('hex');

      const user = new User(null, userName, userEmail, dummyPassword);
      user.emailVerified = true;

      return user;

    } catch (err) {
      console.error('❌ Failed to fetch user from Google:', err.response?.data || err.message);
      throw new Error('Failed to get Google user');
    }
  }
}