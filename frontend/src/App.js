import Header from "./components/Header";
import FileList from "./components/FileList";
import { useState, useEffect} from 'react'
import fileService from './services/files'
import Button from '@mui/material/Button';


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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Header/>
      <FileList uploadedFiles={files}></FileList>
      <Button variant="contained" onClick={()=> console.log("Naps")}>Demo of a button</Button>
    </div>
  )
}

export default App;
