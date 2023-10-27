import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { ZooContext } from "../../context/ZooContext";
import { AddZone } from "./components/AddZone";
import { ListZone } from "./components/ListZone";
import { getZones } from "../../services/zoneServices";
import { CircularProgress } from "@mui/material";

export const Zone = () => {
  const { zoo, setZoo, onSelectZone } = useContext(ZooContext);

  /**
   * Hay que conectar la lista de zona con el context
   */

  // const [zoo, setZoo] = useState([]);

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
    <>
      <AddZone />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          gap: "30px",
          flexWrap: "wrap",
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
    </>
  );
};
