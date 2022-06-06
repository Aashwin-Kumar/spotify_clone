import React, { useState, useEffect } from "react";
import StarsRating from "../components/StarRating";
import DeleteIcon from "@mui/icons-material/Delete";
import * as ReactBootStrap from "react-bootstrap";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const [artistDB, setartistDB] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:5000/";
  // const url = "https://spot-pjv3wm1yi-aashwin-kumar.vercel.app/";


  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get(`${url}api/artist/`);
      let myDATA = res.data;
      setartistDB(myDATA);
      setLoading(true);
      console.log("IMAGE RESPONSE ", myDATA);
    };
    fetchAPI();
  }, []);

  const deleteHandler = async (_id) => {
    console.log(_id);
    if (window.confirm("Are you sure?")) {
      axios
        .post(`${url}api/artist/myid/${_id}`, {
          method: "DELETE",
        })
        .then((res) => {
          window.location.reload();
          console.log(res);
        });
    }
  };

  return (
    <>
      <div>
        <h1 className="sm:text-6xl text-3xl text-black-200 font-thin tracking-widest text-center m-3 p-1">
          SPOTIFY TOP ARTISTS
        </h1>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 m-4 p-10">
        {loading ? (
          artistDB.map((artist, key) => (
            <div
              key={key}
              className="bg-white text-center text-gray-600 w-72 shadow-lg rounded"
            >
              {/* {console.log(img._id)} */}
              <div className="ml-56 text-white">
                <button className="hover:text-black">
                  <DeleteIcon onClick={() => deleteHandler(artist._id)} />
                </button>
              </div>

              <h2 className="font-bold text-xl">{artist.artistsname}</h2>
              <div className="font-thin text-sm ">{artist.date}</div>
              <div className="font-bold text-xl">{artist.geners}</div>
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
