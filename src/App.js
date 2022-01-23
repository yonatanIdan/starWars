import "./App.css";
import React from "react";
import Part1 from './components/Part1';
import Part2 from './components/Part2';

function App() {
  let urlAPI = "https://swapi.py4e.com/api/";

  return (
    <div className="App">
      <Part1 api={urlAPI}/>
      <Part2 api={urlAPI}/>
    </div>
  );
}

export default App;
