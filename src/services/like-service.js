import {TweetRepository, HashtagRepository,LikeRepository} from '../repository/index.js';

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId,modelType, userId) {
        try {
            if(modelType == 'Tweet'){ //* /api/v1/toggle?id=modelid&type=Tweet
                var likeable= await this.tweetRepository.find(modelId);
            }
            else if(modelType == 'Comment'){
                //TODO
            }
            else{
                throw new Error("Invalid model type");
            }
            const exists=await this.likeRepository.findByUserAndLikeable({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            if(exists){
                likeable.likes.pull(exists.id);
                await likeable.save();
                await this.likeRepository.destroy(exists.id);
                var isRemoved=true;
            }
            else{
                const newLike= await this.likeRepository.create({
                    user: userId,
                    onModel: modelType,
                    likeable: modelId
                });
                likeable.likes.push(newLike.id);
                await likeable.save();
                var isRemoved=false;
            }
            return isRemoved;
        }
        catch (error) {
            throw error;
        }

    }
}

export default LikeService;