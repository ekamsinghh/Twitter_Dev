const Tweet= require('../model/tweet');

class TweetRepository{
    async create(data){
        try{
            const tweet= await Tweet.create(data);
            return tweet;
        }
        catch(err){
            console.log(err);
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
    async get(id){
        try{
            const tweet=Tweet.findById(id);
            return tweet;
        }
        catch(err){
            console.log(err);
        }
    }

    async destroy(id){
        try{
            const response=Tweet.findByIdAndRemove(id);
            return response;
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
}

module.exports=TweetRepository;