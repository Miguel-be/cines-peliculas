import React from "react";
import Movie from "./Movie";

//La función envia por props a cada elemento la informacion para pntarse y luego usamos el elemento simple para crear una lista con todos los elementos-
function ListMovies({ listMovies }) {
  console.log(listMovies)
  const moviesLi = listMovies.map((oneElement) => {
    return <Movie oneElement={oneElement} key={oneElement._id} />;
  });

  return (
    <div>
      <div className="filmsBlock">
        <ul className="flex">{moviesLi}</ul>
      </div>
    </div>
  );
}

export default ListMovies;
