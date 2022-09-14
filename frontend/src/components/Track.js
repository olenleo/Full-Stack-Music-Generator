
// This component exists for very early phase testing puproses.

// Eventually the new music will be rendered as a text field containing the .rb program
// Or as .midi music in a player!
const Track = ({ event }) => {
    
    if (event.data !== undefined && event.data.length === 2) {
        return (
            <li>
                {event.deltaTime} [{event.data[0]} : {event.data[1]}]
            </li>
        )
    }
}


export default Track;