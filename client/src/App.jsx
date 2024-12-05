import { useState, useEffect } from 'react';
import { Route,Routes } from 'react-router';
import axios from 'axios';
import './index.css';
import './App.css';
import Register from './components/Register';
import NavBar from "./components/navbar"
import CurrentState from "./components/NotifyState"


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080") 
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Woof! You've got a new error:", error);
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={
            <>
            <NavBar/>
              <h1>this is a landing page</h1>
            </>
          } />
          <Route path="/register" element = {
            <>
             <NavBar/>
             <CurrentState/>
              <Register/>

            </>
          }/>
        </Routes>
        {/* <Register/> */}
      </div>
    </>
  );
}

export default App;
