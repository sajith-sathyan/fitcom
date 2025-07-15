'use strict';

export default async function AuthUser(email, password, {
  userRepository,
  tokenManager,
  passwordManager,
  // reserved for email notifications (optional)
}) {
  // Try finding user by username or email
  const user = await userRepository.findByEmail(email);
  console.log(user)

  if (!user) {
    throw Object.assign(new Error('User not exist'), { statusCode: 401 });
  }

  // Validate password
  const isPasswordValid = await passwordManager.compare(password, user.password);
  if (!isPasswordValid) {

    throw Object.assign(new Error('Invalid  password'), { statusCode: 401 });
  }

  // Optional: Check email verification status
  // if (!user.emailVerified) {
  //   throw Object.assign(new Error('Email not verified'), { statusCode: 403 });
  // }

  // Generate access token
  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  const accessToken = tokenManager.generate(tokenPayload, '7d');

  return {
    success: true,
    token: accessToken,
    status: "LOGGED_IN",
    email: user.email,
    username: user.username,
    userId:user.id ||user._id
  };
}
