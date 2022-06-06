import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function addArtist() {
  const [artist, setArtist] = useState({
    artistsname: "",
    date: "",
    geners: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;

    value = e.target.value;

    setArtist({ ...artist, [name]: value });
  };

  const storeArtist = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("artistsname", artist.artistsname);
    formData.append("geners", artist.geners);
    formData.append("date", artist.date);
    try {
      let response = await axios.post(
        "http://localhost:5000/api/artist/add-artist",
        formData
      );
      window.location.href = "/";
      if (response.status == 201) {
        alert("artist Added Successfuly!");
      }
    } catch (error) {
      toast.error("Oh Something went Wrong!");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <h1 className="text-center m-3 p-1 font-mono">ADD ARTIST</h1>
        <form
          method="POST"
          encType="multipart/form-data"
          className="mb-5 flex flex-col justify-center"
        >
          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label htmlFor="text" className="block mb-2 text-sm text-gray-900">
              Artist Name
            </label>
            <input
              type="text"
              name="artistsname"
              id="artistsname"
              placeholder="Michael Jackson"
              required
              value={artist.artistsname}
              onChange={handleInput}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label htmlFor="date" className="block mb-2 text-sm text-gray-900">
              Date Of Birth
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={artist.date}
              onChange={handleInput}
              placeholder="10/02/22"
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="flex flex-col justify-center sm:mx-96 mx-7 mb-6">
            <label
              htmlFor="artist"
              className="block mb-2 text-sm text-gray-900"
            >
              Geners
            </label>
            <input
              type="text"
              name="geners"
              id="geners"
              value={artist.geners}
              onChange={handleInput}
              placeholder="POP"
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            type="submit"
            onClick={storeArtist}
            className="text-white sm:mx-96 mx-7 pb-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add New Artist
          </button>
        </form>
      </div>
    </>
  );
}
export default addArtist;
