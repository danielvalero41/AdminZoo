import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

type ModalErrorProps = {
  open: boolean;
  msjError: string;
  setClose: (open: boolean) => void;
};

export const ModalError = ({ open, msjError, setClose }: ModalErrorProps) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <Box>
          <Typography>{msjError}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            size="small"
            sx={{
              color: "#FFF",
              borderRadius: "18px",
            }}
            variant="contained"
            onClick={() => {
              setClose(false);
            }}
          >
            Aceptar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
