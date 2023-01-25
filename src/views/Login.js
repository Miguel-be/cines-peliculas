// Este componente contiene la logica necesaria para comprobar 
// si un usuario existe en la base de datos, lo cual nos crea una cookie
// para guardar la sesion y poder obtener acceso a los privilegios 
// de un usuario registrado.



import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  AlertsError,
  AlertsSuccess,
  AlertsInfo,
} from "../components/Alert-Warning/Alert.js";
import { ToastContainer } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const dataBaseUsers = "https://proyecto-node-olive.vercel.app/user/login";
const cookies = new Cookies();

// Con esta clase nos permite capturar el estado del input del usuario


export default class Login extends Component {

  // creamos el esquema de usuario que captura los datos introducidos por el usuario en los inputs y  la base de datos para hacer la comprobacion.

  state = {
    form: {
      email: "",
      password: "",
    },
  };

  // handleChange se encargara de capturar los datos introducidos en cada input y este trabajara de la mano con el esquema creado anteriormente, haciendo uso del metodo spread ira capturando los estados (state) dependiendo el nombre que se le de a cada input, los nombres dependen de los que se asignen en el esquema anterior.

  handleChange = async (ev) => {
    await this.setState({
      form: {
        ...this.state.form,
        [ev.target.name]: ev.target.value,
      },
    });
  };

  // creamos el evento que sucedera cuando el usuario de click al boton iniciar sesion
  // este atributo se le pasara al boton mediante el atributo onClick

  loginIn = async (e) => {
    e = e || window.event;
    e.preventDefault();

    // condicionales para prevenir formularios en blanco

    if (this.state.form.email === "") {
      AlertsInfo("Debes ingresar un correo");
    } else if (this.state.form.password === "") {
      AlertsInfo("Debes ingresar una contraseña");
    } else

    // Hacemos uso de la dependencia axios, este nos permite interactuar con la api, en este caso con un metodo post, le damos una url (dataBaseUsers) que esta guardada en una constante y le pasaremos unos parametros, estos serian el email y el password , capturados del input por la funcion handleChange, los cuales son enviados y comprobados por el servidor.

      await axios
        .post(dataBaseUsers, {
          email: this.state.form.email,
          password: this.state.form.password,
        })
// si la informacion es correcta recibiremos una respuesta con los datos del usuario, se comprobara si el usuario esta registrado como admin (atributo establecido en el servidor) si es asi se le asigna una cookies
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          cookies.set("rol", response.rol, { path: "/" });

          AlertsSuccess("Has iniciado sesion correctamente");

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((err) => {
          

          // en el caso que no se encuentre el usuario, se recibiran los errores establecidos en el servidor (como usuario no registrado, ya existente, etc).

          switch (err.response.data) {
            case "Failed to serialize user into session":
              AlertsError("Correo o contraseña invalida");
              break;

            case err.response.data:
              AlertsInfo(err.response.data);
              break;

            default:
          }
        });
  };
// funcion para que el formulario se envie con la tecla enter
  onKeyPress = (e) => {
    if (e.which === 13) {
      this.loginIn();
    }
  };

  render() {
    return (
      <div>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "500px" }}
              >
                <MDBCardBody
                  onKeyPress={this.onKeyPress}
                  className="p-5 w-100 d-flex flex-column"
                >
                  <h2 className="fw-bold mb-5 text-center">Bienvenido</h2>
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Correo electronico"
                    id="formControlLg"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    required
                    size="lg"
                  />
                  <form>
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      size="lg"
                      required
                    />
                  </form>
                  <MDBBtn
                    size="lg"
                    onClick={() => {
                      this.loginIn();
                    }}
                  >
                    Iniciar Sesion
                  </MDBBtn>

                  <ToastContainer autoClose={1500} />
                  <hr className="my-4" />
                  <div className="text-center">
                    <p>No estas registrado?</p>
                  </div>
                  <MDBBtn
                    className="mb-2 w-100"
                    href="/register"
                    size="lg"
                    style={{ backgroundColor: "#dd4b39" }}
                  >
                    <MDBIcon icon="user-plus" className="mx-2" />
                    Registrarse
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
