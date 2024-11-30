const musicsModel = require('../models/musicModels');
const upload = require('../middleware/multer');
const fs = require('fs');
const path = require('path');


// Get Musics

const getMusics =  (req, res) => {
    musicsModel.find({}).
        then(musics => res.json(musics)).
        catch(err => res.json(err));
}

;



// Get music by ID
const getMusicByid =  async (req, res) => {
    try {
        const music = await musicsModel.findById(req.params.id);
        if (!music) return res.status(404).json({ message: "Music not found" });
        res.json(music);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Add New Music
const addNewMusic = [
    upload.fields([{ name: 'image' }, { name: 'audio' }]), // Middleware to handle file uploads
    (req, res) => {
        const defaultImagePath = 'Default.png';

        const newMusic = new musicsModel({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            genres: req.body.genres,
            duration: req.body.duration,
            image: req.files['image'] && req.files['image'].length > 0 ? req.files['image'][0].filename : defaultImagePath,
            audio: req.files['audio'] && req.files['audio'].length > 0 ? req.files['audio'][0].filename : null,
        });

        newMusic.save()
            .then(savedMusic => {
                res.status(201).json({ message: 'Music saved successfully!', music: savedMusic });
            })
            .catch(error => {
                res.status(500).json({ message: 'Error saving music', error });
            });
    }
];



// Delete music by ID
const deleteMusic = async (req, res) => {
    try {
        const music = await musicsModel.findByIdAndDelete(req.params.id);
        if (!music) return res.status(404).json({ message: "Music not found" });
        res.json({ message: "Music has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Total Musics
const countMusics = (req, res) => {

    musicsModel.countDocuments({}).
        then(music => res.json(music)).
        catch(err => res.json(err))
};


// Update Musics
const updateMusics = [
    upload.single('image'), // Middleware to handle single image upload
    async (req, res) => {
        try {
            const id = req.params.id; // Assuming you're getting the ID from the request

            // Check for valid ID
            if (!id) {
                return res.status(400).send('Invalid ID format');
            }

            // Find the existing music entry
            const music = await musicsModel.findById(id);
            if (!music) {
                return res.status(404).json({ message: 'Music not found' });
            }

            // Prepare the updated music object
            const updatedMusic = {
                title: req.body.title || music.title,
                artist: req.body.artist || music.artist,
                genres: req.body.genres || music.genres,
                album: req.body.album || music.album,
                // Only update the image if a new one is uploaded
            };

            // Handle image file update
            if (req.file) {
                // Delete old image file if it exists
                const oldFilePath = path.join(__dirname, '..', 'uploads', music.image); // Adjust the path to the uploads directory
                fs.unlink(oldFilePath, (err) => {
                    if (err) console.error('Failed to delete old file:', err);
                });

                // Update the filename in the updated music object
                updatedMusic.image = req.file.filename;
            }

            // Update the music entry in the database
            const updatedEntry = await musicsModel.findByIdAndUpdate(id, updatedMusic, { new: true });

            // Return the updated music entry
            res.status(200).json({ message: 'Music updated successfully', music: updatedEntry });
        } catch (error) {
            console.error('Error updating music:', error);
            res.status(500).json({ message: 'Error updating music', error });
        }
    }
];

// Fetch music by album


  const fetchAlbum = async (req, res) => {
    try {
        const { album } = req.params;
        const musicList = await musicsModel.find({ album }).exec();
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fetch grouped albums  
const groupByAlbum = async (req, res) => {
    try {
        const albums = await musicsModel.aggregate([
            { $group: { _id: '$album', songs: { $push: '$$ROOT' } } },
        ]).exec();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch music by artist


  const fetchArtist = async (req, res) => {
    try {
        const { artist } = req.params;
        const musicList = await musicsModel.find({ artist }).exec();
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fetch grouped artist 
const groupByArtist = async (req, res) => {
    try {
        const artist = await musicsModel.aggregate([
            { $group: { _id: '$artist', songs: { $push: '$$ROOT' } } },
        ]).exec();
        res.json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fetch music by genres


  const fetchGenres = async (req, res) => {
    try {
        const { genres } = req.params;
        const musicList = await musicsModel.find({ genres }).exec();
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fetch grouped genres 
const groupByGenres = async (req, res) => {
    try {
        const genres = await musicsModel.aggregate([
            { $group: { _id: '$genres', songs: { $push: '$$ROOT' } } },
        ]).exec();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







module.exports = {
                    getMusics, 
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
                   
                 }