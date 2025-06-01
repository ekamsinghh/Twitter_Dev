import CommentRepository from '../repository/comment-repository.js';
import TweetRepository from '../repository/tweet-repository.js';

class CommentService{
    constructor(){
        this.commentrepository= new CommentRepository();
        this.tweetrepository= new TweetRepository();
    }

    async createComment(modelId, modelType , userId, content){
        try{
            if(modelType == 'Tweet'){ 
                var commentable= await this.tweetrepository.find(modelId);
            }
            else if(modelType == 'Comment'){
                var commentable= await this.commentrepository.find(modelId);
            }
            else{
                throw new Error("Invalid model type");
            }
            const comment= await this.commentrepository.create({
                userId: userId,
                content: content,
                onModel: modelType,
                commentable: modelId,
                comments: []
            });
            commentable.comments.push(comment.id);
            await commentable.save();
            return comment;
        }
        catch(error){
            console.log("Error in Service: ");
            console.log(error);
            throw error;
        }
    }
}

export default CommentService;