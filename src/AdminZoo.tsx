import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { NavBar } from "./components/NavBar";
import { ZooContext } from "./context/ZooContext";
import { ZooProvider } from "./context/ZooProvider";
import { TypeSearch } from "./model/EnumTypeSearch";
import { Animals } from "./module/animals/Animals";
import { DetailAnimal } from "./module/animals/detailsAnimal/DetailAnimal";
import { Zone } from "./module/zone/Zone";
import { AppTheme } from "./theme/AppTheme";
import { AuthLogin } from "./auth/auth";

export const AdminZoo = () => {
  const [type, setType] = useState("");
  const isSearching = Object.values(TypeSearch).includes(type as TypeSearch);
  return (
    <>
      <ZooProvider>
        <AppTheme>
          <NavBar setType={setType} type={type} isSearching={isSearching} />
          <Box
            sx={{
              p: "20px",
            }}
          >
            {!isSearching && (
              <Routes>
                <Route path="/zona" element={<Zone />} />
                <Route path="/animals/:id" element={<Animals />} />
                <Route path="/detalle-animal/:id" element={<DetailAnimal />} />
                <Route path="/login" element={<AuthLogin />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            )}
          </Box>
        </AppTheme>
      </ZooProvider>
    </>
  );
};
