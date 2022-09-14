import React from "react";

import Track from "./Track";
import SonicPiFormatter from "../utils/SonicPiFormatter";
const JSONmidiParser = ({midiData}) => {
    console.log('JSONmidiParser recieves ', midiData)
    if (midiData.length === 0) {
        return (
            <div>
                <h3>The midi data should be here.</h3>
                <p>The backend has not probably loaded the information yet.</p>
            </div>
        )
    }
    const data = midiData.track[1]
    return (

        <div>
            <h3>Midi data:</h3>
            <p>Number of tracks: {data.length}</p>
            
            <p>Render track[1]:</p>
            <SonicPiFormatter trackdata={data} trieLength={6}/>
            <ul>
               {data.event.map(TrackEvent => (
                
                <Track event={TrackEvent}/>
               ))}
            </ul>
            
             
        </div>
    )
}

export default JSONmidiParser;