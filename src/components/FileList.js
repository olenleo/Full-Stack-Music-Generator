/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FileList = ({selectedFile, setSelectedFile, setFileIsSelected, uploadedFiles, setUploadedFiles, fileService, setMidiAsJSON}) => {
	
	const [listShouldRender, setListShouldRender] = useState(true);

	const openList = () => {
		setSelectedFile();
		setListShouldRender(true);
	};
	
	const closeList = () => {
		setListShouldRender(false);
	};
	
	const getFile = async(filename) => {
		setSelectedFile(filename.name);
		setFileIsSelected(true);
		closeList();
		fileService.getMidiData(filename.name).then(data => setMidiAsJSON(data));
	};

	const handleRemove = (e) => {
		console.log(e);
		fetch('http://localhost:3001/api/files/delete/' + e, {
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			method: 'DELETE',
			body: e
		});
	};

	if (uploadedFiles === null) {
		return (
			<div>
				<p>No files present.</p>
			</div>
		);
	}  
	if (selectedFile === undefined || !selectedFile && listShouldRender === true) {
		return (        
			<div>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
				<h3>Available Files</h3>
				<Box>
					{uploadedFiles.map(f => 
						<List key ={f.id}>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton onClick={() => getFile(f)}>
									<ListItemText primary={f.name}/>
								</ListItemButton>
							</ListItem>
							<Divider />
						</List>
					)}
				</Box>
			</div>
		);
	} else {
		return(
			<div>
				<h3>Selected File: <Button onClick={() => openList()}>{selectedFile}</Button><IconButton onClick={() => handleRemove(selectedFile)} color="secondary" aria-label="Copy to clipboard">
					<DeleteForeverIcon/>
				</IconButton></h3>
			</div>
		);
	}
};

export default FileList;