import axios from 'axios';
const baseUrl =  'http://localhost:3001/api/files/';

let token = null;

const setToken = newToken => {
	token = `bearer ${ newToken }`;
	console.log('TOKEN set:', token );
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const getMidiData = ( filename ) => {
	const request = axios.get(baseUrl + filename);
	return request.then(response => response.data);
};

const exportedObject =  { getAll, setToken, getMidiData };
export default exportedObject;