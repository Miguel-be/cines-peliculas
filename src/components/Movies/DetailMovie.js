import React from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/detailmovie.css";
import { MDBBtn } from "mdb-react-ui-kit";
import Cookies from 'universal-cookie';

//La función compara el id que viene en la url con el objeto del fectch y pinta la vista detalle, tiene la condición de mostrar el link de editar pelicula si el usuario esta logeado.
function DetailMovie({ listMovies }) {
  const params = useParams();
  const foundMovie = listMovies.find((element) => element._id === params.id);
  const cookies = new Cookies();  
  return (
    <>
      {foundMovie ? (
        <section className="sectionStyle">
          <article className="flex2">
            <img src={foundMovie.cover} alt="" className="imageMovie" />
            <div className="movieDetail">
              <h2 className="capitalize">
                <strong>{foundMovie.title}</strong>
              </h2>
              <p className="capitalize subr">sinopsis:</p>
              <p>
                Praesent sapien massa, convallis a pellentesque nec, egestas non
                nisi. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar
                a. Sed porttitor lectus nibh. Curabitur aliquet quam id dui
                posuere blandit. Vivamus magna justo, lacinia eget consectetur
                sed, convallis at tellus. Praesent sapien massa, convallis a
                pellentesque nec, egestas non nisi. Nulla quis lorem ut libero
                malesuada feugiat.
              </p>
              <h3 className="capitalize h3text">
                director: {foundMovie.director}
              </h3>
              <h4 className="capitalize h4text">género: {foundMovie.genre}</h4>
              <p className="capitalize">año: {foundMovie.year}</p>
            </div>
          </article>
          { ((!cookies.get("rol"))||(cookies.get("rol")!=="admin")) ? "" :
          <MDBBtn>
            <Link to={`/editmovie/${params.id}`} className='linkStyle'>Editar información</Link>
          </MDBBtn>
          }
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default DetailMovie;
