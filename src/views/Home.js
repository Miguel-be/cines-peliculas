/*Vista de la página inicial de la aplicación*/
import React, { useEffect, useState } from "react";
import {getDataCinemas} from "../services/api.js";
import ListMovies from "../components/Movies/ListMovies.js";
import "../components/Styles/select.css"

/*Se declaran e inicializan las variables de estado de los cines y peliculas que se mostrarán al usuario*/
function Home() {
  const [listMovies, setListMovies] = useState([]); 
  const [listCinemas, setListCinemas]=useState([]);

  /*Se carga inicialmente la lista de cines incluyendo una fila para ayudar al usuario a saber que tiene que seleccionar
  un elemento de la lista*/
  useEffect(() => {      
    getDataCinemas()
    .then((resp) => {  
        const initial={"name":"Selecciona un cine", "location":"", "movies":[], "_id":0, "__v":0};
        resp.unshift(initial);
        setListCinemas(resp);
      });
    }, []);

  /*Se gestiona la selección de un cine*/  
  const handleSelectSingle=(ev)=>{       
    const foundCinema = listCinemas.find((element) => element._id === ev.target.value);
      if (foundCinema)
      {        
        setListMovies(foundCinema.movies);
      }              
  }

  return (
    <>
      {listCinemas?(
       <div className="boxRes">
         <div className="box">
           <select id="cinema"
             onChange={handleSelectSingle}>
            {listCinemas.map((element) =>
                <option className="option" key={element.id} value={element._id} label={element.name}></option>)}
                 </select>
         </div>
       </div>  )
      :""
      }      
      <ListMovies listMovies={listMovies} />
    </>
  ); 
};

export default Home;
