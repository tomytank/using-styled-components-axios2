import React, { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import styled from "styled-components";

const DogButton = styled.button`
  width: 100px;
  height: 30px;
  background: #2a2223;
  color: white;
  border: 0;
  margin: 5px 10px;
`;

export default function PetGrid() {
  // holds data from API
  // set initial state so petData.map in JSX does not throw
  // an undefined error.
  const [petData, setPetData] = useState([]);

  // manual selection of which breed to display
  // "hound" is our initial breed to display
  const [breed, setBreed] = useState("hound");

  useEffect(() => {
    //console.log("fire effect");
    // dynamic URL for API based on state
    axios
      .get(`https://dog.ceo/api/breed/${breed}/images/random/15`)
      .then(response => {
        // console.log("set new petdata");
        // successful response from API updates petData.
        // when petData updates with [imgURLStrs] then the
        // UI will update with those new urls
        setPetData(response.data.message);
      })
      .catch(error => console.log("Sorry no doggos", error));
  }, [breed]); // DEPENDENCY ON BREED. If breed state changes, useEffect fn fires again.

  //console.log("render pet data state", petData);
  return (
    <div className="container">
      <DogButton
        onClick={() => {
          setBreed("mastiff");
        }}
      >
        {" "}
        Mastiff
      </DogButton>
      <DogButton onClick={() => setBreed("labrador")}>Labrador</DogButton>
      <div className="entry" />
      {/* Initial state of petData must exist as [] otherwise 
      .map will be called on undefined and throw an error */}
      {petData.map(petImgUrl => (
        <PetCard key={petImgUrl} breed={breed} imgUrl={petImgUrl} />
      ))}
    </div>
  );
}

//RENDER ORDER WITH USEEFFECT:
// 1. initial state is created
// 2. JSX in return renders with initial state, petData = [], breed = 'hound'. no cards are rendered as there is no data in petData
// 3. useEffect fn fires after render, using breed = 'hound' for API request
// 4. if API request is successful, petData is updated to response.data.message which is array of image urls
// 5. STATE CHANGE - w/ petData. JSX rerenders with new petData.

// RENDER ORDER IF BUTTON CLICKED
// 1. mastiff button onClick
// 2. STATE CHANGE-  update breed state variable to 'mastiff'
// 3. JSX renders with new state change -> update all cards to have 'mastiff' under images.
//     NOTE: images are still hounds because API request has not been called yet.
// 4. useEffect fn fires after render b/c breed state variable has changed
// 5. API call now uses 'mastiff' to get mastiff images
// 6. On successful return, update petData = [mastiff image urls]
// 7. STATE CHANGE - petData causes JSX to rerender with new images.
