/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const FileList = ({uploadedFiles, handleClick}) => {
	if (uploadedFiles === null) {
		return (
			<div>
				<p>No files present.</p>
			</div>
		);
	} else {      
		return (        
			<div>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <h3>Available Files</h3>
				<Box>
					{uploadedFiles.map(f => 
						<List key ={f.id}>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton onClick={()=> {handleClick(f);}}>
									<ListItemText primary={f.name}/>
								</ListItemButton>
							</ListItem>
							<Divider />
						</List>
					)}
				</Box>
			</div>
		);
	}
};

export default FileList;