// componente con la barra de navegacion, esta se muestra 
// unicamente si el usuario tiene una sesion iniciada, 
// (esto se comprueba en app.js con un ternario)
// esta nos da acceso a funciones de la pagina exclusivas,
// solo para usuarios registrados, como agregar peliculas
// editarlas y agregar cines.

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import LogOut from '../Login-out-Component/Logout';


export default function Navigationbar() {

  
  const [showBasic, setShowBasic, showNavRight ] = useState(false);

  return (
    <MDBNavbar expand='lg' dark bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>Inicio</MDBNavbarBrand>

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
          <MDBNavbarNav  className='mr-auto mb-2 mb-lg-0'>

            <MDBNavbarItem>

            <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Cines
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href='/newcinema' link>Agregar cine</MDBDropdownItem>    
                  <MDBDropdownItem href='/editcinema' link>Editar cine</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
            <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Peliculas
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href='/newmovie' link>Agregar pelicula</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
               </MDBNavbarItem>
           
            <MDBNavbarNav right fullWidth={false}>
            <MDBNavbarItem navbar show={showNavRight} >
            <MDBNavbarItem>
              <MDBNavbarLink onClick={LogOut} >Cerrar 
              sesion</MDBNavbarLink>
              <ToastContainer autoClose={1500}/>
            </MDBNavbarItem>
            </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}