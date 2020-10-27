import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();
import fs from "fs";

// function to be used as file filter in multer storage
function checkFileType(file, cb) {
    /*
    file: {
      fieldname: 'image',
        originalname: 'sample.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg' [0]
    }
    */
    const filetypes = /jpg|jpeg|png/;
    //make sure extname and mimetype both match specified filetypes
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Images only!");
    }
}

const storageConfig = multer.diskStorage({
    filename(req, file, cb) {
        cb(
            null,
            // `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
    destination(req, file, cb) {
        cb(null, "uploads/");
        console.log('save file to directory "uploads":', file)
    },
});

const upload = multer({
    fileFilter: function(req, file, cb) {
        console.log('checking file type with filter')
        checkFileType(file, cb);
    },
    storage: storageConfig,

});

// http://localhost:5000/api/upload
router.post("/", upload.single("image"), (req, res) => {
    /*
    req.body: 123, // (from formData text Key)
    req.file: {
        fieldname: 'image',
        originalname: 'sample.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'uploads/',
        filename: 'image-1603794937226.jpg',
        path: 'uploads\\image-1603794937226.jpg',
        size: 40223[0]
      }    
    */
    const filePath = req.file.path;
    console.log('filePath', filePath)
    //ex: uploads\image-1603018408516.jpg

    let newFilePath = `uploads/pid_${req.body.productId}.jpg`;
    //ex: uploads\\pid_123.jpg

    fs.renameSync(filePath, newFilePath); // change the file name

    res.send(`/${newFilePath}`);
});

export default router;