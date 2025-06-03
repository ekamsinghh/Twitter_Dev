import TweetRepository from '../../src/repository/tweet-repository.js'; 
import Tweet from '../../src/model/tweet.js';

jest.mock('../../src/model/tweet.js');

describe("Create tweet tests",()=>{
    test("Should return a new tweet", async () =>{
        const data={
            content: "Creating tests for the tweet repository"
        }
        const spy=jest.spyOn(Tweet,'create').mockImplementation(()=>{
            return {
                id: 124,
                content: "Creating tests for the tweet repository",
                createdAt: new Date(),
                updatedAt: new Date(),
                likes: [],
                comments: []
            };
        });

        const tweetRepository=new TweetRepository();
        const tweet=await tweetRepository.create(data);

        expect(spy).toHaveBeenCalled();//* to check whether .create was called or not!
        expect(tweet.content).toBe(data.content);
        spy.mockRestore();
    });

    test("Should throw an error", async () =>{
        const data={
            content: "Creating tests for the tweet repository"
        }
        const spy=jest.spyOn(Tweet,'create').mockImplementation(()=>{
            throw new Error("Something went wrong");
        });

        
        const tweetRepository=new TweetRepository();
        await expect(tweetRepository.create(data)).rejects.toThrow("Something went wrong");
        // const tweet=await tweetRepository.create(data);
        //* since create will throw an error, so tweet will never be created or initialized

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe("Tests for get all tweets",()=>{
    test("Should return tweets with pagination", async () => {
        const mockTweets = [
            {
                id: 124,
                content: "Tweet 1",
                createdAt: new Date(),
                updatedAt: new Date(),
                likes: [],
                comments: []
            },
            {
                id: 125,
                content: "Tweet 2",
                createdAt: new Date(),
                updatedAt: new Date(),
                likes: [],
                comments: []
            },
            {
                id: 126,
                content: "Tweet 3",
                createdAt: new Date(),
                updatedAt: new Date(),
                likes: [],
                comments: []
            }
        ];

        const mockQuery = {
            skip: jest.fn().mockReturnThis(),//* mockReturnThis returns the same thing which is being passed to it
            limit: jest.fn().mockReturnValue(mockTweets)
        };

        jest.spyOn(Tweet, 'find').mockReturnValue(mockQuery);

        const tweetRepository = new TweetRepository();
        const tweets = await tweetRepository.getAll(0, 10);

        expect(Tweet.find).toHaveBeenCalled();
        expect(mockQuery.skip).toHaveBeenCalledWith(0);
        expect(mockQuery.limit).toHaveBeenCalledWith(10);
        expect(tweets.length).toBe(3);
    });
});