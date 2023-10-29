import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export const EditDelete = ({
  clickDelete,
  clickEdif,
}: {
  clickDelete: () => void;
  clickEdif: () => void;
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        "& .MuiIconButton-root": {
          padding: "4px",
        },
      }}
    >
      <IconButton
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "0.9rem",
          },
        }}
        onClick={clickEdif}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        }}
        onClick={clickDelete}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
