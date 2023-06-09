import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MyContextProvider, { MyContext } from "./contexts/MyContext";
import AberturaChamado from "./components/AberturaChamado";
import Main from "./components/Main/Main";
import ListarChamados from "./components/ListarChamados/ListarChamados";
import { Container } from "@mui/material";
import Header from "./components/common/Header";

function WithAuthentication({ children }) {
  const { rootState } = useContext(MyContext);
  const { isAuth } = rootState;
  return isAuth ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <MyContextProvider>
      <Header />
      <Container sx={{ paddingTop: 5 }}>
        <Routes>
          <Route path="/" element={<AberturaChamado />} />
          <Route
            path="/acompanhamento"
            element={
              <WithAuthentication>
                <ListarChamados />
              </WithAuthentication>
            }
          />
          {/* <Route
            path="/main"
            element={
              <WithAuthentication>
                <Main />
              </WithAuthentication>
            }
          /> */}
        </Routes>
      </Container>
    </MyContextProvider>
  );
}

export default App;

    // "start": "react-scripts --openssl-legacy-provider start",
    // "build": "react-scripts --openssl-legacy-provider build",
