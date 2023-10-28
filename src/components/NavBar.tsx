import { Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { ZooContext } from "../context/ZooContext";
import { Comments } from "../model/DataZoo";
import { TypeSearch } from "../model/EnumTypeSearch";
import { ContentSearch } from "../layout/ContentSearch";
import { BackToMain } from "./BackToMain";
import {
  dataAnimal,
  dataAnswer,
  dataComment,
  dataZone,
} from "../model/dataView";
import { ContentTypeSearch } from "../layout/ContentTypeSearch";
import { getSearch } from "../services/searchServices";
import { ModalError } from "./Modal/ModalError/ModalError";

type Props = {
  setType: (value: string) => void;
  type: string;
  isSearching: boolean;
};
const ViewDataSearch = ({
  type,
  result,
  setType,
}: {
  type: string;
  result: any;
  setType: (value: string) => void;
}) => {
  let component = <BackToMain setTypeToBack={setType} />;

  switch (type) {
    case TypeSearch.Zone:
      return (
        <>
          <ContentSearch>
            {result.map((data: any, index: number) => (
              <ContentTypeSearch key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Zonas:
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameZone}
                    </Typography>
                  </Typography>
                </Box>
              </ContentTypeSearch>
            ))}
          </ContentSearch>
          {component}
        </>
      );

    case TypeSearch.Animal:
      return (
        <>
          <ContentSearch>
            {result.map((data: any, index: number) => (
              <ContentTypeSearch key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Zona:
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameZone}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "20px",
                    gap: "4px",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Especie:
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.species}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "baseline",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Animal:
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameAnimal}
                    </Typography>
                  </Typography>
                </Box>
              </ContentTypeSearch>
            ))}
          </ContentSearch>
          {component}
        </>
      );

    case TypeSearch.Comment:
      return (
        <>
          <ContentSearch>
            {result.map((data: any, index: number) => (
              <ContentTypeSearch key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Zona:
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameZone}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "baseline",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Animal:{" "}
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameAnimal}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "baseline",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Comentarios:
                    {data.comments.map((comment: Comments) => (
                      <Typography
                        sx={{
                          color: "#000",
                        }}
                        key={comment.id}
                      >
                        {comment.body}
                      </Typography>
                    ))}
                  </Typography>
                </Box>
              </ContentTypeSearch>
            ))}
          </ContentSearch>
          {component}
        </>
      );

    case TypeSearch.Answer:
      return (
        <>
          <ContentSearch>
            {result.map((data: any, index: number) => (
              <ContentTypeSearch key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Zona:
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameZone}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "baseline",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Animal:{" "}
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameAnimal}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "baseline",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Cometario:{" "}
                    <Typography
                      sx={{
                        color: "#000",
                      }}
                    >
                      {data.nameComments}
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "baseline",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component={"div"}
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    Respuestas:
                    {data.answer.map((answers: Comments) => (
                      <Typography
                        sx={{
                          color: "#000",
                        }}
                        key={answers.id}
                      >
                        {answers.body}
                      </Typography>
                    ))}
                  </Typography>
                </Box>
              </ContentTypeSearch>
            ))}
          </ContentSearch>
          {component}
        </>
      );

    case TypeSearch.Nofound:
      return (
        <>
          <ContentSearch>
            <Box>
              <Typography>{result}</Typography>
            </Box>
          </ContentSearch>
          {component}
        </>
      );

    case "":
      return <></>;
    default:
      return <></>;
  }
};

