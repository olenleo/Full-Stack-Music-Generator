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

const FileList = (
	{
		selectedFile, 
		setSelectedFile, 
		setFileIsSelected, 
		uploadedFiles, 
		setUploadedFiles, 
		fileService, 
		setMidiAsJSON, 
		setSelectedTrack
	}) => {
	
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

	const handleRemove = (file) => {
		fileService.deleteFile(file);
		closeList();
		setSelectedFile();
		setFileIsSelected(false);
		setSelectedTrack();
		setUploadedFiles(uploadedFiles.filter(f => f.name !== file ));
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
					{uploadedFiles.map(file => 
						<List key ={file.id}>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton onClick={() => getFile(file)}>
									<ListItemText primary={file.name}/>
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
				<h3>Selected File: <Button onClick={() => openList()}>{selectedFile}</Button>
					<IconButton onClick={() => handleRemove(selectedFile)} color="secondary" aria-label="Copy to clipboard">
						<DeleteForeverIcon/>
					</IconButton></h3>
			</div>
		);
	}
};

export default FileList;