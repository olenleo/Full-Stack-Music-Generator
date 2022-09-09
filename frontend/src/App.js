import Header from "./components/Header";
import FileList from "./components/FileList";
import { useState, useEffect} from 'react'
import fileService from './services/files'

const App = () => {

  const [files, setFiles] = useState([])
  useEffect(() => {
    fileService.getAll().then(files =>
      setFiles( files )
    )
    
    fileService.getMidiData("Movie_Themes_-_Star_Wars_-_by_John_Willams.mid").then(data => {
      console.log(data)
    })
    
  }, [])
  return (
    <div>
      <Header/>
      <FileList uploadedFiles={files}></FileList>
    </div>
  );
}

export default App;
