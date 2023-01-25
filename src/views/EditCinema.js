/*Vista que permite permite editar/ borrar un cine*/
import { useState, useEffect } from "react";
import React from "react";
import Cookies from "universal-cookie";
import { AlertsError, AlertsSuccess, AlertsInfo } from "../components/Alert-Warning/Alert";
import {
  editDataCinemas,
  deleteDataCinemas,
  getDataMovies,
  getDataCinemas,
} from "../services/api";
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
import Form from "react-bootstrap/Form";

const cookies = new Cookies();

const EditCinema = () => {
  /*Se declaran e inicializan variables de estado para controlar la información del cine que se va a guardar (cinema), la lista de 
  peliculas que se muestran en el select multiple que permite al usuario seleccionar cuales se van a proyectar en el cine (listofmovies)
  y la lista de cines existentes en el sistema de los cuales, el usuario va a elegir que cine quiere editar (listofcinemas)*/
  let [cinema, setCinema] = useState({
    name: "",
    location: "",
    movies: [],
  });

  const [listofmovies, setListofmovies] = useState([]);

  const [listofcinemas, setListofcinemas] = useState([]);

  /*se carga la lista de cines y se incluye la opción de seleccionar un cine para ayudar al usuario a saber que tiene
  que seleccioar un cine*/
  useEffect(() => {
    getDataCinemas().then((resp) => {
      const initial = {
        name: "Selecciona un cine",
        location: "",
        movies: [],
        _id: 0,
        __v: 0,
      };
      resp.unshift(initial);
      setListofcinemas(resp);
    });
  }, []);

  /*controla que no se guarde información erronea / incompleta en el cine*/
  function hayerror() {
    if (!cookies.get("rol") || cookies.get("rol") !== "admin") {
      AlertsError("Tienes que identificarte");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

      return true;
    }
    if (cinema.name === "" || cinema.name === "Selecciona un cine") {
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
      editDataCinemas(cinema._id, cinema)
        .then((resp) => {
          AlertsSuccess("El cine se ha actualizado correctamente");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        })
        .catch((error) => {
          AlertsError("Selecciona alguna película");
          setTimeout(() => {}, 3000);
        });
    }
  };

 /*función para eliminar un cine. Comprueba que se haya seleccionado un cine*/
  const deleteCinema = (ev) => {
    ev.preventDefault();
    if (cinema._id) {
      deleteDataCinemas(cinema._id).then((resp) => {
        AlertsSuccess("El cine se ha borrado correctamente");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      });
    } else {
      AlertsError("Tienes que seleccionar un cine");
      setTimeout(() => {}, 3000);
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

  /*función para recoger el cine seleccionado por el usuario. También hay comprobaciones relacionadas con la asincronia
  de la carga de datos*/
  const handleSelectSingle = (ev) => {
    const foundCinema = listofcinemas.find(
      (element) => element._id === ev.target.value
    );
    if (foundCinema) {
      setCinema(foundCinema);
    } else
      setCinema({
        name: "Selecciona un cine",
        location: "",
        movies: [],
      });
  };

  return (
    <>
      {cinema ? (
        <div>
          <MDBContainer>
            <MDBCard
              className="mx-5 my-3 mb-5 p-5 shadow-5"
              style={{ marginTop: "10px", backdropFilter: "blur(100px)" }}
            >
              <MDBCardBody className="text-center">
                <div>
                  <h2 className="fw-bold mb-5">
                    Introduce la información del cine
                  </h2>
                  <MDBRow>
                    <MDBCol col="12">
                      <Form.Select
                        id="cinemas"
                        htmlFor="cinemas"
                        onChange={handleSelectSingle}
                      >
                        {listofcinemas
                          ? listofcinemas.map((element) => (
                              <option
                                key={element._id}
                                value={element._id}
                                label={element.name}
                              ></option>
                            ))
                          : ""}
                      </Form.Select>
                    </MDBCol>
                  </MDBRow>
                </div>
                <div>
                  <h5 className="text-center mb-4 mt-4">
                    Edita la información del cine
                  </h5>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Nombre"
                        id="name"
                        type="text"
                        onChange={handleText}
                        value={cinema.name}
                      />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Direccion"
                        id="location"
                        type="text"
                        onChange={handleText}
                        value={cinema.location}
                      />
                    </MDBCol>
                  </MDBRow>
                </div>
                <div>
                  <h5 className="text-center my-1">
                    Selecciona las películas que se mostraran en el cine
                  </h5>
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
                  Incluir cambios
                </MDBBtn>
                <MDBBtn
                  onClick={deleteCinema}
                  className="w-100 mb-4 my-5"
                  size="md"
                >
                  Borrar cine
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EditCinema;
