// Este componente contiene la logica necesaria para registrar
// un usuario  en la base de datos y poder obtener acceso a los privilegios 
import React, { Component } from 'react'
import axios from 'axios';
import { AlertsError, AlertsSuccess, AlertsInfo } from '../components/Alert-Warning/Alert.js';
import { ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
const cookies = new Cookies();


const dataBaseUsers = "https://proyecto-node-olive.vercel.app/user/register";


// Con esta clase nos permite capturar el estado del input del usuario

class Register extends Component {
  
  // creamos el esquema de usuario que captura los datos introducidos por el usuario en los inputs y  la base de datos para hacer la comprobacion.
  
    state={
      form:{
          email: '',
          password: '',
          rol: 'admin'
      }
  }
  
// handleChange se encargara de capturar los datos introducidos en cada input y este trabajara de la mano con el esquema creado anteriormente, haciendo uso del metodo spread ira capturando los estados (state) dependiendo el nombre que se le de a cada input, los nombres dependen de los que se asignen en el esquema anterior.

  handleChange = async (ev) => {
    await this.setState({
        form:{
            ...this.state.form,
            [ev.target.name]: ev.target.value
        }
    })
  
  }

  // creamos el evento que sucedera cuando el usuario de click al boton registrarse
  // este atributo se le pasara al boton mediante el atributo onClick
  
  registerNew = async (e) => {
  
      e = e || window.event;
          e.preventDefault();

          // condicionales para prevenir formularios en blanco
          
          if(this.state.form.email === ""){
      AlertsInfo("Debes ingresar un correo")
          }else if(this.state.form.password === ""){

            AlertsInfo("Debes ingresar una contraseña");
      
          }else
          
  // Hacemos uso de la dependencia axios, este nos permite interactuar con la api, en este caso con un metodo post, le damos una url (dataBaseUsers) que esta guardada en una constante y le pasaremos unos parametros, estos serian el email y el password , capturados del input por la funcion handleChange, los cuales son enviados y registrados en el servidor.

    await axios.post(dataBaseUsers, {
        email: this.state.form.email,
        password: this.state.form.password,
        rol: this.state.form.rol
    })
// si al enviar la informacion se comprueba que el usuario no existe y cunple con las condiciones, recibimos la respuesta y se procede a registrarlo.
    
    .then(response =>{
      
        
      return response.data;
      
      
   })
    .then(response =>{
      cookies.set('rol', response.rol, {path: "/"})
       AlertsSuccess('Te has registrado correctamente');

       setTimeout(() => {
        window.location.href = '/';
      }, 2000) 
    })
    .catch(err => {
    
      // en el caso que falle la solicitud , se recibiran los errores establecidos en el servidor (como usuario registrado, formato de email incorrecto, etc).

      switch (err.response.data ) {

        case "Users validation failed: email: El email no tiene un formato válido":
          AlertsInfo("El email no tiene un formato valido");
          break;

        case err.response.data:
          AlertsInfo(err.response.data);
          break;

      

          default:

          
      }
   
      

        AlertsError('email o contraseña no valida');
    })
  }

  // funcion para que el formulario se envie con la tecla enter

  onKeyPress = (e) => {
 
    if(e.which === 13) {
      this.registerNew();
    }
  }



  render() {
    return (
        <div className= "bcLogin">
          <MDBContainer fluid>
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                <MDBCardBody onKeyPress={this.onKeyPress} className='p-5 w-100 d-flex flex-column'>
                  <h2 className="fw-bold mb-5 text-center">Registro</h2>
                  <form>
                    <MDBInput
                    wrapperClass='mb-4 w-100'
                    label='Correo electronico'
                    name="email"
                    type='email'
                    onChange={this.handleChange}
                    required
                    size="lg"/>
                  </form>
                  <form>
                    <MDBInput
                    wrapperClass='mb-4 w-100'
                    label='Password'
                    name="password"
                    type='password'
                    onChange={this.handleChange}
                    size="lg"
                    required
                    />
                  </form>
                  <MDBBtn 
                  size='lg' 
                  onClick={() => {this.registerNew()} }>Registrarse</MDBBtn>
                  <ToastContainer autoClose={1500}/>
                  <hr className="my-4" />
                  <div className='text-center'>
                      <p>Ya estas registrado?</p>
                  </div>
                  <MDBBtn
                  className="mb-2 w-100 color='success'"
                  href='/login'
                  size="lg"
                  style={{backgroundColor: '#0C9505'}}
                  >
                    <MDBIcon
                    icon="users"
                    className="mx-2"/>
                    Iniciar sesion
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
            
                </MDBContainer>
        </div>
    )
  }
}


export default Register;