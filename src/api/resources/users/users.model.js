import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Note titile is required']
    },
    lastname: {
        type: String,
        required: [true, 'Note content is required']
    
    },
    email: {
        type: String,
        required: [true, 'Note content is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Note content is required']
    }
});

export default mongoose.model('User', userSchema);