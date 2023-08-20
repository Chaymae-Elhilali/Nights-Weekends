const multer = require('multer');
const path = require('path');



// upload single file
const uploadSingle = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(file);
            cb(null, 'public/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
}).single('imageUrl');


// export middleware
module.exports = {
    uploadSingle
}