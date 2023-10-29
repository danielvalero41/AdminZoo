import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Animals, DataZoo } from "../../../model/DataZoo";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { EditDelete } from "../../../components/editDelete";
import { useContext, useState } from "react";
import { deleteAnimal, updateAnimal } from "../../../services/animalServices";
import { ZooContext } from "../../../context/ZooContext";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router";

type Props = {
  data: {
    nameAnimal: string;
    species: string;
    id: string;
  };
  position: number;
  loadAnimals: () => void;
  idZone: string;
  viewAnimal?: (
    value: {
      nameAnimal: string;
      species: string;
    },
    position: number,
    idZone: string
  ) => void;
};

export const ListAnimals = ({
  data,
  viewAnimal,
  position,
  idZone,
  loadAnimals,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const { setReloadAnimals } = useContext(ZooContext);
  const [nameAnimal, setNameAnimal] = useState(data.nameAnimal);
  const [species, setSpecies] = useState(data.species);
  const navigate = useNavigate();

  const update = async () => {
    const response = await updateAnimal(data.id, nameAnimal, species, idZone);
    if (response) {
      await loadAnimals();
      setEdit(false);
    }
  };
  const remove = async () => {
    const response = await deleteAnimal(data.id);
    if (response) {
      setReloadAnimals(true);
    }
  };

  const viewCommentAnimal = (id: string) => {
    navigate(`/detalle-animal/${id}`);
  };

  return (
    <>
      <Card
        sx={{
          width: "46%",
          borderRadius: "12px",
          position: "relative",
          padding: "20px",
        }}
        elevation={3}
      >
        {!edit && (
          <EditDelete clickEdif={() => setEdit(true)} clickDelete={remove} />
        )}
        {!edit && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                {data.nameAnimal}
              </Typography>

              <Typography sx={{}}>Especie: {data.species}</Typography>
            </Box>

            <Button
              size="small"
              sx={{
                color: "#FFF",
                borderRadius: "18px",
                p: "8px",
              }}
              variant="contained"
              startIcon={<InsertCommentIcon />}
              onClick={() => viewCommentAnimal(data.id)}
            >
              Ver comentarios
            </Button>
          </Box>
        )}
        {edit && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginBottom: "20px",
                gap: "12px",
              }}
            >
              <TextField
                defaultValue={data.nameAnimal}
                label={"Nombre del animal"}
                onChange={(e) => setNameAnimal(e.target.value)}
              />
              <TextField
                defaultValue={data.species}
                label={"Nombre de la especie"}
                onChange={(e) => setSpecies(e.target.value)}
              />
            </Box>

            <Button
              size="small"
              sx={{
                color: "#FFF",
                borderRadius: "18px",
                p: "8px",
              }}
              variant="contained"
              startIcon={<CheckIcon />}
              onClick={update}
            >
              Guardar
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
};
