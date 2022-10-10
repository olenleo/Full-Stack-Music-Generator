/* eslint-disable react/prop-types */

import * as React from 'react';
import uniqid from 'uniqid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const TrackList = ( { midiDataAsJSON, handleClick }) => {
	if (midiDataAsJSON === null || midiDataAsJSON === undefined || midiDataAsJSON.length === 0) {
		return(
			<div>
				<h3>The track list should be here</h3>
			</div>
		);
	} else {
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
								<ListItemButton onClick={()=> {handleClick(index);}}>
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
	}
};

export default TrackList;
