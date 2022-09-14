import React from "react";
import File from "./File";

const FileList = ({uploadedFiles}) => {
    if (uploadedFiles === null) {
        return (<div>
            <p>No files present.</p>
        </div>)
    } else {
    return (
    <div>
        <h3>Uploaded files:</h3>
        
        <ul>
            {uploadedFiles.map(f => 
           <File key = {f.id} file = {f}/>
        )}
        </ul>
    </div>
    );
}}


export default FileList