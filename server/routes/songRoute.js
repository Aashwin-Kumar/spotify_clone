import express from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import Song from "../models/songSchema.js";

const files = [];
const fileInArray = [];
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    let filePath = [];
    console.log("MULTER ENTRY ", file.originalname)
    console.log("files", req.files)

    const ext = path.extname(file.originalname);
    const id = uuid();
    filePath = `${id}${ext}`;
    fileInArray.push([(filePath)])
    console.log("IN ARRAY ", filePath)
    files.push(fileInArray)
    console.log("PUSHED MAIN ARRAY", fileInArray)
    cb(null, filePath)
    console.log("current length", files.length)
  }
})


const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  storage: storage,
})


//song data post

router.post('/add-songs', upload.array("artwork", 5), asyncHandler(async (req, res) => {
  //console.log("Files", fileInArray)
  const { songname, date, artist } = req.body;

  if (!songname || !date || !artist) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const songs = new Song({ songname, date, artist, artwork: fileInArray });
    const createdSongs = await songs.save();
    res.status(201).json(createdSongs);
  }
}));

//song data get

router.get("/", (req, res) => {
  Song.find({}).then((user) => {
    if (user) {
      return res.status(200).send(user);
    }
  });
});

//song delete by Id

router.post("/myid/:id", (req, res) => {
  //console.log(req.params.id)
  Song.deleteOne({ _id: req.params.id }).then((user) => {
    if (user) {
      return res.status(200).json({
        message: "Song deleted successfully. Refreshing data...",
        success: true,
      });
    }
  });
});

export default router;
