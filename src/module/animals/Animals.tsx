import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ZooContext } from "../../context/ZooContext";
import { AddAnimal } from "./components/AddAnimal";
import { useNavigate } from "react-router";
import { ListAnimals } from "./components/ListAnimals";

export const Animals = () => {
  const { zoo, onSelectAnimal, getIndexZone, getZoneById } =
    useContext(ZooContext);

  const { id } = useParams();

  const data = getZoneById(id!);
  const index = getIndexZone(id!);

  const navigate = useNavigate();

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

      <AddAnimal idZone={parseInt(id!)}></AddAnimal>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          marginTop: "30px",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {zoo[index].animals.map((animal) => (
          <ListAnimals
            key={animal.id}
            data={animal}
            position={index}
            idZone={data.id}
            viewAnimal={onSelectAnimal}
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
