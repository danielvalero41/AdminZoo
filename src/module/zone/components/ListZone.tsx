import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataZoo } from "../../../model/DataZoo";

type Props = {
  data: DataZoo;
  count: number;
  viewZone?: (value: DataZoo) => void;
};

export const ListZone = ({ data, viewZone, count }: Props) => {
  const getSelectZone = () => {
    // viewZone(data);
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
              }}
            >
              {data.nameZone}
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Cantidad de animales:{count}{" "}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
