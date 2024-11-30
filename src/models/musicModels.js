const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        maxlength: 100 
    },
    artist: {
        type: String,
        required: true,
        maxlength: 100
    },
    album: {
        type: String,
        required: true,
        maxlength: 100
    },
    genres: {
        type: String, 
        required: true
    },
    image: {
        type: String
       
    },
    audio: {
        type: String,
        required: true 
    },
    duration: {
        type: String,

    },
}
); 

const musicsModel = mongoose.model('Music', musicSchema); 
module.exports = musicsModel;
