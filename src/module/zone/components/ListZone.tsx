import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataZoo } from "../../../model/DataZoo";
import EditIcon from "@mui/icons-material/Edit";
import { deleteZone, updateZone } from "../../../services/zoneServices";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

type Props = {
  data: DataZoo;
  count: number;
  viewZone?: (value: DataZoo) => void;
  loadZone: () => void;
};

export const ListZone = ({ data, viewZone, count, loadZone }: Props) => {
  const [edit, setEdit] = useState(false);
  const [nameZone, setNameZone] = useState(data.nameZone);
  const getSelectZone = () => {
    if (viewZone) viewZone(data);
  };

  const getDeleteZone = async () => {
    const response = await deleteZone(data.id);
    if (response) loadZone();
  };

  const update = async () => {
    const response = await updateZone(data.id, nameZone);
    if (response) {
      await loadZone();
      setEdit(false);
    }
  };
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          borderRadius: "8px",
          padding: "24px 20px",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        elevation={2}
      >
        {!edit && (
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
              },
            }}
            onClick={getDeleteZone}
          >
            <CloseIcon />
          </IconButton>
        )}
        {!edit && (
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 20,
              "& .MuiSvgIcon-root": {
                fontSize: "1rem",
              },
            }}
            onClick={() => setEdit(true)}
          >
            <EditIcon />
          </IconButton>
        )}

        {!edit && (
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
        )}

        {edit && (
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              size="small"
              defaultValue={data.nameZone ?? ""}
              onChange={(e) => setNameZone(e.target.value)}
            />
            <IconButton
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "1rem",
                },
              }}
              onClick={update}
            >
              <CheckIcon />
            </IconButton>
          </Box>
        )}

        <Typography
          sx={{
            fontSize: "0.8rem",
            opacity: "0.5",
            position: "relative",
            top: "2px",
          }}
        >
          Cantidad de animales:{" " + count}
        </Typography>
      </Paper>
    </>
  );
};
