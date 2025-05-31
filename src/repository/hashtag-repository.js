import Hashtag from '../model/hashtags.js';

class HashtagRepository{
    async create(data){
        try{
            const tag= await Hashtag.create(data);
            return tag;
        }
        catch(error){
            console.log(error);
        }
    }

    async bulkCreate(data){
        try{
            const tags= await Hashtag.insertMany(data);
            return tags;
        }
        catch(error){
            console.log(error);
        }
    }

    async get(id){
        try{
            const tag=Hashtag.findById(id);
            return tag;
        }
        catch(error){
            console.log(error);
        }
    }

    async destroy(id){
        try{
            const response=Hashtag.findByIdAndRemove(id);
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
    
    async getAll(offset,limit){
        try{
            const tag=await Hashtag.find().skip(offset).limit(limit);
            return tag;
        }
        catch(error){
            console.log(error);
        }
    }

    async findByName(titleList){
        try{
            const tags = await Hashtag.find({
                title: titleList
            });//* ".select('title -_id')" , this select functionality will give you only the titles in return
            return tags;
        }
        catch(error){
            console.log(error);
        }
    }
}

export default HashtagRepository;