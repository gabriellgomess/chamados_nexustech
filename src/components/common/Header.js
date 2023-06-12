import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../contexts/MyContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../img/logo.png";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth } = rootState;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      {isAuth ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
                <img src={Logo} alt="Logo" width="50" height="50" />
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                NEXUSTECH
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/">
                      <Typography textAlign="center">Abrir Chamado</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/acompanhamento">
                      <Typography textAlign="center">
                        Listar Chamados
                      </Typography>
                    </Link>
                  </MenuItem>
                  {/* <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/main">
                      <Typography textAlign="center">Main</Typography>
                    </Link>
                  </MenuItem> */}
                </Menu>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
                <img src={Logo} alt="Logo" width="50" height="50" />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                NEXUSTECH
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Link to="/">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Abrir Chamado
                  </Button>
                </Link>
                <Link to="/acompanhamento">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Listar Chamados
                  </Button>
                </Link>
                {/* <Link to="/main">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Main
                  </Button>
                </Link> */}
              </Box>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                variant="outlined"
                onClick={logoutUser}
              >
                Sair
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      ) : null}
    </>
  );
}

export default Header;
