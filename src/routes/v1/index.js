import express from 'express';
import{ createTweet, getTweet } from '../../controllers/tweet-controller.js';
import { toggleLike } from '../../controllers/like-controller.js';
import{ signUp, login } from '../../controllers/auth-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { authenticate }  from '../../middlewares/authenticate.js';

const router= express.Router();

//* Tweets
router.post('/tweets', authenticate , createTweet);
router.get('/tweets/:id', getTweet);

//* Users
router.post('/signup', signUp);
router.post('/login',login)

//* Likes
router.post('/likes/toggle', toggleLike);

//* Comments
router.post('/comments', createComment);

export default router;