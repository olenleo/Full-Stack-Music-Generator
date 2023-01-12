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

const FileList = ({selectedFile, uploadedFiles, handleClick}) => {
	const [listShouldRender, setListShouldRender] = useState(true);
	
	const closeList = () => {
		setListShouldRender(false);
	};

	const openList = () => {
		setListShouldRender(true);
	};
	if (uploadedFiles === null) {
		return (
			<div>
				<p>No files present.</p>
			</div>
		);
	}    
	if (selectedFile && listShouldRender === true) {
		return (        
			<div>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
				<h3>Available Files</h3>
				<Box>
					{uploadedFiles.map(f => 
						<List key ={f.id}>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton onClick={() => {handleClick(f), closeList();}}>
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
				<h3>Selected File: <Button onClick={() => openList()}>{selectedFile.name}</Button></h3>
			</div>
		);
	}
};

export default FileList;