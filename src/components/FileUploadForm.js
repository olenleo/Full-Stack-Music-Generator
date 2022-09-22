/* eslint-disable react/prop-types */
import React from 'react';
import files from '../services/files.js';

const FileUploadForm = ( {refreshFiles}) => {
	const [selectedFile, setSelectedFile] = React.useState(null);

	const handleSubmit = async() => {
		const formData = new FormData();
		try {
			// eslint-disable-next-line no-unused-vars
			files.upload(formData).then(response => response.data);
		}
	    catch(error) {
			console.log(error);
		}
		refreshFiles();
	};

	const handleFileSelect = (event) => {
		setSelectedFile(event.target.files[0]);
		console.log('Selected file:', selectedFile);
	};

	return (
		<form onSubmit={handleSubmit} encType="multipart/form-data" >
			<input type="file" name="uploadMidi" onChange={handleFileSelect} />
			<input type="submit" value="Upload File" />
		</form>
	);
};

export default FileUploadForm;