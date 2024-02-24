import axios from "./axios";
import { useState, useEffect } from "react";
import Trailer from "./Trailer";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [click, setClick] = useState(false);
  const [trailerName, setTrailerName] = useState('');

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchUrl]);

  const handleClick = (title, name) => {
    setClick(!click);
    const searchTerm = title || name;
    movieTrailer(searchTerm).then((res) => {
      const videoId = extractVideoIdFromUrl(res);
      setTrailerName(videoId);
    });
  };

  // Function to extract video ID from YouTube URL
  const extractVideoIdFromUrl = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Conditional rendering based on title
  if (title === "Trending") {
    return (
      <div>
        <h2 className="font-poppins font-bold text-white text-2xl">{title}</h2>
        <div className="flex m-2 overflow-x-scroll overflow-y-hidden ">
          {movies.map((item, index) => (
            <img
              key={index}
              className="w-full h-72 object-contain m-2 rounded-md hover:scale-105 hover:rounded-md hover:duration-300 hover:transform"
              src={`${base_url}${item.poster_path}`}
              alt={item.original_name}
              onClick={() => handleClick(item.title, item.name)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          {click ? <Trailer trailerName={trailerName} /> : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="font-poppins font-bold text-white text-2xl">{title}</h2>
        <div className="flex m-2 overflow-x-scroll overflow-y-hidden ">
          {movies.map((item, index) => (
            <img
              key={index}
              className="w-full h-52 object-contain m-2 rounded-md hover:scale-105 hover:rounded-md hover:duration-300 hover:transform"
              src={`${base_url}${item.poster_path}`}
              alt={item.original_name}
              onClick={() => handleClick(item.title, item.name)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          {click ? <Trailer trailerName={trailerName} /> : ""}
        </div>
      </div>
    );
  }
}

export default Row;
