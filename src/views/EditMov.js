/*Vista desde la cual se puede editar / eliminar un pelicula. Se llama al componente EditMovie con el listado de peliculsa del
sistema*/
import {React, useState, useEffect} from 'react';
import {getDataMovies} from '../services/api';
import EditMovie from '../components/Insert-Edit-Component/EditMovie';

function EditMov() {

    const [listMovies, setListMovies] = useState([]);
  
    useEffect(() => {
      getDataMovies().then((data) => setListMovies(data));
    }, []);
  
    return (
      <>      
        <EditMovie listMovies={listMovies} />
      </>
    ); 
  };

export default EditMov