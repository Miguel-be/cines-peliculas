/*Este componente se llama desde EditMov y permite editar/ borrar una pelicula*/
import { React, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import "../Styles/editMovie.css";
import {
  editDataMovieswithForm,
  editDataMovieswithMovie,
  deleteDataMovie,
} from "../../services/api";
import {
  AlertsError,
  AlertsSuccess,
  AlertsInfo,
} from "../Alert-Warning/Alert.js";

const cookies = new Cookies();

function EditMovie({ listMovies }) {
  /*Se declaran e inicializan variables de estado para controlar la información de la pelicula que se va a guardar (movie), la información
  del archivo que sube el usuario con la portada del pelicula (file), se recoge el parametro de la pelicula que se quiere editar /borrar
  por params y la variable de estado movie se inicializa con la pelicula que tiene el valor del identificador que se pasa por params.*/

  const genero = [
    { id: "selecciona", title: "selecciona" },
    { id: "animación", title: "animación" },
    { id: "acción", title: "acción" },
    { id: "comedia romántica", title: "comedia romántica" },
    { id: "ciencia ficción", title: "ciencia ficción" },
  ];

  let [movie, setMovie] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
    cover: null,
  });
  const params = useParams();
  const found = listMovies.find((element) => element._id === params.id);

  useEffect(() => setMovie(found), [found]);

  const [file, setFile] = useState();

  /*Se gestiona que no se suban errores en la pelicula*/
  function hayerror() {
    if (!cookies.get("rol") || cookies.get("rol") !== "admin") {
      AlertsError("Tienes que identificarte");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return true;
    }
    if (movie.title === "") {
      AlertsInfo("Introduce un titulo a la pelicula");
      return true;
    } else if (movie.director === "") {
      AlertsInfo("Introduce un director a la pelicula");
      return true;
    } else if (movie.year === "") {
      AlertsInfo("Introduce un año a la pelicula");
      return true;
    } else if (!parseInt(movie.year)) {
      AlertsInfo("Introduce un año correcto a la pelicula");
      return true;
    } else if (movie.genre === "selecciona") {
      AlertsInfo("Selecciona un género a la pelicula");
      return true;
    }
    return false;
  }

  /*función que gestiona los cambios en el fichero con la portada que sube el usuario*/
  function onfileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        setFile(file);
      } else {
        AlertsError("Error al añadir la pelicula");
        setTimeout(() => {
          setFile(null);
          file.mimetype = "";
        }, 3000);
      }
    }
  }

  /*función que gestiona los cambios en los campos de texto del formulario y actualiza el valor de movie*/
  function handleInput(ev) {
    setMovie({ ...movie, [ev.target.id]: ev.target.value });
  }

  /*función para subir los cambios de una pelicula al sistema*/
  const uploadMovie = (ev) => {
    ev.preventDefault();

    if (!hayerror()) {
      const form = new FormData();
      form.append("title", movie.title);
      form.append("director", movie.director);
      form.append("genre", movie.genre);
      form.append("year", movie.year);

      if (file) {
        form.append("cover", file, "form-data");
        editDataMovieswithForm(params.id, form).then((resp) => {
          AlertsSuccess("La pelicula se ha modificado correctamente");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        });
      } else {
        delete movie.cover;
        editDataMovieswithMovie(params.id, movie).then((resp) => {
          AlertsSuccess("La pelicula se ha modificado correctamente");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        });
      }
    }
  };
  /*función para borrar una pelicula del sistema*/
  function deleteMovie(ev) {
    deleteDataMovie(params.id).then((resp) => {
      AlertsSuccess("La pelicula se ha borrado correctamente");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    });
  }

  return (
    <>
      {movie ? (
        <section className="formFlex2">
          <article className="formFlex aticleStyle">
            <h1 className="h1Style">
              <b>Introduce la información de la pelicula</b>
            </h1>
            <form className="formFlex">
              <div className="divStyle">
                <label htmlFor="title">Titulo:</label>
                <br />
                <input
                  value={movie.title}
                  className="input"
                  id="title"
                  type="text"
                  placeholder="Introduce el titulo"
                  onChange={handleInput}
                ></input>
                <br />
                <br />
                <label htmlFor="director">Director:</label>
                <br />
                <input
                  value={movie.director}
                  className="input"
                  id="director"
                  type="text"
                  placeholder="Introduce el director"
                  onChange={handleInput}
                />
                <br />
                <br />
                <label htmlFor="year">Año:</label>
                <br />
                <input
                  value={movie.year}
                  className="input"
                  id="year"
                  type="text"
                  placeholder="Introduce el año"
                  onChange={handleInput}
                />
                <br />
                <br />
                <label htmlFor="genre">Selecciona el género:</label>
                <br />
                <select
                  value={movie.genre}
                  className="input"
                  id="genre"
                  onChange={handleInput}
                >
                  {genero.map((element) => (
                    <option
                      key={element.id}
                      value={element.id}
                      label={element.title}
                    ></option>
                  ))}
                </select>
                <br /> <br />
              </div>
              <div className="divStyle">
                <label htmlFor="file">Portada actual:</label>
                <br />
                <img
                  src={movie.cover}
                  alt="Imagen portada"
                  className="imageMovie2"
                />
                <br />
                <label htmlFor="cover">Selecciona un nuevo archivo:</label>
                <br />
                <input
                  className="input"
                  id="cover"
                  type="file"
                  placeholder="Selecciona un nuevo archivo"
                  onChange={onfileChange}
                />
                <br /> <br />
                <input
                  type="button"
                  value="Incluir cambios"
                  onClick={uploadMovie}
                />
                &nbsp; &nbsp; &nbsp;
                <input
                  type="button"
                  value="Borrar pelicula"
                  onClick={deleteMovie}
                />
              </div>
            </form>
          </article>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default EditMovie;
