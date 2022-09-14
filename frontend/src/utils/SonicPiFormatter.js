/**
 * Component returns a Sonic Pi compatible program
 * @param {trackdata} JSON parsed midi data
 * @param {trieLength} The length of the note sequence stored in the Trie
 * @returns 
 */


let noteEvents = []
const formatAndPushNoteEvent = (event) => {
    console.log(event)
    if (event.type === 9 || event.type === 11) {
        const noteJSONarray = {
            note: `play ${event.data[0]}, amp: ${event.data[1] / 100}`,
            sleep: `sleep 1`
        }
        
        console.log('Push ', noteJSONarray)
        noteEvents.push(noteJSONarray)
    }
}


const SonicPiFormatter =( {trackdata, trieLength} ) => {
    noteEvents = []
    console.log("Track data!" , trackdata)


    trackdata.event.sort((a,b) => {
        return a.deltaTime - b.deltaTime
    });

    trackdata.event.map(event => (
        formatAndPushNoteEvent(event)
    ))
    return (
        <div>
            <h1>Sonic Pi formatter here</h1>
            {noteEvents.map(noteJSONarray => (
                <div>
                    <p>{noteJSONarray.note}</p>
                    <p>{noteJSONarray.sleep}</p>
                    
                </div>
            ))}
            <code>

            </code>
            <h1>End Sonic Pi formatter</h1>
        </div>
    )
}

export default SonicPiFormatter