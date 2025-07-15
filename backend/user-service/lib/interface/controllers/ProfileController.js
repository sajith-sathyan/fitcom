import RetrieveProfileInteractor from '../../application/use-cases/RetrieveProfile.js';
import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";
import EditUserInteractor from "../../application/use-cases/EditUser.js";
import PasswordManager from '../../infrastructure/security/BcryptPasswordManager.js';

const userRepository = new UserRepository();
const passwordManager = new PasswordManager();

export async function GetProfile(req, res) {
    const { email } = req.params;
    try {
        const userProfile = await RetrieveProfileInteractor(email, { userRepository: userRepository });
        res.status(200).send(userProfile);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message })
    }

}

export async function  EditProfile(req,res) {
    const { email } = req.params;
    try{
        const state = await EditUserInteractor(email, req.body, { userRepository });
        console.log('state',state)
        res.sendStatus(204);
    }catch(err){
        res.status(err.statusCode || 500).send({ message: err.message })
    }
}