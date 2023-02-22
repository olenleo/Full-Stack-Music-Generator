import axios from 'axios';
const baseUrl =  '/api/files/';

// eslint-disable-next-line no-unused-vars
let token = null;

const setToken = newToken => {
	token = `bearer ${ newToken }`;
};

const getAll = () => {
	const request = axios.get(baseUrl + 'getList');
	return request.then(response => response.data);
};

const getMidiData = ( filename ) => {
	const request = axios.get(baseUrl + 'get/' + filename);
	return request.then(response => response.data);
};

const upload = ( file ) => {
	const request = axios.post((baseUrl + 'upload/'), file);
	return request.then(response => response.data);
};

const deleteFile = (file) => {
	const request = axios.delete(baseUrl + 'delete/' + file);
	return request.then(response => response.data);
};

const exportedObject =  { getAll, setToken, getMidiData, upload, deleteFile};
export default exportedObject;