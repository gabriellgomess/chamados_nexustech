import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import moment from "moment";

function ListarChamados() {
  const [chamados, setChamados] = useState([]);
  useEffect(() => {
    fetch("https://chamados.nexustech.net.br/php/listar_chamados.php")
      .then((response) => response.json())
      .then((data) => setChamados(data));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {chamados.map((chamado) => (
        <Card
          key={chamado.id}
          sx={{
            width: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              {moment().isBetween(
                chamado.created_date,
                chamado.estimated_date
              ) ? (
                <Tooltip sx={{ cursor: "pointer" }} title="Dentro do prazo">
                  <CheckCircleIcon color="success" />
                </Tooltip>
              ) : (
                <Tooltip sx={{ cursor: "pointer" }} title="Fora do prazo">
                  <ErrorIcon color="error" />
                </Tooltip>
              )}
            </Box>
            <Box sx={{ height: "65px" }}>
              <Typography variant="h5" component="div">
                {chamado.title}
              </Typography>
            </Box>

            <Box
              sx={{
                height: "160px",
                overflow: "auto",
                marginBottom: "10px",
              }}
            >
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {chamado.description}
              </Typography>
            </Box>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              <PersonIcon sx={{ color: "grey" }} />
              {chamado.name}
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              <AlternateEmailIcon sx={{ color: "grey" }} />
              {chamado.email}
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              <LocalPhoneIcon sx={{ color: "grey" }} />
              {chamado.phone}
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              <CalendarMonthIcon sx={{ color: "grey" }} />
              {moment(chamado.created_date).format("DD/MM/YYYY HH:mm")}
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              <DateRangeIcon sx={{ color: "grey" }} />
              {moment(chamado.estimated_date).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Apagar</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default ListarChamados;
