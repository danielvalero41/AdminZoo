import { Box, Typography } from "@mui/material";
import { Answer } from "../../../../model/DataZoo";
import { useEffect, useState } from "react";
import { getReplayByCommentId } from "../../../../services/commentServices";
import { formatDate } from "../../../../util/getFormatedDate";

type Props = {
  id: string;
  idComment: number | string;
};

type Respuestas = {
  author: string;
  body: string;
  date: string;
};

export const CommentAnswer = ({ id, idComment }: Props) => {
  const [respuestas, setRespuestas] = useState<Respuestas[]>([]);

  useEffect(() => {
    getReplyForComment();
  }, []);

  const getReplyForComment = async () => {
    const data = await getReplayByCommentId(idComment as string);
    // console.log(data);
    if (data) {
      setRespuestas(data.data as Respuestas[]);
    }
  };

  return (
    <Box>
      {respuestas.map((data) => (
        <Box
          sx={{
            marginTop: "30px",
            marginLeft: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {data.author}:
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              {data.body}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Typography
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "end",
                color: "#707070",
                opacity: "0.7",
                fontSize: "12px",
              }}
            >
              {formatDate(data.date)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
