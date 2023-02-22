/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import files from '../services/files.js';

const FileUploadForm = ( {refreshFiles}) => {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleSubmit = async( event ) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('uploadMidi', selectedFile);
		try {
			files.upload(formData).then(response => response.data);
		}
		catch(error) {
			console.log(error);
		}
		refreshFiles();
	};

	const handleFileSelect = ( event ) => {
		event.preventDefault();
		setSelectedFile(event.target.files[0]);
	};

	return (
		<form onSubmit={handleSubmit} encType="multipart/form-data" >
			<input type="file" name="uploadMidi" onChange={handleFileSelect} />
			<input type="submit" value="Upload File" />
		</form>
	);
};

export default FileUploadForm;