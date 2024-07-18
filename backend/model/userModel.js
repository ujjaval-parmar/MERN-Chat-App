import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please Provide Name']
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email'],
        unique: true,
    },
    profilePic:{
        type: String,
        default:""
        
    },
    password:{
        type: String,
        required: [true, 'Please Provide Password'],
        
    }

}, { timestamps: true });

const UserModel =   mongoose.model('user', UserSchema);

export default UserModel;


