import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
        //* while using "ref" you can only refer to one model but here we are using something called as "refpath" which help us to refer to multiple models and we can populate our data later on the basis of model which the "like" is referred to
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
export default Like;