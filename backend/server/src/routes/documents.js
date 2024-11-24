const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Document = require('../models/Document');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `documents/${Date.now()}-${file.originalname}`);
    }
  })
});

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const document = new Document({
      name: req.body.name,
      type: req.body.type,
      shipment: req.body.shipmentId,
      url: req.file.location,
      uploadedBy: req.user._id
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});