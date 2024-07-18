import mongoose from 'mongoose';


const MessageSchema = new mongoose.Schema({

    text: {
        type: String,
        default: ''
    },

    imageUrl: {
        type: String,
        default: ''
    },

    videoUrl: {
        type: String,
        default: ''
    },

    msgByUserId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },

    seen: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })


const ConversationSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please Provide SenderId'],
        ref: 'user'
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please Provide ReciverId'],
        ref: 'user'

    },
    messages: {
        type: [mongoose.Schema.ObjectId],
        ref: 'message'
    }

}, { timestamps: true });

const MessageModel = mongoose.model('message', MessageSchema);


const ConversationModel = mongoose.model('conversation', ConversationSchema);

export { ConversationModel, MessageModel };


