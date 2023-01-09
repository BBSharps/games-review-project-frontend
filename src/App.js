import "./App.css";
import Main from "./elements/Main";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Games review page</h1>
      </header>
      <nav className="nav">
        <ul>
          <li>category nav</li>
        </ul>
      </nav>
      <Main />
    </div>
  );
}

export default App;
