const express = require('express');
const router = express.Router();
const fs = require('fs');
const firebase = require('../../config/firebase');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        return callback(null, '/tmp/')
    }
});

const uploadFileImage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // limit file size 5MB
    },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            return callback(null, true);
        } else {
            callback(null, false);
            return callback(
                res.status(400).json({
                    message: "Only .png, .jpg and .jpeg format allowed!",
                })
            );
        }
    },
});

const uploadFileVideo = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20, // limit file size 20MB
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "video/mp4" || file.mimetype === "video/webm") {
            return callback(null, true);
        } else {
            callback(null, false);
            return callback(
                res.status(400).json({
                    message: "Only .mp4 and .webm format allowed!",
                })
            );
        }
    },
});

router.post("/images", uploadFileImage.single("image"), async (req, res) => {
    try {
        await firebase.bucket.upload(req.file.path, {
            metadata: {
                contentType: req.file.mimetype,
            },
            destination: `images/${req.file.originalname}`,
        });
        fs.unlinkSync(req.file.path);
        return res.status(200).json({
            url: `https://storage.googleapis.com/${firebase.bucket.name}/${req.file.originalname}`,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});

router.post("/videos", uploadFileVideo.single("video"), async (req, res) => {
    try {
        await firebase.bucket.upload(req.file.path, {
            metadata: {
                contentType: req.file.mimetype,
            },
            destination: `videos/${req.file.originalname}`,
        });
        fs.unlinkSync(req.file.path);
        return res.status(200).json({
            url: `https://storage.googleapis.com/${firebase.bucket.name}/${req.file.originalname}`,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;