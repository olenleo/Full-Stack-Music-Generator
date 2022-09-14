/* eslint-disable react/prop-types */
import React from 'react';

const File = ({file}) => {
	return (
		<li key ={file.id}>
			<p>{file.name}</p>
		</li>
	);
};

export default File;