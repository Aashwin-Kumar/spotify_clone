import express from "express";
import Artist from "../models/artistSchema.js";
import validateArtistInput from "../validation/artist.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

//artist data post

router.post("/add-artist", upload.none(), (req, res) => {
  const { errors, isValid } = validateArtistInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Artist.findOne({ artistsname: req.body.artistsname }).then((user) => {
    if (user) {
      return res.status(400).json({ title: "ArtistsName already exists" });
    } else {
      const newUser = new Artist({
        artistsname: req.body.artistsname,
        geners: req.body.geners,
        date: req.body.date,
      });
      newUser
        .save()
        .then((user) => {
          return res
            .status(200)
            .json({ message: "Event added successfully. Refreshing data..." });
        })
        .catch((err) => console.log(err));
    }
  });
});

//artist data get

router.get("/", (req, res) => {
  Artist.find({}).then((user) => {
    if (user) {
      return res.status(200).send(user);
    }
  });
});

router.post("/myid/:id", (req, res) => {
  Artist.deleteOne({ _id: req.params.id }).then((user) => {
    if (user) {
      return res.status(200).json({
        message: "Artist deleted successfully. Refreshing data...",
        success: true,
      });
    }
  });
});


export default router;
