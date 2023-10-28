import { DELETE, GET, POST, PUT } from "./request";

export const createAnimal = async (
  name: string,
  species: string,
  zone: string
) => {
  const response = await POST("/animal", { name, species, zone });
  return response;
};

export const getAnimals = async () => {
  const response = await GET<[]>("/animals");
  return response;
};

export const updateAnimal = async (
  id: string,
  name: string,
  species: string,
  zone: string
) => {
  const response = await PUT(`/animal/${id}`, { name, species, zone });
  return response;
};

export const deleteAnimal = async (id: string) => {
  const response = await DELETE(`/animal/${id}`);
  return response;
};

export const countAnimalsByZone = async (zoneId: string) => {
  const response = await GET(`/animals/${zoneId}`);
  return response;
};

export const getAnimalCountBySpecies = async () => {
  const response = await GET(`/animals/species`);
  return response;
};

export const getAnimalsByRegistrationDate = async (date: string) => {
  const response = await GET(`/animals/registration/${date}`);
  return response;
};
