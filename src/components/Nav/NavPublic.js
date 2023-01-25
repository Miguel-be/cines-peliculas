// componente con la barra de navegacion, esta se muestra 
// cuando el usuario no tiene una sesion iniciada, 
// (esto se comprueba en app.js con un ternario)
// solo nos mostrara informacion de peliculas y detalles


import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse
} from 'mdb-react-ui-kit';



export default function Navigationbar() {

  
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' dark bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/*'>Inicio</MDBNavbarBrand>

        <MDBNavbarToggler
        type='button'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
        <MDBIcon icon="bars" size="lg" />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink aria-current='page' href='/login'>
                Iniciar Sesion
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/register'>Registrarse</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}