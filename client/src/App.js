import logo from './logo.svg';
import './App.css';
import Candidates from './pages/Candidates';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Candidates />
        <button onClick={() =>   localStorage.clear()}>clear</button>
      </header>
    </div>
  );
}

export default App;
