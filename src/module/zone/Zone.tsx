import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { ZooContext } from "../../context/ZooContext";
import { AddZone } from "./components/AddZone";
import { ListZone } from "./components/ListZone";
import { getZones } from "../../services/zoneServices";

export const Zone = () => {
  const { zoo, onSelectZone } = useContext(ZooContext);

  /**
   * Hay que conectar la lista de zona con el context
   */

  // const [zoo, setZoo] = useState([]);

  const loadZone = async () => {
    const data = await getZones();
    console.log(data);
    // if (data) {
    //   setZoo(data.data as any);
    // }
  };

  useEffect(() => {
    loadZone();
  }, []);

  return (
    <>
      <AddZone></AddZone>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {zoo.map((zoo: any) => (
          <ListZone
            key={zoo.id}
            count={zoo.animals.length}
            data={zoo}
            // viewZone={onSelectZone}
          ></ListZone>
        ))}
      </Box>
    </>
  );
};