export const NavBar = ({ isSearching, type, setType }: Props) => {
  const { zoo } = useContext(ZooContext);

  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState(Object({}));
  const [error, setError] = useState(false);
  const [msjError, setMsjError] = useState("");

  let positionZone: number[] = [];
  let positionAnimal: number[] = [];
  let positionComment: number[] = [];

  const getValueInput = (value: string) => {
    setSearchText(value);
  };

  const findZone = (pos1: number) => {
    let found = false;

    found = zoo[pos1].nameZone.toLowerCase().includes(searchText.toLowerCase());

    if (found) {
      return true;
    } else {
      return false;
    }
  };

  const isSearchByZone = () => {
    let found = false;
    let i = 0;

    do {
      if (i < zoo.length) {
        found = findZone(i);
        i++;
      }
      if (found) {
        positionZone.push(i - 1);
      }
    } while (i < zoo.length);

    if (positionZone.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const searchByZone = () => {
    let found: any[] = [];

    let i = 0;

    do {
      found.push({
        zona: positionZone[i],
      });
      i++;
    } while (i < positionZone.length);

    let data: dataZone[] = [];

    found.forEach((position) => {
      data.push({
        nameZone: zoo[position.zona].nameZone,
      });
    });

    setResult(data);
    setType(TypeSearch.Zone);
  };

  const isSearchByAnimal = () => {
    let found = false;
    let i = 0;
    let j = 0;
    do {
      if (i < zoo.length) {
        if (j < zoo[i].animals.length) {
          found = findAnimal(i, j);
          j++;
        } else {
          i++;
          j = 0;
          found = false;
        }
      }

      if (found) {
        positionZone.push(i);
        positionAnimal.push(j - 1);
      }
    } while (i < zoo.length);

    if (positionZone.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const searchByAnimal = () => {
    let found: any[] = [];

    let i = 0;

    do {
      found.push({
        zona: positionZone[i],
        animal: positionAnimal[i],
      });
      i++;
    } while (i < positionZone.length);

    let data: dataAnimal[] = [];

    found.forEach((position) => {
      data.push({
        nameZone: zoo[position.zona].nameZone,
        nameAnimal: zoo[position.zona].animals[position.animal].nameAnimal,
        species: zoo[position.zona].animals[position.animal].species,
      });
    });
    setResult(data);
    setType(TypeSearch.Animal);
  };

  const findAnimal = (pos1: number, pos2: number) => {
    let found = false;

    found = zoo[pos1].animals[pos2].nameAnimal
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (found) {
      return true;
    } else {
      return false;
    }
  };

  const isSearchBySpecies = () => {
    let found = false;
    let i = 0;
    let j = 0;
    do {
      if (i < zoo.length) {
        if (j < zoo[i].animals.length) {
          found = findSpecieAnimal(i, j);
          j++;
        } else {
          i++;
          j = 0;
          found = false;
        }
      }

      if (found) {
        positionZone.push(i);
        positionAnimal.push(j - 1);
      }
    } while (i < zoo.length);

    if (positionZone.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const findSpecieAnimal = (pos1: number, pos2: number) => {
    let found = false;

    found = zoo[pos1].animals[pos2].species
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (found) {
      return true;
    } else {
      return false;
    }
  };

  const isSearchByComment = () => {
    let found = false;
    let i = 0;
    let j = 0;
    do {
      if (i < zoo.length) {
        if (j < zoo[i].animals.length) {
          found = findComent(i, j);
          j++;
        } else {
          i++;
          j = 0;
          found = false;
        }
      }

      if (found) {
        positionZone.push(i);
        positionAnimal.push(j - 1);
      }
    } while (i < zoo.length);

    if (positionZone.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const searchByComment = () => {
    let found: any[] = [];

    let i = 0;
    do {
      found.push({
        zona: positionZone[i],
        animal: positionAnimal[i],
      });
      i++;
    } while (i < positionZone.length);
    let data: dataComment[] = [];
    found.forEach((position) => {
      data.push({
        nameZone: zoo[position.zona].nameZone,
        nameAnimal: zoo[position.zona].animals[position.animal].nameAnimal,
        comments: zoo[position.zona].animals[position.animal].comments,
      });
    });
    setResult(data);
    setType(TypeSearch.Comment);
  };

  const findComent = (pos1: number, pos2: number) => {
    let positionComment = zoo[pos1].animals[pos2].comments.findIndex((x) =>
      x.body.toLowerCase().includes(searchText.toLowerCase())
    );

    if (positionComment !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const isSearchByAnswer = () => {
    let found = false;
    let i = 0;
    let j = 0;
    let k = 0;

    do {
      if (i < zoo.length) {
        if (j < zoo[i].animals.length) {
          if (k < zoo[i].animals[j].comments.length) {
            found = findAnswer(i, j, k);
            k++;
          } else {
            k = 0;
            j++;
            found = false;
          }
        } else {
          j = 0;
          i++;
          found = false;
        }
      }

      if (found) {
        positionZone.push(i);
        positionAnimal.push(j);
        positionComment.push(k - 1);
        found = false;
      }
    } while (i < zoo.length);

    if (positionZone.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const searchByAnswer = () => {
    let found: any[] = [];
    let i = 0;
    do {
      found.push({
        zona: positionZone[i],
        animal: positionAnimal[i],
        comment: positionComment[i],
      });
      i++;
    } while (i < positionZone.length);

    let data: dataAnswer[] = [];

    found.forEach((position) => {
      data.push({
        nameZone: zoo[position.zona].nameZone,
        nameAnimal: zoo[position.zona].animals[position.animal].nameAnimal,
        nameComments:
          zoo[position.zona].animals[position.animal].comments[position.comment]
            .body,
        answer:
          zoo[position.zona].animals[position.animal].comments[position.comment]
            .answer,
      });
    });

    setResult(data);
    setType(TypeSearch.Answer);
  };

  const findAnswer = (pos1: number, pos2: number, pos3: number) => {
    let positionAnswer = zoo[pos1].animals[pos2].comments[
      pos3
    ].answer.findIndex((x) =>
      x.body.toLowerCase().includes(searchText.toLowerCase())
    );

    if (positionAnswer !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const onSearch = () => {
    if (searchText.trim().length <= 0) return;
    // if (isSearchByZone()) searchByZone();
    // else if (isSearchByAnimal()) searchByAnimal();
    // else if (isSearchBySpecies()) searchByAnimal();
    // else if (isSearchByComment()) searchByComment();
    // else if (isSearchByAnswer()) searchByAnswer();
    // else {
    //   setResult("No se encontraron resultados");
    //   setType(TypeSearch.Nofound);
    // }

    search(searchText);
  };

  //TERMIANR DE CONECTAR

  const search = async (searchText: string) => {
    const { data: data } = await getSearch(searchText);
    console.log(data);

    if ((data as any).length === 0) {
      setError(true);
      setMsjError("No se encontraron resultados");
      setSearchText("");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.light",
          p: "12px 20px",
        }}
      >
        <Box
          sx={{
            width: "auto",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#FFF",
              fontSize: "20px",
            }}
          >
            Administración del zoológicos
          </Typography>
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{
              backgroundColor: "#FFF",
              borderRadius: "18px",
            }}
            size="small"
            placeholder="Buscar..."
            onChange={(event) => getValueInput(event.target.value)}
            value={searchText}
          ></TextField>
          <SearchIcon
            sx={{
              color: "#FFF",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={onSearch}
          />
        </Box> */}
      </Box>

      {isSearching && (
        <Box
          sx={{
            p: "0 20px",
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <ViewDataSearch type={type} result={result} setType={setType} />
        </Box>
      )}

      {/* MODAL */}
      <ModalError open={error} msjError={msjError} setClose={setError} />
    </>
  );
};
