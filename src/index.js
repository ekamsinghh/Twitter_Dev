const express = require('express');
const connect = require('./config/database');
const app = express();

const TweetService= require('./services/tweet-service');
const HashtagRepository = require('./repository/hashtag-repository');
const Comment = require('./model/comment');

app.listen(3000, async () => {
    console.log('server started');
    await connect();
    console.log('Mongo db connected');
    // const hashtagRepo = new HashtagRepository();
    // const tags= await hashtagRepo.findByName(['Trend','Python']);
    // console.log(tags);
    const tweetService = new TweetService();
    await tweetService.create({
        content: '#new start of the life.....#loveing it!!...#excited to explore more'
    });
});