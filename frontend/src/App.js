import Header from "./components/Header";
import FileList from "./components/FileList";
function App() {
  return (
    <div>
      <Header/>
      <FileList uploadedFiles={null}></FileList>
    </div>
  );
}

export default App;
