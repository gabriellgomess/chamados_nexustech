import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../contexts/MyContext";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Tooltip,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";

import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ListarChamados() {
  const [open, setOpen] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    reasonForClosure: "",
    isClosed: false,
  });
  const handleOpen = (chamado) => {
    setSelectedChamado(chamado.id);
    setEditData({
      title: chamado.title,
      description: chamado.description,
      reasonForClosure: "",
      isClosed: false,
    });
  };

  const handleClose = () => setSelectedChamado(null);
  const [chamados, setChamados] = useState([]);
  const { rootState } = useContext(MyContext);
  const { theUser } = rootState;
  useEffect(() => {
    const data = {
      email: theUser.email,
    };

    axios
      .post("https://chamados.nexustech.net.br/php/listar_chamados.php", data)
      .then((response) => setChamados(response.data))
      .catch((error) =>
        console.error(`There was an error retrieving the data: ${error}`)
      );
  }, []);

  const handleEditChamado = (e) => {
    e.preventDefault();
    const data = {
      id: selectedChamado,
      title: editData.title,
      description: editData.description,
      reasonForClosure: editData.reasonForClosure,
      isClosed: editData.isClosed,
    };
    axios
      .post("https://chamados.nexustech.net.br/php/edit_chamado.php", data)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          alert(response.data.message);
        } else if (response.data.status === "error") {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(`There was an error editing the data: ${error}`);
      });
  };

  console.log(theUser);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {chamados.map((chamado) => {
        const today = moment();
        const estimated = moment(chamado.estimated_date);
        return (
          <Card
            elevation={3}
            key={chamado.id}
            sx={{
              width: { xs: "100%", sm: "40%", md: "40%", lg: "30%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardActions
              sx={{ cursor: "pointer" }}
              onClick={() => handleOpen(chamado)}
            >
              <CardContent sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  {today.isBefore(estimated, "day") ? (
                    <Tooltip sx={{ cursor: "pointer" }} title="Dentro do prazo">
                      <CheckCircleIcon color="success" />
                    </Tooltip>
                  ) : today.isSame(estimated, "day") ? (
                    <Tooltip sx={{ cursor: "pointer" }} title="O prazo é hoje">
                      <WarningIcon color="warning" />
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
            </CardActions>
            <CardActions>{/* <Button>Apagar</Button> */}</CardActions>
            <Modal
              open={selectedChamado === chamado.id}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  sx={{ marginBottom: 3 }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Editar Chamado
                </Typography>
                <form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <TextField
                      label="Título"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      fullWidth
                    />
                    <TextField
                      label="Descrição"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      fullWidth
                      multiline
                      rows={4}
                    />
                    <TextField
                      label="Motivo do Encerramento"
                      value={editData.reasonForClosure}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          reasonForClosure: e.target.value,
                        })
                      }
                      fullWidth
                      multiline
                      rows={4}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editData.isClosed}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              isClosed: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Encerrar Chamado"
                    />
                    <Button
                      onClick={() => handleEditChamado()}
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                    >
                      Salvar
                    </Button>
                  </Box>
                </form>
              </Box>
            </Modal>
          </Card>
        );
      })}
    </Box>
  );
}

export default ListarChamados;
