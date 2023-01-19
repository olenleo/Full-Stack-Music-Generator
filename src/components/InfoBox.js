import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';



const infoBox = ( thing ) => {
	console.log('thing', thing);
	return (
		<Box id="infoBox" sx={{p:4, minHeight:200}}>
			<Typography variant='h5' component="h5">Let&#39;s get generating music! </Typography>
			<p>This app reads midi files and generates new music utilising Markov Chains and a Trie data structure. </p>
			<p><b>Usage:</b></p>
			<Typography variant='p' component="ul">
				<ul>
					<li>Upload a file or select an existing one</li>
					<li>Select midi track and generate music</li>
					<li>The end result contains a track for <a href='https://sonic-pi.net'>Sonic Pi</a>. Just copy, paste and jam!</li>
				</ul>
			</Typography>
			<p>Think of this as a way to quickly generate melodies for jamming, or perhaps getting out of a creative rut. The algorithm is not perfect - it might learn the material &#39;wrong&#39; since you never know what you&#39;ll find in a MIDI file. But I hope you have fun playing around with the results!</p>
			<p>The application is still in early stages of development. The final product will support .midi generation - download & place it into your IDE of choice!</p>
		</Box>
		
	);
};

export default infoBox;