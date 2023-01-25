/*Vista desde la cual se puede crear una nueva pelicula*/
import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Cookies from "universal-cookie";
import { createDataMovie } from "../services/api.js";
import {
  AlertsError,
  AlertsSuccess,
  AlertsInfo,
} from "../components/Alert-Warning/Alert.js";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const cookies = new Cookies();

function NewMovies() {
  /*Se declaran e inicializan variables de estado para controlar la información de la pelicula que se va a guardar (movie), la infmación
  del archivo que sube el usuario con la portada del pelicula (file), se recoge el parametro de la pelicula que se quiere editar /borrar
  por params y la variable de estado movie se inicializa con la pelicula que tiene el valor del identificador que se pasa por params.*/
  const genero = [
    { id: "selecciona", title: "selecciona" },
    { id: "animación", title: "animación" },
    { id: "acción", title: "acción" },
    { id: "comedia romántica", title: "comedia romántica" },
    { id: "ciencia ficción", title: "ciencia ficción" },
  ];

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
  });

  const [file, setFile] = useState();
  /*Se gestiona que no se suban errores en la pelicula*/
  function hayerror() {
    if (!cookies.get("rol") || cookies.get("rol") !== "admin") {
      AlertsError("Tienes que identificarte");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2300);
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
    } else if (movie.genre === "") {
      AlertsInfo("Selecciona un género a la pelicula");
      return true;
    } else if (!file) {
      AlertsInfo("Tienes que incluir una imagen");
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
      form.append("cover", file, "form-data");

      createDataMovie(form)
        .then((resp) => {
          AlertsSuccess("La pelicula se ha registrado correctamente");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        })
        .catch((err) => {
          AlertsError("Error al añadir la pelicula");
          setTimeout(() => {}, 3000);
        });
    }
  };

  return (
    <div>
      <MDBContainer>
        <MDBCard
          className="mx-5 my-2    mb-5 p-5 shadow-5"
          style={{ marginTop: "50px", backdropFilter: "blur(100px)" }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Nueva pelicula</h2>
            <MDBRow>
              <MDBCol col="6">
                <MDBInput
                  htmlFor="title"
                  wrapperClass="mb-4"
                  label="Titulo de la pelicula"
                  id="title"
                  type="text"
                  onChange={handleInput}
                />
              </MDBCol>
              <MDBCol col="6">
                <MDBInput
                  htmlFor="director"
                  wrapperClass="mb-4"
                  label="Director"
                  id="director"
                  type="text"
                  onChange={handleInput}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol col="6">
                <MDBInput
                  htmlFor="year"
                  wrapperClass="mb-4"
                  label="Año de estreno"
                  id="year"
                  type="text"
                  onChange={handleInput}
                />
              </MDBCol>
              <MDBCol col="6">
                <Form.Select id="genre" onChange={handleInput} htmlFor="genre">
                  {genero.map((element) => (
                    <option
                      key={element.id}
                      value={element.id}
                      label={element.title}
                    ></option>
                  ))}
                </Form.Select>
              </MDBCol>
            </MDBRow>
            <div>
              <MDBIcon icon="file" size="lg" />
              <Form.Group
                htmlFor="file"
                controlId="formFile"
                className="mb-3"
                onChange={onfileChange}
              >
                <Form.Label>Selecciona la portada de la pelicula</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </div>
            <MDBBtn onClick={uploadMovie} className="w-100 mb-4 my-5" size="md">
              Enviar
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default NewMovies;
