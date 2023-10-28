import { AddCircle } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ZooContext } from "../../../context/ZooContext";
import { createAnimal, getAnimals } from "../../../services/animalServices";
import { createdSpecie } from "../../../services/specieServices";
import { ModalError } from "../../../components/Modal/ModalError/ModalError";

type Props = {
  idZone: number | string;
};

export const AddAnimal = ({ idZone }: Props) => {
  const { generateId, onAddAnimal, setReloadAnimals } = useContext(ZooContext);

  const [error, setError] = useState(false);
  const [msjError, setMsjError] = useState("");

  const [dataAnimal, setDataAnimal] = useState({
    nameAnimal: "",
    specie: "",
  });

  const Add = () => {
    if (
      dataAnimal.nameAnimal.trim().length <= 1 ||
      dataAnimal.specie.trim().length <= 1
    )
      return;

    addSpecies(dataAnimal.specie);
  };

  const addAnimal = async (name: string, species: string, zone: string) => {
    const { data: dataAnimal } = await createAnimal(name, species, zone);
    if (dataAnimal) {
      setReloadAnimals(true);
    }
  };

  const addSpecies = async (name: string) => {
    const { data: dataSpecies, error: error } = await createdSpecie(name);

    if (dataSpecies) {
      addAnimal(dataAnimal.nameAnimal, name, idZone.toString());
    } else {
      if (error.message === "Specie already exists") {
        addAnimal(dataAnimal.nameAnimal, name, idZone.toString());
        return;
      }
      setError(true);
      setMsjError("Esta especie ya existe");
      return;
    }
  };

  const getValueInput = (name: string, value: string) => {
    setDataAnimal((state) => ({ ...state, [name]: value }));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <TextField
          label="Nombre del animal"
          variant="outlined"
          onChange={(event) =>
            getValueInput(event.target.name, event.target.value)
          }
          name="nameAnimal"
          value={dataAnimal.nameAnimal}
        />

        <TextField
          label="Nombre de la especie"
          variant="outlined"
          name="specie"
          onChange={(event) =>
            getValueInput(event.target.name, event.target.value)
          }
          value={dataAnimal.specie}
        />

        <Button
          size="small"
          sx={{
            color: "#FFF",
            borderRadius: "18px",
          }}
          variant="contained"
          startIcon={<AddCircle />}
          onClick={Add}
        >
          Agregar animal
        </Button>
      </Box>
      <ModalError open={error} msjError={msjError} setClose={setError} />
    </>
  );
};
