import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import './App.css';
import Register from './components/Register';

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
        <Register/>
      </div>
    </>
  );
}

export default App;
