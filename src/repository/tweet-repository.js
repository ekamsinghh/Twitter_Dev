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

    async update(id,data){
        try{
            const tweet=Tweet.findByIdAndUpdate(id,data,{new:true});
            //* findByIdAndUpdate returns the old document only instead of new updated document
            //* in order to get the new updated document in return you use {new:true}
            return tweet;
        }
        catch(err){
            console.log(err);
        }
    }

    async destroy(id){
        try{
            const tweet=Tweet.findByIdAndRemove(id);
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
}

module.exports=TweetRepository;