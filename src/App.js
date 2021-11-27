import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';



function App() {

  const [a, setA] = useState(1);
  useEffect(() => {
    async function fetchFloors(){
      const res = await axios({
        method: 'get',
        baseURL: 'http://localhost:8080',
        url: 'floors'
      })
      console.log(res.data);
    }
    fetchFloors();
  }, [  a ])


  return (
    <div className="App">
      <button onClick={() => setA(a+1)}> click </button>
      <h1> {a} </h1>
    </div>
  );
}

export default App;
