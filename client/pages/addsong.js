import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import router from "next/router";
import axios from "axios";

function addSong() {
  const [songname, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

  // const url = "https://spot-pjv3wm1yi-aashwin-kumar.vercel.app/";
  const url = "http://localhost:5000/";

  const upload = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("songname", songname);
    data.append("artist", artist);
    data.append("date", date);
    // data.append("artwork", file);

    for (var x = 0; x < file.length; x++) {
      data.append("artwork", file[x]);
    }

    await axios
      .post(`${url}api/song/add-songs`, data)
      .then((res) => {
         console.log(res, "response");
        setFile("");
        setSongName("");
        setArtist("");
        setDate("");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getArtistLists = () => {
      axios.get(`${url}api/artist`).then((res) => {
        console.log(res.data);
        setArtistList(res.data);
      });
    };
    getArtistLists();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div>
        <h1 className="text-center m-3 p-1 text-black-200 font-mono">
          ADD SONG
        </h1>
        <form
          onSubmit={upload}
          method="POST"
          encType="multipart/form-data"
          className="mb-5 flex flex-col justify-center"
        >
          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Song Name
            </label>
            <input
              type="text"
              name="songname"
              id="songname"
              placeholder="Imagin Dragon"
              required
              value={songname}
              onChange={(e) => {
                setSongName(e.target.value);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date Released
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              placeholder="10/02/22"
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label
              htmlFor="artist"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Artist
            </label>
            <select
              onChange={(e) => {
                setArtist(e.target.value);
              }}
            >
              <option>--Select Artist--</option>
              {artistList?.map((item, index) => {
                return <option key={index}>{item.artistsname}</option>;
              })}
            </select>
          </div>

          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label
              htmlFor="artwork"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Artwork
            </label>

            <input
              type="file"
              accept="image/*"
              required
              filename="artwork"
              onChange={(e) => {
                setFile(e.target.files);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            type="submit"
            className="text-white sm:mx-96 mx-7 pb-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add New Song
          </button>
        </form>
      </div>
    </>
  );
}
export default addSong;
