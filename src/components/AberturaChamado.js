import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { formatToPhone } from "brazilian-values";
import moment from "moment";

// Importing the Login & Register Componet
import Login from "./Login";
import Register from "./Register";

function AberturaChamado() {
  const [open, setOpen] = React.useState(false);
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data) => {
    handleOpen();
    axios
      .post("https://chamados.nexustech.net.br/php/add_chamado.php", data)
      .then((response) => {
        console.log(response);
        handleClose();
        swal(
          `${response.data.name} você abriu o chamado ${response.data.id}.`,
          `Você deverá receber uma confirmação no e-mail ${
            response.data.email
          }, o prazo para resolução é até ${moment(
            response.data.estimated_date
          ).format("DD/MM/YYYY HH:mm")}`,
          "success"
        ).then((value) => {
          navigate("/acompanhamento");
        });
      });
  };

  // If user Logged in
  if (isAuth) {
    return (
      <>
        <Card>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Typography variant="h5" component="div">
              Abertura de chamado técnico
            </Typography>

            <Divider />

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                  label="Título do chamado"
                  {...register("title", {
                    required: "Este campo é obrigatório",
                  })}
                  error={!!errors.title}
                  helperText={errors.title && errors.title.message}
                />
                <TextField
                  label="Nome do solicitante"
                  {...register("name", {
                    required: "Este campo é obrigatório",
                  })}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
                <TextField
                  label="E-mail do solicitante"
                  {...register("email", {
                    required: "Este campo é obrigatório",
                  })}
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
                <TextField
                  label="Telefone do solicitante"
                  {...register("phone", {
                    required: "Este campo é obrigatório",
                  })}
                  onChange={(e) => {
                    const formattedPhone = formatToPhone(e.target.value);
                    e.target.value = formattedPhone;
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />

                <TextField
                  label="Descrição"
                  multiline
                  minRows={4}
                  {...register("description", {
                    required: "Este campo é obrigatório",
                  })}
                  error={!!errors.description}
                  helperText={errors.description && errors.description.message}
                />

                <Button type="submit" variant="contained">
                  Salvar chamado
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  // Showing Login Or Register Page According to the condition
  else if (showLogin) {
    return <Login />;
  } else {
    return <Register />;
  }
}

export default AberturaChamado;
