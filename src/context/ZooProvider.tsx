import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Animals, DataZoo } from "../model/DataZoo";
import { ZooContext } from "./ZooContext";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ZooProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const generateId = new Date().getUTCMilliseconds().toString();
  const [positionZone, setpositionZone] = useState(0);
  const [idZone, setIdZone] = useState("0");
  const [reloadAnimals, setReloadAnimals] = useState(false);

  const [zoo, setZoo] = useState<Array<DataZoo>>([]);

  const onAddZone = (newZone: string, idZone: string): void => {
    setZoo((zoo) => [...zoo, { id: idZone, nameZone: newZone, animals: [] }]);
  };

  const getDateCurrent = () => {
    const date = new Date();
    return (
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "/" +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      (date.getHours() < 10 ? "0" : "") +
      (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes() +
      ":" +
      (date.getSeconds() < 10 ? "0" : "") +
      date.getSeconds() +
      (date.getHours() > 12 ? " PM" : " AM")
    );
  };

  const onAddAnimal = (
    nameAnimal: string,
    species: string,
    idAnimal: string,
    idZone: string
  ): void => {
    let findZone = zoo.findIndex((x) => x.id === idZone);

    const auxZoo = [...zoo];
    auxZoo[findZone].animals?.push({
      id: idAnimal,
      idZone,
      nameAnimal,
      species,
      comments: [],
    });

    setZoo(auxZoo);
  };

  const onAddComment = (
    body: string,
    author: string,
    date: string,
    idComment: string,
    idAnimal: string,
    idZone: string
  ): void => {
    const auxZoo = [...zoo];
    let findZone = zoo.findIndex((x) => x.id === idZone);
    let findAnimal = auxZoo[findZone].animals.findIndex(
      (x) => x.id === idAnimal
    );

    auxZoo[findZone].animals[findAnimal].comments?.unshift({
      id: idComment,
      idZone,
      idAnimal,
      body,
      author,
      date,
      answer: [],
    });

    setZoo(auxZoo);
  };

  const onAddAnswer = (
    body: string,
    author: string,
    date: string,
    idComment: string,
    idAnimal: string,
    idZone: string,
    idAnswer: string
  ): void => {
    const auxZoo = [...zoo];
    let findZone = zoo.findIndex((x) => x.id === idZone);
    let findAnimal = auxZoo[findZone].animals.findIndex(
      (x) => x.id === idAnimal
    );
    let findComment = auxZoo[findZone].animals[findAnimal].comments?.findIndex(
      (x) => x.id === idComment
    );

    auxZoo[findZone].animals[findAnimal].comments[findComment].answer.unshift({
      id: idAnswer,
      idZone,
      idAnimal,
      idComment,
      author,
      body,
      date,
    });

    setZoo(auxZoo);
  };

  const onSelectZone = (value: DataZoo) => {
    navigate(`/animals/${value.id}`);
  };

  const onSelectAnimal = (value: any, position: number, idZone: string) => {
    setpositionZone(position);
    setIdZone(idZone);
    navigate(`/detalle-animal/${value.id}`);
  };

  const getIndexZone = (id: string): number => {
    if (id) {
      const findIndex = zoo.findIndex((x) => x.id === id);
      return findIndex;
    }
    return Object({});
  };

  const getZoneById = (id: string): DataZoo => {
    if (id) {
      return zoo.find((x) => x.id === id) ?? Object({});
    }
    return Object({});
  };

  const getAnimalById = (id: string): Animals => {
    if (id) {
      const findIndex = zoo[positionZone].animals.findIndex((x) => x.id === id);
      return zoo[positionZone].animals[findIndex];
    }
    return Object({});
  };

  const getPositionAnimal = (id: string) => {
    return zoo[positionZone].animals.findIndex((x) => x.id === id!);
  };

  const backMain = (value: boolean) => {
    return value;
  };

  return (
    <ZooContext.Provider
      value={{
        zoo,
        setZoo,
        positionZone,
        idZone,
        generateId,
        reloadAnimals,
        setReloadAnimals,
        onAddZone,
        onSelectZone,
        onAddAnimal,
        onAddComment,
        onAddAnswer,
        onSelectAnimal,
        getIndexZone,
        getZoneById,
        getAnimalById,
        getPositionAnimal,
        getDateCurrent,
        backMain,
      }}
    >
      {children}
    </ZooContext.Provider>
  );
};
