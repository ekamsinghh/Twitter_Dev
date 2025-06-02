import UserRepository from '../repository/user-repository.js';

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data){
        try{
            const user= await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async getUserByEmail(email){
        try{
            const user= await this.userRepository.findBy({
                email : email
            });
            return user;
        }
        catch(error){
            console.log("Something went wrong in user service");
            throw error;
        }
    }

    async login(body){
        try{
            const user=await this.getUserByEmail(body.email);
            if(!user){
                throw{
                    message: "User not found"
                };
            }
            if(!user.comparePassword(body.password)){
                throw{
                    message: "Incorrect Password",
                    info: "Bad Credentials"
                };
            }
            const token=user.genJWT();
            return token;
        }
        catch(error){
            console.log("Something went wrong in service");
            throw error;
        }
    }
}

export default UserService;