import Header from "./components/Header";
import FileList from "./components/FileList";
import { useState, useEffect} from 'react'
import fileService from './services/files'
import JSONmidiParser from "./components/JSONmidiParser";

const App = () => {

  const [files, setFiles] = useState([])
  const [midiAsJSON, setMidiAsJSON] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fileService.getAll().then(files =>
      setFiles( files ),
      setLoading(false)
    )
    
    fileService.getMidiData("Movie_Themes_-_Star_Wars_-_by_John_Willams.mid").then(data => {
      setMidiAsJSON( data )
      
    })
    
  }, [])

  if (isLoading) {
    return (
      <h1>Loading information from backend...</h1>
    )
  }
  return (
    <div>
      <Header/>
      <FileList uploadedFiles={files}></FileList>
      <JSONmidiParser midiData={midiAsJSON}/>
    </div>
  );
}

export default App;
