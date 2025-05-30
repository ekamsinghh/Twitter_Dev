const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max:[250, 'Tweet cannot be more than 250 characters']//* this is like you are setting character limit on the content of the tweet and what does the error message mean
    },
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, {timestamps: true});

// tweetSchema.pre('save' , function(next) {
//     console.log("Inside a hook");
//     next();
// });//* A Hook

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;