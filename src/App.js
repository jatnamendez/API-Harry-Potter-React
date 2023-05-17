import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);
  const [houseFilter, setHouseFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://hp-api.onrender.com/api/characters");
      const data = await response.json();
      setCharacters(data); // Establecer los datos en el estado

    }

    fetchData();
  }, []);


  const handleHouseFilter = (event) => {
    setHouseFilter(event.target.value);
  };

  const filteredCharacters = characters
    .filter(
      (character) =>
        character.image && character.house.toLowerCase().includes(houseFilter.toLowerCase())
    )
    .slice(0, 25);


    return (
      <div className='container'>
        <div className="input-container">
          <input
            type="text"
            placeholder="🔍 Buscar"
            value={houseFilter}
            onChange={handleHouseFilter}
          />
        </div>
        <div className="image-container">
          {filteredCharacters.map((character) => (
            <div className='character' key={character.id}>
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
              <h3>{character.house}</h3>
              <h4>{character.patronus}</h4>
              <h5>{character.ancestry}</h5>
            </div>
          ))}
        </div>
      </div>
    );
    
  }
  
  export default App;