import Cookies from 'universal-cookie';
import { AlertsSuccess } from '../Alert-Warning/Alert';

// componente que borra una cookie con una condicion
// si la cookie con nombre existe y se encuentra almacenada 
// en el navegador con la dependencia universal-cookie, la puedes 
// comprobar y borrar, por lo cual se usa para el cierre de sesion.

const cookies = new Cookies();


const LogOut = () => {
if(cookies.get("rol")){
AlertsSuccess("Hasta Luego!")
cookies.remove('rol');
setTimeout(() => {
    window.location.href = '/';
  }, 2000)
}
}


export default LogOut;