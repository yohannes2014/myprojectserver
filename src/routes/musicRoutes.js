const express = require('express')
const {  getMusics,
        getMusicByid,
        addNewMusic,
        deleteMusic,
        countMusics,
        updateMusics, 
        fetchAlbum,
        groupByAlbum,
        fetchArtist,
        groupByArtist,
        fetchGenres,
        groupByGenres,

     } = require('../controllers/musicControllers')

const musicRouter = express.Router();


musicRouter.get('/musics', getMusics);

musicRouter.get("/musics/:id", getMusicByid);

musicRouter.post('/musics', addNewMusic);

musicRouter.delete("/musics/:id", deleteMusic);

musicRouter.get('/total', countMusics);

musicRouter.put('/musics/:id',updateMusics);

musicRouter.get('/music/albums/:album', fetchAlbum)

musicRouter.get('/music/albums', groupByAlbum)

musicRouter.get('/music/artist/:artist', fetchArtist) 

musicRouter.get('/music/artist', groupByArtist)

musicRouter.get('/music/genres/:genres', fetchGenres)  

musicRouter.get('/music/genres', groupByGenres)



module.exports = musicRouter


