const { TweetRepository, HashtagRepository } = require('../repository/index');

class TweetService {
    constructor(){
        this.tweetrepo= new TweetRepository();
        this.hashtagrepo= new HashtagRepository();
    }

    async create(data){
        //* Collecting the hashtag from the content using Regular Expression
        try{
            const content=data.content;
            let tags= content.match(/#[a-zA-Z0-9_]+/g)//* this regex extracts hashtags
            tags=tags.map((element)=>{
                return element.substring(1);
            });
            const tweet= await this.tweetrepo.create(data);
            const tweetId=tweet.id;
            let existingTitles= await this.hashtagrepo.findByName(tags);
            let titleList=existingTitles.map((tag)=>{
                return tag.title;
            });//* array of titles already present in database
            // existingTitles=tags.filter((tag) => titleList.includes(tag));
            // console.log(existingTitles);
            let newTags=tags.filter((tag) => !titleList.includes(tag));
            newTags = newTags.map((tag)=>{
                return {title: tag, tweets: [tweetId]};
            })
            await this.hashtagrepo.bulkCreate(newTags);
            existingTitles.forEach((tag) => {
                tag.tweets.push(tweetId);
                tag.save();
            })
            return tweet;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports= TweetService;