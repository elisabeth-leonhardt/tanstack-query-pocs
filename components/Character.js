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
          <span className="italic">Alive</span>
        </div>
      );
    case "Dead":
      return (
        <div className="text-red-700 flex justify-center items-center gap-1">
          <Alive fill="rgb(185, 28, 28)"></Alive>
          <span className="italic">Dead</span>
        </div>
      );
    default:
      return (
        <div className="flex justify-center items-center gap-1">
          <Alive></Alive>
          <span className="italic">Unknown</span>
        </div>
      );
  }
}

function Character({ character }) {
  const genderIcon = getGenderIcon(character.gender);
  const alive = getAlive(character.status);
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden">
      <div className="relative h-[180px]">
        <Image
          src={character.image}
          alt={character.name}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
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
