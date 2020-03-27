import React from "react";
import styled from "styled-components";

//styled compoonents creating
const DogCard = styled.div`
  background: #99f3eb;
  color: black;
  width: 200px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0px 1px 6px -2px grey;
`;
const DogImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: scale;
  flex-shrink: 2;
`;
const PetCard = props => {
  //console.log(DogCard);
  return (
    //<div className="dog-card " key="">
    <DogCard>
      {/* <img className="dog-image" alt="random dog" src={props.imgUrl} /> */}
      <DogImage alt="random dog" src={props.imgUrl} />
      <h2>{props.breed}</h2>
    </DogCard>
  );
};
export default PetCard;
