'use strict';

import User from '../../domain/entities/User.js';
import environment from '../../infrastructure/config/environment.js';

export default async ( email,username,phone, password , { userRepository, accessTokenManager, mailerService, passwordManager }) => {


  if (password.length < 8) {
    throw Object.assign(new Error("Password must be at least 8 characters long."), { statusCode: 403 });
  }

  const existingUsername = await userRepository.findByUsername(username);
  const existingEmail = await userRepository.findByEmail(email);

  if (existingEmail) {
    throw Object.assign(new Error("Email already exists."), { statusCode: 409 });
  }

  if (existingUsername) {
    throw Object.assign(new Error("Username already exists."), { statusCode: 409 });
  }

  // ✅ Generate Email Verification Token
  const verificationCode = await accessTokenManager.generate({ email: email }, '1h');
  const verificationLink = `${environment.FRONTEND_URL}/verify/${verificationCode}`;

  // ✅ Send Verification Email
  const mail = await mailerService.sendMail({
    to: email,
    subject: "<FITCOM/> :: Email Verification",
    html: `<p>Dear user,</p>
      <p>Thank you for registering! Please verify your email address by clicking <a href="${verificationLink}">here</a>.</p>
      <p>If the link doesn't work, copy and paste this URL into your browser:</p>
      <p>${verificationLink}</p>
      <p>Best regards,</p>
      <p>~ <b>FITCOM</b></p>`
  });

  if (!mail) {
    throw Object.assign(new Error("Could not send verification email"), { statusCode: 503 });
  }

  // ✅ Store user TEMPORARILY (not fully registered yet)
  const hashedPassword = await passwordManager.hash(password);
  const user = new User(null,username, email, hashedPassword,phone, false); // false = not verified
  const savedUser = await userRepository.persist(user);
  return {
    email: savedUser.email,
    username: savedUser.username,
    token: verificationCode
  };
};
