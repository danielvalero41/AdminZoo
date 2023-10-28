import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZooContext } from "../../context/ZooContext";
import { AddAnimal } from "./components/AddAnimal";
import { useNavigate } from "react-router";
import { ListAnimals } from "./components/ListAnimals";
import { getAnimals } from "../../services/animalServices";
import { getSpecies } from "../../services/specieServices";

type AnimalsProps = {
  _id: string;
  name: string;
  zone: string;
  species: string;
};

export const Animals = () => {
  const {
    onSelectAnimal,
    getIndexZone,
    getZoneById,
    reloadAnimals,
    setReloadAnimals,
  } = useContext(ZooContext);

  const { id } = useParams();

  const [zoo, setZoo] = useState<AnimalsProps[]>([]);
  const [arraySpecies, setArraySpecies] = useState<any>([]);

  const data = getZoneById(id!);
  const index = getIndexZone(id!);

  const navigate = useNavigate();

  const loadAnimals = async () => {
    const { data: data, error: error } = await getAnimals();

    if (data) {
      const auxData = data.filter((x: any) => x.zone === id);
      setZoo(auxData);
    }
  };

  const loadSpecies = async () => {
    const data = await getSpecies();

    console.log(data, "data");
    if (data) {
      setArraySpecies(data.data);
      loadAnimals();
    }
  };

  const nameForSpecies = (id: string, arraySpecie: any) => {
    const specie = arraySpecie.find((x: any) => x._id === id);

    return specie?.name;
  };

  useEffect(() => {
    loadSpecies();
  }, []);

  useEffect(() => {
    if (reloadAnimals) {
      loadAnimals();
      setReloadAnimals(false);
    }
  }, [reloadAnimals]);

  const toBack = () => {
    navigate(`/zona`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "2rem",
          textTransform: "capitalize",
        }}
      >
        Zona {data.nameZone}
      </Typography>

      <AddAnimal idZone={data.id}></AddAnimal>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          marginTop: "30px",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {zoo.map((animal) => (
          <ListAnimals
            key={animal._id}
            data={{
              nameAnimal: animal.name,
              species: nameForSpecies(animal.species, arraySpecies),
            }}
            position={index}
            idZone={animal.zone}
            // viewAnimal={onSelectAnimal}
          />
        ))}
      </Box>

      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: "primary.main",
            textDecoration: "underline",
          }}
          variant="button"
          onClick={toBack}
        >
          Regresar
        </Typography>
      </Box>
    </Box>
  );
};
