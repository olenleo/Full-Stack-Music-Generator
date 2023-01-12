/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import uniqid from 'uniqid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

const TrackList = ( { midiDataAsJSON, handleClick }) => {
	const [listShouldRender, setListShouldRender] = useState(true);
	const [track, setTrack] = useState();
	const closeList = () => {
		setListShouldRender(false);
	};

	const openList = () => {
		setListShouldRender(true);
	};

	if (midiDataAsJSON === null || midiDataAsJSON === undefined || midiDataAsJSON.length === 0) {
		return(
			<div>
				<h3>The track list should be here</h3>
			</div>
		);
	} 
	if (midiDataAsJSON && listShouldRender) {
		const trackInfo = midiDataAsJSON.track;
		return (        
			<div>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
				<h3>Available MIDI tracks</h3>
				<Box>
					{trackInfo.map((track, index) => 
						<List key ={uniqid('index-', index)}>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton onClick={()=> {handleClick(index), setTrack(index),closeList();}}>
									{`Track ${index} | Events: ${track.event.length}`}
									<ListItemText primary=''/>
								</ListItemButton>
							</ListItem>
							<Divider />
						</List>
					)}
				</Box>
				
			</div>
		);
	}  else {
		return(
			<div>
				<h3>Selected MIDI track: <Button onClick={() => openList()}>{track}</Button></h3>
			</div>
		);
	}
};

export default TrackList;
