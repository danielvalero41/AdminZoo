import { AddCircle } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ZooContext } from "../../../context/ZooContext";
import { createZone } from "../../../services/zoneServices";
import { ModalError } from "../../../components/Modal/ModalError/ModalError";

// type Props = {
//     onNewZone:(name:string,id:number)=>void
// }

export const AddZone = () => {
  const { generateId, onAddZone } = useContext(ZooContext);
  const [nameZone, setNameZone] = useState("");
  const [error, setError] = useState(false);
  const msjError = "Esta zona ya existe";

  const onGetValueInput = (value: string) => {
    setNameZone(value);
  };

  const Add = async () => {
    if (nameZone.trim().length <= 1) return;

    const { data: data, error: error } = await createZone(nameZone);

    console.log(data);

    if (data) {
      onAddZone(nameZone, generateId);
      setNameZone("");
      return;
    }

    if (error) {
      setError(true);
      return;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <TextField
          label="Ingrese el nombre de la zona"
          variant="outlined"
          onChange={(event) => onGetValueInput(event.target.value)}
          value={nameZone}
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
          Agregar zona
        </Button>
      </Box>

      {/* MODAL */}
      <ModalError open={error} msjError={msjError} setClose={setError} />
    </>
  );
};
