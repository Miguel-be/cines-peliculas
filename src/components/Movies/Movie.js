import React from "react";
import "../Styles/movie.css";
import { Link } from "react-router-dom";
//La funcion Movie Pinta una pelicula por separado, la etiqueta link usa reactdom para llevarnos a la ruta de la vista detalle.
function Movie({ oneElement }) {
  return (
    <li className="cardMovie">
      <Link to={`/movie/detail/${oneElement._id}`}>             
        <img src={oneElement.cover} alt="" className="imageMovie" />
        <div className="bgCard">
          <h2 className="filmTitle"><strong>{oneElement.title}</strong></h2>
          <p className="filmTitle_p">dirigida por:</p>
          <h3 className="filmTitle_p__h3">{oneElement.director}</h3>
        </div>
      </Link>
    </li>
  );
}

export default Movie;
