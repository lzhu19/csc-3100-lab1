import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method : "POST",
      headers : {
        "Content-type" : "application/json",
      },
      body : JSON.stringify(person)
    });
    return promise;
  }
  
  function removeOneCharacter(index) {
    // removes a character at the given index
    const updated = characters.filter((character, i) => {
        return i != index;
    })
    setCharacters(updated);
  }

  function updateList(person) {
    // updates the list of characters if the form is submitted.
    // setCharacters([...characters, person]);
    postUser(person) 
      .then((response) => {
        if (response.status == 201) return response.json();
        return null;
      })
      .then((addedUser) => {
        if (addedUser !== null) {
          setCharacters((currentCharacters) => [
            ...currentCharacters,
            addedUser,
          ])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json()) // convert response to json
      .then((json) => setCharacters(json["users_list"])) // sets characters to the received list
      .catch((error) => { console.log(error); });
  }, [] ); // empty array here indicates that hook should be called only when component first mounts

  return (
    <div className="container">
      <Table 
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}

// make the component available to be imported into other components or files
export default MyApp; 