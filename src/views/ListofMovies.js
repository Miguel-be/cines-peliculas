/*Vista desde la cual se puede ver el detalle de una pelicula. Se llama al componente EditMovie con el listado de peliculsa del
sistema*/
import {React, useState, useEffect} from 'react';
import { getDataMovies } from '../services/api';
import DetailMovie from '../components/Movies/DetailMovie.js';

function ListofMovies() {

    const [listMovies, setListMovies] = useState([]);
  
    useEffect(() => {
      getDataMovies().then((data) => setListMovies(data));
    }, []);
  
    return (
      <>
        <DetailMovie listMovies={listMovies} />
      </>
    ); 
  };

export default ListofMovies




