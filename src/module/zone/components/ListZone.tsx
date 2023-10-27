import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataZoo } from "../../../model/DataZoo";

type Props = {
  data: DataZoo;
  count: number;
  viewZone?: (value: DataZoo) => void;
};

export const ListZone = ({ data, viewZone, count }: Props) => {
  const getSelectZone = () => {
    if (viewZone) viewZone(data);
  };

  return (
    <>
      <Card
        sx={{
          width: "280px",
          borderRadius: "12px",
          padding: "16px",
        }}
        elevation={1}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="button"
            onClick={getSelectZone}
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {data.nameZone}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.8rem",
              opacity: "0.5",
            }}
          >
            Cantidad de animales:{" " + count}{" "}
          </Typography>
        </Box>
      </Card>
    </>
  );
};
