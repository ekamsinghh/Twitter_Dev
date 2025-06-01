import CommentService from '../services/comment-service.js';

const commentService = new CommentService();

export const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(req.query.modelId,req.query.modelType,req.body.userId,req.body.content);
        return res.status(201).json({
            message: 'Comment created successfully',
            data: comment,
            success: true,
            error: {}
        });
    } catch (error) {
        console.log("Error in Controller: ");
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong in comment creation',
            data: {},
            success: false,
            error: error
        });
    }
};