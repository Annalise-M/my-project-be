import request from 'superagent';

const URL = 'https://hidden-lake-26631.herokuapp.com/';

export function fetchGuitars() {
  return request.get(`${URL}/posters`);
}

export function fetchGuitar(id) {
  return request.get(`${URL}/posters/${id}`);
}

