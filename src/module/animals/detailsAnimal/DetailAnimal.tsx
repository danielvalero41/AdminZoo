import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ZooContext } from "../../../context/ZooContext";
import { Comments } from "../../../model/DataZoo";
import { AddAnswer } from "./components/AddAnswer";
import { CommentAnswer } from "./components/CommentAnswer";
import { getAnimals } from "../../../services/animalServices";

export const DetailAnimal = () => {
  const {
    zoo,
    positionZone,
    idZone,
    generateId,
    getAnimalById,
    getPositionAnimal,
    onAddComment,
    getDateCurrent,
  } = useContext(ZooContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState<Comments>(Object({}));
  const [isEnableView, setIsEnableView] = useState(false);

  const dataAnimal = getAnimalById(id!);

  const toBack = () => {
    navigate(`/animals/${idZone}`);
  };

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }): void => {
    setComment({ ...comment, [name]: value });
  };

  const viewAnswer = () => {
    setIsEnableView(true);
  };

  const addComment = () => {
    if (!comment.author || !comment.body) return;
    onAddComment(
      comment?.body!,
      comment?.author!,
      getDateCurrent(),
      generateId,
      parseInt(id!),
      idZone
    );
    setComment({
      id: 0,
      idAnimal: 0,
      idZone: 0,
      author: "",
      body: "",
      date: "",
      answer: [],
    });
  };

  const loadAnimal = async () => {
    const data = await getAnimals();
    console.log(data.data, "data");
  };

  useEffect(() => {
    loadAnimal();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Nombre del animal: {dataAnimal.nameAnimal}
        </Typography>

        <Typography>Especie: {dataAnimal.species}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexDirection: "column",
          width: "fit-content",
        }}
      >
        <TextField
          label="Ingrese el nombre"
          variant="outlined"
          onChange={(event) => handleChange(event.target)}
          value={comment?.author ?? ""}
          name="author"
        ></TextField>

        <TextField
          label="Agrege un comenatario"
          onChange={(event) => handleChange(event.target)}
          value={comment?.body ?? ""}
          multiline
          minRows={2}
          maxRows={10}
          name="body"
        ></TextField>

        <Button
          size="small"
          sx={{
            color: "#FFF",
            borderRadius: "18px",
          }}
          variant="contained"
          onClick={addComment}
        >
          Comentar
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        {zoo[positionZone].animals[getPositionAnimal(id!)].comments?.map(
          (comments) => (
            <Card
              key={comments.id}
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
                    gap: "4px",
                    alignItems: "baseline",
                    minHeight: "70px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      minWidth: "fit-content",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {comments.author}:
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      wordWrap: "break-word",
                    }}
                  >
                    <Typography>"{comments.body}"</Typography>

                    <Typography
                      sx={{
                        marginTop: "10px",
                        color: "#707070",
                        opacity: "0.7",
                        textAlign: "end",
                        fontSize: "12px",
                      }}
                    >
                      {comments.date}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  padding: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <AddAnswer idComment={comments.id} />

                  {!isEnableView && !!comments.answer.length ? (
                    <Typography
                      onClick={viewAnswer}
                      variant="button"
                      sx={{
                        color: "primary.main",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Ver respuestas
                    </Typography>
                  ) : (
                    comments.answer?.map((answer) => (
                      <CommentAnswer key={answer.id} data={answer} />
                    ))
                  )}
                </Box>
              </CardActions>
            </Card>
          )
        )}
      </Box>

      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            color: "primary.main",
            textDecoration: "underline",
          }}
          variant="button"
          onClick={toBack}
        >
          Regresar
        </Typography>
      </Box>
    </>
  );
};
