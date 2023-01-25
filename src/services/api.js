import axios from "axios";

const getDataMovies = () => {
    return  fetch("https://proyecto-node-olive.vercel.app/movies")
    .then((res) => res.json())
    .then((info) => {
      return info;      
    });    
};

const getDataCinemas = () => {
  return  fetch("https://proyecto-node-olive.vercel.app/cinemas")
  .then((res) => res.json())
  .then((info) => {
    return info;
  });
};

const editDataCinemas = (id, cinema) => {
  return axios.put(`https://proyecto-node-olive.vercel.app/cinemas/edit-free/${id}`, cinema)
  .then((info) => {
    return info;
  });
};

const deleteDataCinemas = (id) => {
  return axios.delete(`https://proyecto-node-olive.vercel.app/cinemas/delete-free/${id}`)
  .then((info) => {
    return info;
  });
};

const editDataMovieswithForm = (id, form) => {
  return axios.put(`https://proyecto-node-olive.vercel.app/movies/edit-free/${id}`, form)
  .then((info) =>{
    return info;
  })
};

const editDataMovieswithMovie = (id, movie) => {
  return axios.put(`https://proyecto-node-olive.vercel.app/movies/edit-free-nocover/${id}`, movie)
  .then((info) =>{
    return info;
  })
};

const deleteDataMovie = (id) => {
  return axios.delete(`https://proyecto-node-olive.vercel.app/movies/delete-free/${id}`)
  .then((info) => {
    return info;
  });
};

const createDataCinema = (cinema) => {
  return axios.post('https://proyecto-node-olive.vercel.app/cinemas/free', cinema)
  .then((info) => {
    return info;
  });
};

const createDataMovie = (form) => {
  return  axios.post('https://proyecto-node-olive.vercel.app/movies/with-uri-free', form)
  .then((info) =>{
    return info;
  })
};


export {getDataMovies, getDataCinemas, editDataCinemas, editDataMovieswithForm, editDataMovieswithMovie, deleteDataMovie, deleteDataCinemas,createDataMovie, createDataCinema}
