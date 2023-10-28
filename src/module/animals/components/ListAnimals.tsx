import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Animals, DataZoo } from "../../../model/DataZoo";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

type Props = {
  data: {
    nameAnimal: string;
    species: string;
  };
  position: number;
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

export const ListAnimals = ({ data, viewAnimal, position, idZone }: Props) => {
  const getSelectAnimal = () => {
    // viewAnimal(data, position, idZone);
  };

  return (
    <>
      <Card
        sx={{
          width: "31%",
          borderRadius: "12px",
        }}
        elevation={3}
      >
        <CardContent>
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
            <Box
              sx={
                {
                  // display: "flex",
                  // justifyContent: "center",
                }
              }
            ></Box>
            <Button
              size="small"
              sx={{
                color: "#FFF",
                borderRadius: "18px",
                p: "8px",
              }}
              variant="contained"
              startIcon={<InsertCommentIcon />}
              onClick={getSelectAnimal}
            >
              Ver comentarios
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* <div className="mt-4">
        <div className="">
          <ul className="">
            <li className="item-zone">
              <div>
                <p>Nombre del animal: {data.nameAnimal}</p>
                <small>Especie: {data.species}</small>
              </div>
              <button onClick={getSelectAnimal} className="">
                Ver comentarios
              </button>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};
