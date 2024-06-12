import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "./Components/Alert";

function App() {
  const [pokemon, setPokemon] = useState();
  const [name, setName] = useState();
  const [sprites, setSprites] = useState();
  const [findName, setFindName] = useState();
  const [type, setType] = useState();
  const [alert, setAlert] = useState("");
  const [id, setId] = useState(3);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/ditto");

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const typeColor = {
    fire: "red",
    ground: "brown",
    water: "blue",
    normal: "gray",
  }

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setPokemon(response.data);
        setName(response.data.name);
        setType(response.data.types[0].type.name);
        setSprites(response.data.sprites.front_default);
      })
      .catch((err) => {
        if (err.response.status == 404) {
          setAlert("warning");
          setTimeout(() => {
            setAlert("")
          }, 3000);
        }
      });
  }, [url]);

  console.log(typeColor[type])

  const randomId = () => {
    setId(randomNumberInRange(1, 1000));
    setUrl(`https://pokeapi.co/api/v2/pokemon/${id}`);
  };
  console.log(id);

  return (
    <div
      data-theme="pastel"
      className="App mx-auto px-4 flex items-center flex-col justify-center"
    >
      {alert && <Alert type="warning" message="Pokemon not Found!" />}
      <div className="navbar bg-base-100 w-full flex justify-center mb-2 shadow-md">
        <h1 className="btn btn-ghost text-2xl">˙⋆✮PokeDex✮⋆˙</h1>
      </div>
      <div className="py-1">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={(e) => {
            setFindName(e.target.value);
          }}
        />
      </div>
      <div className="my-1 flex gap-3">
        <button
          className="btn btn-outline btn-primary"
          onClick={() =>
            setUrl(`https://pokeapi.co/api/v2/pokemon/${findName}`)
          }
        >
          Search Pokemon
        </button>
        <button className="btn btn-outline btn-secondary" onClick={randomId}>
          Generate Random Pokemon
        </button>
      </div>
      <div className={`card card-compact w-[300px] bg-${typeColor[type]}-600 mb-3 shadow-xl`}>
        <figure className="bg-white">
          <img className="w-[200px]" src={sprites} alt="sprites" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          {pokemon
            ? pokemon.abilities.map((value, key) => {
                return <div key={key}>{value.ability.name}</div>;
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
