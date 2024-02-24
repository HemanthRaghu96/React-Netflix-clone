import axios from "./axios";
import { useState, useEffect } from "react";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl }) {
  let [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchUrl]);

  return (
    <div className="">
      <h2 className="font-poppins font-bold text-white text-2xl">{title}</h2>

      <div className="flex m-2 overflow-x-scroll overflow-y-hidden ">
        {movies.map((item,index) => {
          return (
            <img key={index}
              className="w-full h-52 object-contain m-2 rounded-md hover:scale-105 hover:rounded-md hover:duration-300 hover:transform"
              src={`${base_url}${item.poster_path}` } alt={item.original_name} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
