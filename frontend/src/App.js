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
  }, [])
  return (
    <div>
      <Header/>
      <FileList uploadedFiles={files}></FileList>
    </div>
  );
}

export default App;
