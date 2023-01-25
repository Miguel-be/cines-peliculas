/*Vista que permite permite crear un cine*/
import { useState, useEffect } from "react";
import React from "react";
import Cookies from "universal-cookie";
import {
  AlertsError,
  AlertsSuccess,
  AlertsInfo,
} from "../components/Alert-Warning/Alert";
import { createDataCinema, getDataMovies } from "../services/api";
import Form from "react-bootstrap/Form";
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

function NewCinema() {
  /*Se declaran e inicializan variables de estado para controlar la información del cine que se va a guardar (cinema), la lista de 
  peliculas que se muestran en el select multiple que permite al usuario seleccionar cuales se van a proyectar en el cine (listofmovies)
  y la lista de cines existentes en el sistema de los cuales, el usuario va a elegir que cine quiere editar (listofcinemas)*/
  const [cinema, setCinema] = useState({
    name: "",
    location: "",
    movies: [],
  });

  const [listofmovies, setListofmovies] = useState([]);

  /*controla que no se guarde información erronea / incompleta en el cine*/
  function hayerror() {
    if (!cookies.get("rol") || cookies.get("rol") !== "admin") {
      AlertsError("Tienes que identificarte");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

      return true;
    }
    if (cinema.name === "") {
      AlertsInfo("Introduce un nombre al cine");
      return true;
    } else if (cinema.location === "") {
      AlertsInfo("Introduce una dirección al cine");
      return true;
    } else if (cinema.movies.length === 0) {
      AlertsInfo("Selecciona al menos una película");
      return true;
    }
    return false;
  }
  /*función para gestionar el cambio de valores en los input de tipo texto*/
  function handleText(ev) {
    setCinema({ ...cinema, [ev.target.id]: ev.target.value });
  }
  /*función para guardar la información del cine. Tiene comprobaciones adicionales a las de hay error*/
  const uploadCinema = (ev) => {
    ev.preventDefault();
    if (!hayerror()) {
      createDataCinema(cinema).then((resp) => {
        AlertsSuccess("El cine se ha registrado correctamente");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      });
    }
  };
  /*función para guardar los select multiples de las peliculas*/
  const handleSelect = (ev) => {
    const selection = ev.target.selectedOptions;
    let newMovies = [];
    for (let i = 0; i < selection.length; i++) {
      if (selection[i].selected) {
        newMovies.push(selection[i].value);
      }
    }
    setCinema({ ...cinema, movies: newMovies });
  };
  /*se muestran las peliculas al cargar la página*/
  useEffect(() => {
    getDataMovies().then((resp) => {
      setListofmovies(resp);
    });
  }, []);

  return (
    <div>
      <MDBContainer>
        <MDBCard
          className="mx-5 my-3 mb-5 p-5 shadow-5"
          style={{ marginTop: "50px", backdropFilter: "blur(100px)" }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Nuevo Cine</h2>
            <MDBRow>
              <MDBCol col="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Nombre del cine"
                  id="name"
                  type="text"
                  onChange={handleText}
                />
              </MDBCol>
              <MDBCol col="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Direccion"
                  id="location"
                  type="text"
                  onChange={handleText}
                />
              </MDBCol>
            </MDBRow>
            <div>
              <h5 className="text-center my-1">Selecciona las películas</h5>
              <MDBIcon className="mb-2" icon="film" size="lg" />
              <Form.Select
                multiple
                aria-label="Default select example"
                onChange={handleSelect}
              >
                {listofmovies
                  ? listofmovies.map((element) => (
                      <option
                        key={element._id}
                        value={element._id}
                        label={element.title}
                      ></option>
                    ))
                  : ""}
              </Form.Select>
            </div>
            <MDBBtn
              onClick={uploadCinema}
              className="w-100 mb-4 my-5"
              size="md"
            >
              Enviar
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default NewCinema;
