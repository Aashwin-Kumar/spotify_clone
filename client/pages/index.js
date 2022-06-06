import React, { useState, useEffect } from "react";
import StarsRating from "../components/StarRating";
import DeleteIcon from "@mui/icons-material/Delete";
import * as ReactBootStrap from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import router from "next/router";

export default function Home() {
  const [songDB, setsongDB] = useState([]);
  const [loading, setLoading] = useState(false);
  // const url = "https://spot-pjv3wm1yi-aashwin-kumar.vercel.app/";
  const url = "http://localhost:5000/";

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get(`${url}api/song/`);

      let myDATA = res.data;
      setsongDB(myDATA);
      setLoading(true);
      console.log("IMAGE RESPONSE ", myDATA);
    };
    fetchAPI();
  }, []);

  const deleteHandler = async (_id) => {
    console.log(_id);
    if (window.confirm("Are you sure?")) {
      axios
        .post(`${url}api/song/myid/${_id}`, {
          method: "DELETE",
        })
        .then((res) => {
          router.reload();
          console.log(res);
        });
    }
  };

  return (
    <>
      <div>
        <h1 className="sm:text-6xl text-4xl text-black-200 font-thin tracking-widest text-center m-3 p-1">
          SPOTIFY SONGS
        </h1>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 m-3 p-10">
        {loading ? (
          songDB.map((img, key) => (
            <div
              key={key}
              className="bg-white text-center text-gray-600 w-60 shadow-lg rounded"
            >
              {/* {console.log(img._id)} */}
              <div className="ml-56 text-white">
                <button className="hover:text-black">
                  <DeleteIcon onClick={() => deleteHandler(img._id)} />
                </button>
              </div>

              <div>
                {img.artwork.map((item, key) => (
                  <img
                    src={url + item}
                    key={key}
                    width={300}
                    height={300}
                    alt="POSTER"
                  />
                ))}
              </div>

              <h2 className="font-bold text-xl">{img.songname}</h2>
              <div className="font-thin text-sm ">{img.date}</div>
              <div className="font-bold text-xl">{img.artist}</div>
              <div className="font-bold text-xl">
                <StarsRating />
              </div>
            </div>
          ))
        ) : (
          <ReactBootStrap.Spinner animation="border" />
        )}
      </div>
    </>
  );
}
