import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  songname: {
    type: String,
    required: true,
  },
  artwork: {
    type: [[String]],
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },

  date: {
    type: Object,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
