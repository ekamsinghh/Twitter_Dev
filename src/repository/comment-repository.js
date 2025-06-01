import Comment from '../model/comment.js';
import CrudRepository from './crud-repository.js';

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async find(id){
        try{
            const comment= await Comment.findById(id).populate({path: 'comments'});
            return comment;
        }
        catch(error){
            throw error;
        }
    }
}

export default CommentRepository;