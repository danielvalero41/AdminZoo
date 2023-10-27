import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { ZooContext } from "../../context/ZooContext";
import { AddZone } from "./components/AddZone";
import { ListZone } from "./components/ListZone";
import { getZones } from "../../services/zoneServices";
import { CircularProgress, Typography } from "@mui/material";

export const Zone = () => {
  const { zoo, setZoo, onSelectZone } = useContext(ZooContext);

  const loadZone = async () => {
    const data = await getZones();
    console.log(data.data, "data");
    const auxZoo =
      data?.data?.map((item) => {
        return {
          id: item._id,
          nameZone: item.name,
          animals: [],
        };
      }) ?? [];

    if (auxZoo?.length > 0) setZoo(auxZoo);
  };

  useEffect(() => {
    loadZone();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "2rem",
          textTransform: "capitalize",
        }}
      >
        Zonas del zoológico
      </Typography>

      <AddZone />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          gap: "12px",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {zoo.length > 0 ? (
          zoo.map((zoo: any) => (
            <ListZone
              key={zoo.id}
              count={zoo.animals.length}
              data={zoo}
              viewZone={onSelectZone}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};
