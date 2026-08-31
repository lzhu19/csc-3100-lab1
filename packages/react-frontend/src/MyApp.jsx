import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
    {
        name: "Charlie",
        job: "Janitor"
    },
    {
        name: "Mac",
        job: "Bouncer"
    },
    {
        name: "Dee",
        job: "Aspiring actress"
    },
    {
        name: "Dennis",
        job: "Bartender"
    }
  ]);
  
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
        return i != index;
    })
    setCharacters(updated);
  }
  
  return (
    <div className="container">
      <Table 
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
    </div>
  );
}

// make the component available to be imported into other components or files
export default MyApp; 