import express from 'express';
import{ createTweet, getTweet } from '../../controllers/tweet-controller.js';
import { toggleLike } from '../../controllers/like-controller.js';
import{ signUp } from '../../controllers/auth-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
const router= express.Router();

//* Tweets
router.post('/tweets', createTweet);
router.get('/tweets/:id', getTweet);

//* Users
router.post('/signup', signUp);

//* Likes
router.post('/likes/toggle', toggleLike);

//* Comments
router.post('/comments', createComment);

export default router;