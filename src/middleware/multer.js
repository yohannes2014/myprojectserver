const multer = require('multer');
const fs = require('node:fs');


const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        const dir = file.mimetype.startsWith('image')
            ? 'uploads/images'
            : 'uploads/audios'; 

        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        
        cb(null, file.fieldname + "_" + Date.now() + file.originalname.replace(/\s+/g, '_'));    // with trim to avoid spacing
    },
});

const  upload = multer({ storage });

module.exports =  upload 

