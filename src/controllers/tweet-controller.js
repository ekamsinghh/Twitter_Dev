import TweetService from '../services/tweet-service.js';
import upload from '../config/file-upload-s3-config.js';

const tweetService = new TweetService();
const singleUploader= upload.single('image');//* this 'image' is the key that we will get from frontend inorder to upload image

export const createTweet = async (req, res) => {
    try {
        // singleUploader(req,res,function(err,data){
        //     if(err) {
        //         return res.status(500).json({error: err});
        //     }
        //     console.log('Image url is: ',req.file);
        // return res.status(200).json({
        //     message: 'Image uploaded successfully'
        // })
        // })
        const tweet = await tweetService.create(req.body);
        return res.status(201).json({
            message: 'Tweet created successfully',
            data: tweet,
            success: true,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong in tweet creation',
            data: {},
            success: false,
            error: error
        });
    }
};

export const getTweet = async (req, res) => {
    try {
        const tweet = await tweetService.getTweet(req.params.id);
        return res.status(201).json({
            message: 'Tweet fetched successfully',
            data: tweet,
            success: true,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to fetch tweet',
            data: {},
            success: false,
            error: error
        });
    }
};