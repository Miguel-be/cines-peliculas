import React from "react";
import Cinema from "./Cinema";
//La función envia por props a cada elemento la informacion para pntarse y luego usamos el elemento simple para crear una lista con todos los elementos-
function ListCinemas({ listCinemas }) {

    const cinemasLi = listCinemas.map((oneElement) => {
  
      return <Cinema oneElement={oneElement} key={oneElement._id}/>;
    });
  
    return <ul>{cinemasLi}</ul>;
  }
  
  export default ListCinemas;