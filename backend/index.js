const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.static('./public'));
// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});
let maxSize = 2 * 1024 * 1024;
let upload = multer({ storage: storage, limits: { fileSize: maxSize } });
let uploadHandler = upload.single('file ');
app.post('/upload', (req, res) => {
  console.log('upload');
  uploadHandler(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code == 'LIMIT_FILE_SIZE') {
        res.status(400).json({ message: 'maximum file size is 2 mb ' });
      }
      return;
    }
    if (!req.file) {
      res.status(400).json({ message: 'No file!' });
    } else {
      res.status(200).json({ message: 'uploaded to the server ' });
    }
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
