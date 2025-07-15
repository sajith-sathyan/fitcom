// Use Cases (Business Logic)
import RegisterUserInteractor from "../../application/use-cases/RegisterUser.js";
import AuthUserViaGoogleInteractor from '../../application/use-cases/AuthUserViaGoogle.js';
import LoginUserInteractor from '../../application/use-cases/LoginUserInteractor.js';

// Repositories (Database Abstraction)
import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";

// Security (JWT / Hashing Abstraction)
import AccessTokenManager from "../../infrastructure/security/JwtAccessTokenManager.js";
import PasswordManager from "../../infrastructure/security/BcryptPasswordManager.js";

// Security (JWT / Hashing Abstraction)
// import rsaKeyManager from "../../infrastructure/security/RSAManager.js"; // ✅ Correct
import MailerService from '../../infrastructure/service/ResendMailerService.js';
import GoogleOAuthManager from '../../infrastructure/security/GoogleOAuthManager.js';

const userRepository = new UserRepository();
const accessTokenManager = new AccessTokenManager();
const passwordManager = new PasswordManager();
const mailerService = new MailerService();
const googleOAuthManager = new GoogleOAuthManager();



export async function LoginUser(req, res) {
  const { email, password } = req.body;
  try {
    const response = await LoginUserInteractor(email, password, {
      userRepository: userRepository,
      tokenManager: accessTokenManager,
      passwordManager: passwordManager,
    });

    if (response.success) {
      res.cookie('jwt', response.token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        secure: true, 
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
  
      res.status(200).send({ message: "You are in.", token: response.token, email: response?.email, username: response?.username, userId: response?.userId });
    } else {
      res.status(200).send({ mfa_required: true, message: "OTP Required" });
    }
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).send({ message: err.message });
  }
}

export async function RegisterUser(req, res) {
  const { email, username, phone, password } = req.body;
  console.log(req.body)
  try {
    const response = await RegisterUserInteractor(email,username, phone, password, {
      userRepository: userRepository,
      accessTokenManager: accessTokenManager,
      mailerService: mailerService,
      passwordManager: passwordManager,
    });
    console.log(response)
    if (response) {
      res.cookie('jwt', response, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      console.log("*******",response.token,response?.email,response?.username )

      res.status(200).send({ message: "You are in.", token: response.token,email:response?.email,username:response?.username });
    }

    // res.status(201).json({ message: "Registered successfully, verify email." });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}



export async function AuthUserViaGoogle(req, res) {

  try {
    const code = req.query.code;

    // If they register via Github, they would be automatically logged in.
    // todo: It should be AuthUserViaOAuth
    const accessToken = await AuthUserViaGoogleInteractor(code, {
      userRepository: userRepository,
      tokenManager: accessTokenManager,
      OAuthManager: googleOAuthManager
      // todo: mailerService
    });


    res.cookie('jwt', accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== 'development',
      // sameSite: 'strict',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: "Registered successfully, verify email.", token: accessToken });
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
}

export async function LogoutUser(req,res) {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none'
});
res.json({ success: true });
} 


