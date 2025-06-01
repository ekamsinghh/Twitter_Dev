import LikeService from '../services/like-service.js';

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
        return res.status(201).json({
            message: 'Like toggled successfully',
            data: response,
            success: true,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong in toggling like',
            data: {},
            success: false,
            error: error
        });
    }
};