import Image from "next/image";
import React from "react";
import { Alive, Female, Male, QuestionMark } from "./Icons";

function getGenderIcon(gender) {
  switch (gender) {
    case "Male":
      return <Male></Male>;
    case "Female":
      return <Female></Female>;
    default:
      return <QuestionMark></QuestionMark>;
  }
}

function getAlive(status) {
  switch (status) {
    case "Alive":
      return (
        <div className="text-green-700 flex justify-center items-center gap-1">
          <Alive fill="rgb(21, 128, 61)"></Alive>
          <it className="italic">Alive</it>
        </div>
      );
    case "Dead":
      return (
        <div className="text-red-700 flex justify-center items-center gap-1">
          <Alive fill="rgb(185, 28, 28)"></Alive>
          <it className="italic">Dead</it>
        </div>
      );
    default:
      return (
        <div className="flex justify-center items-center gap-1">
          <Alive></Alive>
          <it className="italic">Unknown</it>
        </div>
      );
  }
}

function Character({ character }) {
  const genderIcon = getGenderIcon(character.gender);
  const alive = getAlive(character.status);
  console.log(character.gender);
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden">
      <div className="relative h-[180px]">
        <Image
          src={character.image}
          alt={character.name}
          objectFit="cover"
          fill
        ></Image>
      </div>
      <div className="flex flex-col text-center gap-2 p-2">
        <span className="font-semibold flex gap-2 justify-center items-center">
          {character.name} {genderIcon}
        </span>
        {alive}
        <span>
          {character.species}
          {character.type ? `/${character.type}` : null}
        </span>
      </div>
    </div>
  );
}

export default Character;
