import * as React from 'react';
import File from "./File";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const FileList = ({uploadedFiles}) => {
    if (uploadedFiles === null) {
        return (<div>
            <p>No files present.</p>
        </div>)
    } else {      
        return (        
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Box>
                    {uploadedFiles.map(f => 
                        <List  key ={f.id}>
                            <Divider />
                                <ListItem disablePadding>
                                <ListItemButton onClick={()=> {console.log("This should generate music from", f.name)}}>
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
}

export default FileList