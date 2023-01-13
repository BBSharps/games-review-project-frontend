import "./App.css";
import Main from "./elements/Main";
import Navbar from "./elements/Navbar";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Games review page</h1>
      </header>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
