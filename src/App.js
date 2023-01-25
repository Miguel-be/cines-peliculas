import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import NewCinema from "./views/NewCinema.js";
import NavPublic from "./components/Nav/NavPublic.js";
import Home from "./views/Home.js";
import ListofMovies from "./views/ListofMovies.js";
import EditMov from "./views/EditMov.js";
import EditCinema from "./views/EditCinema.js";
import NewMovie from "./views/NewMovie.js";
import NavLogin from "./components/Nav/NavLogin";
import Cookies from "universal-cookie";
import Footer from "./components/Footer.js";
const cookies = new Cookies();

function App() {
  return (
    <>
      <div>
        <Router>
          {/* este ternario comprueba si el usuario tiene una sesion iniciada
        comprobando si existe una cookie predefinida rol, si existe nos muestra 
        la barra de navegacion para usuarios, pero si la cookie no se encuentra nos mostrara la barra de navegacion para el publico. */}
          {cookies.get("rol") && cookies.get("rol") === "admin" ? (
            <NavLogin />
          ) : (
            <NavPublic />
          )}

          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/movie/detail/:id" element={<ListofMovies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newcinema" element={<NewCinema />} />
            <Route path="/newmovie" element={<NewMovie />} />
            <Route path="/editmovie/:id" element={<EditMov />} />
            <Route path="/editcinema" element={<EditCinema />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
