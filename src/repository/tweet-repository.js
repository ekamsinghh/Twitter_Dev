import Tweet from '../model/tweet.js';
import CrudRepository from './crud-repository.js';
class TweetRepository extends CrudRepository{
    constructor(){
        super(Tweet);
    }

    async create(data){
        try{
            const tweet= await Tweet.create(data);
            return tweet;
        }
        catch(error){
            throw error;
        }
    }

    async getWithComments(id){
        try{
            const tweet=Tweet.findById(id).populate('comment').lean();
            //* populate will get the comments of a tweet since you already added the refrence of comment model
            //* lean is used to get the document in json format because initially we get the object in mongoose object format
            return tweet;
        }
        catch(err){
            console.log(err);
        }
    }
   
    async getAll(offset,limit){
        try{
            const tweet=await Tweet.find().skip(offset).limit(limit);
            return tweet;
        }
        catch(err){
            console.log(err);
        }
    }

    async find(id){
        try{
            const tweet= await Tweet.findById(id).populate({path: 'likes'});
            return tweet;
        }
        catch(error){
            throw error;
        }
    }
}

export default TweetRepository;