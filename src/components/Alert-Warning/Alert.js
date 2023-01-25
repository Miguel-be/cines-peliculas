// Componente que contiene funciones que crean alerts personalizados
// como sus nombres los indican son > 
// Alerterror : para los errores
// AlertsInfo: para dar informacion de algun dato en especifico
// AlertsSuccess: para indicar que fue un exito la accion
// DEPENDENCIA: react-toastify

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customId = "custom-id-yes";
  
  
const AlertsError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_CENTER,
    toastId: customId
  });
}
const AlertsSuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
    toastId: customId
  });
}

const AlertsInfo = (msg) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_CENTER,
    toastId: customId
  });
}


export {AlertsError , AlertsSuccess, AlertsInfo};