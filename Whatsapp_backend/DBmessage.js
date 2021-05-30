import mongoose from 'mongoose';

const wpSchema = mongoose.Schema({
    
    name : String,
    message : String,
    timestamp : String,
    received : Boolean,
});

export default mongoose.model('messages',wpSchema)