import TweetService from '../services/tweet-service.js';

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        const tweet = await tweetService.create(req.body);
        return res.status(201).json({
            message: 'Tweet created successfully',
            data: tweet,
            success: true,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong in tweet creation',
            data: {},
            success: false,
            error: error
        });
    }
};