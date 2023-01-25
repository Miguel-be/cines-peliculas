import React from "react";
import "../Styles/movie.css";
import { Link } from "react-router-dom";

//La funcion Cinema Pinta una pelicula por separado, la etiqueta link usa reactdom para llevarnos a la ruta de la vista detalle.
function Cinema({ oneElement }) {
  return (
    <li className="card">
      <Link to={`/cinema/detail/${oneElement._id}`}>
        <h2>{oneElement.name}</h2>
        <p>{oneElement.location}</p>
      </Link>
    </li>
  );
}

export default Cinema;