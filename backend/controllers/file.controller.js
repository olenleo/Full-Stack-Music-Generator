const router = require('express').Router()
const crypto = require("crypto");
const uploadFile = require("../middleware/upload");
const fs = require("fs");

const upload = async (req, res) => {
  console.log('Upload request')
  console.log('Request body:', req.body)
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
        return res.status(400).send({ 
        message: "Please upload a file!" 
    });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
              message: "File size can not exceed 2 mb!"
          })
      }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  console.log('GetListFiles request')
  const directoryPath = __basedir + "/resources/static/assets/midi/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.log('ERR: ', err)
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        id: crypto.randomBytes(16).toString("hex"),
        name: file,
        url: directoryPath + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  console.log('Download! ')
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/midi/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const remove = (request, response) => {
  console.log(request.params)
  const songToDelete = Midi.findById(request.params.name)
  if (!songToDelete ) {
    return response.status(204).end()
  }
  Midi.findByIdAndRemove(request.params.name)
  response.status(204).end()
};

module.exports = {
  upload,
  getListFiles,
  remove,
  download
};