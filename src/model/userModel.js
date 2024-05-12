const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    parent  : {
        type : ObjectId,
        ref : 'User'
    },
    ancestors : {
        type : [{
            type : ObjectId,
            ref : 'User'
        }],
    },
    earnings : {
        type : Number,
        default : 0
    },
    isDeleted : {
        type : Boolean,
        default : false
    } 
},{timestamps : true})

module.exports = mongoose.model('User', userSchema)
