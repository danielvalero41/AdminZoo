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
import { createComment, getComments } from "../../../services/commentServices";
import { formatDate } from "../../../util/getFormatedDate";

type Comentario = {
  author: string;
  body: string;
};

type allCommentAnimalProps = {
  _id: string;
  author: string;
  body: string;
  date: string;
  animal: string;
  replies: string[];
};

export const DetailAnimal = () => {
  const {
    zoo,
    positionZone,
    idZone,
    generateId,
    getIdZone,
    getAnimalById,
    getPositionAnimal,
    onAddComment,
    getDateCurrent,
    reloadComment,
    setReloadComment,
  } = useContext(ZooContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [allCommentAnimal, setAllCommentAnimal] = useState<
    allCommentAnimalProps[]
  >([]);
  const [comment, setComment] = useState<Comentario>(Object({}));
  const [isEnableView, setIsEnableView] = useState(false);
  const [nameAnimal, setNameAnimal] = useState("");

  const dataAnimal = getAnimalById(id!);

  const toBack = () => {
    navigate(`/animals/${getIdZone}`);
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

  const createCommentForEndpoint = async () => {
    const data = await createComment(comment.body, comment.author, id ?? "");
    console.log(data);

    if (data) {
      setComment({
        body: "",
        author: "",
      });
      loadComment();
    }
  };

  const addComment = () => {
    if (!comment.author || !comment.body) return;
    createCommentForEndpoint();
  };

  const loadAnimal = async () => {
    const data = await getAnimals();

    if (data.data && data.data?.length > 0) {
      const aux: {
        _id: string;
        name: string;
      }[] = data.data;

      const animal = aux.find((animal) => animal._id === id);
      setNameAnimal(animal?.name ?? "");
    }
  };

  const loadComment = async () => {
    const data = await getComments();
    console.log(data.data, "data");
    const aux: allCommentAnimalProps[] = [];
    (data.data as allCommentAnimalProps[]).forEach((element) => {
      let commet = {
        _id: element._id,
        author: element.author,
        body: element.body,
        date: formatDate(element.date),
        animal: element.animal,
        replies: element.replies,
      };
      aux.push(commet);
    });
    setAllCommentAnimal(aux);
  };

  useEffect(() => {
    loadAnimal();
    loadComment();
  }, []);

  useEffect(() => {
    if (reloadComment) {
      loadComment();
      setReloadComment(false);
    }
  }, [reloadComment]);

  console.log(allCommentAnimal);

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
          Nombre del animal: {nameAnimal}
        </Typography>

        {/* <Typography>Especie: {dataAnimal.species}</Typography> */}
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
        {allCommentAnimal.map((comments) => (
          <Card
            key={comments._id}
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
                <AddAnswer idComment={comments._id} />

                {comments.replies?.map((answer) => (
                  <CommentAnswer
                    key={answer}
                    id={answer}
                    idComment={comments._id}
                  />
                ))}
              </Box>
            </CardActions>
          </Card>
        ))}
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
