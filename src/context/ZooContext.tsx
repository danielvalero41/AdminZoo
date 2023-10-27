import { createContext } from "react";
import { Animals, DataZoo } from "../model/DataZoo";

export type ZooContextProps = {
  zoo: DataZoo[];
  setZoo: (value: DataZoo[]) => void;
  positionZone: number;
  idZone: string;
  generateId: number;
  onAddZone: (newZone: string, idZone: string) => void;
  onSelectZone: (value: DataZoo) => void;
  onAddAnimal: (
    nameAnimal: string,
    specie: string,
    idAnimal: string,
    idZone: string
  ) => void;
  onAddComment: (
    body: string,
    author: string,
    date: string,
    idComment: string,
    idAnimal: string,
    idZone: string
  ) => void;
  onAddAnswer: (
    body: string,
    author: string,
    date: string,
    idComment: string,
    idAnimal: string,
    idZone: string,
    idAnswer: string
  ) => void;
  onSelectAnimal: (value: Animals, position: number, idZone: string) => void;
  getIndexZone: (id: string) => number;
  getZoneById: (id: string) => DataZoo;
  getAnimalById: (id: string) => Animals;
  getPositionAnimal: (id: string) => number;
  getDateCurrent: () => string;
  backMain: (value: boolean) => void;
};

export const ZooContext = createContext<ZooContextProps>(Object({}));
