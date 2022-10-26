const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({
     storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".JPG" && ext !== ".jpeg" && ext !== ".png" && ext !== ".tiff" && ext !== ".bmp") {
            return callback(new Error("Only JPEG images are allowed"));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 5e6,
    },
});

module.exports = storage
module.exports = upload