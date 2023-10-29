import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ZooContext } from "../../../../context/ZooContext";
import { Answer } from "../../../../model/DataZoo";
import { replyComment } from "../../../../services/commentServices";

type Props = {
  idComment?: number | string;
};

export const AddAnswer = ({ idComment }: Props) => {
  const { idZone, generateId, onAddAnswer, getDateCurrent, setReloadComment } =
    useContext(ZooContext);
  const [isAddAnswer, setIsAddAnswer] = useState(false);
  const [answer, setAnswer] = useState<Answer>(Object({}));
  const { id } = useParams();

  const addAnswer = () => {
    setIsAddAnswer(true);
  };

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: unknown;
  }): void => {
    setAnswer({ ...answer, [name]: value });
  };

  const addAnswerToComment = () => {
    if (!answer.author || !answer.body) return;

    replyCommentForEndpoint();
    // onAddAnswer(
    //   answer?.body!,
    //   answer?.author!,
    //   getDateCurrent(),
    //   idComment,
    //   parseInt(id!),
    //   idZone,
    //   generateId
    // );
    // setIsAddAnswer(false);
    // setAnswer({
    //   id: generateId,
    //   author: "",
    //   body: "",
    //   date: "",
    //   idZone,
    //   idComment,
    //   idAnimal: 0,
    // });
  };

  const replyCommentForEndpoint = async () => {
    const data = await replyComment(
      answer.body,
      answer.author,
      idComment as string
    );

    if (data) {
      setIsAddAnswer(false);
      setReloadComment(true);
    }

    console.log(data);
  };

  return (
    <>
      {!isAddAnswer ? (
        <Typography
          variant="button"
          sx={{
            color: "primary.main",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={addAnswer}
        >
          Responder
        </Typography>
      ) : (
        <>
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
              value={answer?.author ?? ""}
              name="author"
            ></TextField>

            <TextField
              label="Agrege un comenatario"
              onChange={(event) => handleChange(event.target)}
              value={answer?.body ?? ""}
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
              onClick={addAnswerToComment}
            >
              Comentar
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
