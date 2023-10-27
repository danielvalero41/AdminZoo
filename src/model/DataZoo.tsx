export type DataZoo = {
  id: string;
  nameZone: string;
  animals: Animals[];
};

export type Animals = {
  id: string;
  idZone: string;
  nameAnimal: string;
  species: string;
  comments: Comments[];
};

export type Comments = {
  id: string;
  idZone: string;
  idAnimal: string;
  body: string;
  author: string;
  date: string;
  answer: Answer[];
};

export type Answer = {
  id: string;
  idZone: string;
  idAnimal: string;
  idComment: string;
  body: string;
  author: string;
  date: string;
};
