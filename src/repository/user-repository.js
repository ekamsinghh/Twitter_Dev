import User from '../model/user.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findBy(data){
        try{
            const user= await User.findOne(data);
            return user;
        }
        catch(error){
            console.log("Something went wrong in repository");
            throw error;
        }
    }
}
export default UserRepository;