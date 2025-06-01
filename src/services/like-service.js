import {TweetRepository, HashtagRepository,LikeRepository,CommentRepository} from '../repository/index.js';

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId,modelType, userId) {
        try {
            if(modelType == 'Tweet'){ //* /api/v1/toggle?id=modelid&type=Tweet
                var likeable= await this.tweetRepository.find(modelId);
            }
            else if(modelType == 'Comment'){
                var likeable= await this.commentRepository.find(modelId);
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
            console.log("Error in like service: ")
            console.log(error);
            throw error;
        }

    }
}

export default LikeService;