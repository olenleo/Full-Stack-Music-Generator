/**
 * Component returns a Sonic Pi compatible program
 * @param {trackdata} JSON parsed midi data
 * @param {trieLength} The length of the note sequence stored in the Trie
 * @returns 
 */

import Note from '../components/Note'

let noteEvents = []

const formatAndPushNoteEvent = (event, index) => {
    if (event.type === 9 || event.type === 11) {
        const key = "" + event.deltaTime + index
        const noteJSONarray = {
            note: `${event.data[0]}`,
            amp: `${event.data[1]}`,
            sleep: `sleep 1`,
            key: `${key}`
        }
        noteEvents.push(noteJSONarray)
    }
}


const SonicPiFormatter =( {trackdata, trieLength} ) => {
    noteEvents = []
    console.log("Track data!" , trackdata)


    trackdata.event.sort((a,b) => {
        return a.deltaTime - b.deltaTime
    });

    trackdata.event.map((event, index) => (
        formatAndPushNoteEvent(event, index)
    ))
    return (
        <div>
            <h1>Sonic Pi formatter here</h1>
            <code>
            {noteEvents.map(noteJSONarray => (
                    <Note key = {noteJSONarray.key} note={noteJSONarray.note} amplitude={noteJSONarray.amp}></Note>
            ))}
            </code>            
            <h1>End Sonic Pi formatter</h1>
        </div>
    )
}

export default SonicPiFormatter