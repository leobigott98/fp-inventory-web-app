import * as React from "react";
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
import Link from "next/link";
import AuthService from "../src/service/AuthService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getUserData } from "../src/service/DBService";
import Image from "next/image";

const pages = [{name: "Inicio"}];
const settings = [{name: "Perfil"}, {name: "Cerrar Sesión"}];

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 45, 
      height: 45
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
  
}

function ResponsiveAppBar() {
  const router = useRouter();
  const [rows, setRows] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {  
    async function fetchData() {
      setRows(await getUserData(AuthService.auth.currentUser.uid));
    }
    
    fetchData();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    if(event.target.innerText === "Cerrar Sesión"){
      AuthService.handleSignOut();
    }
    else if(event.target.innerText === "Perfil"){
        router.push(`/profile/${AuthService.auth.currentUser.uid}`);
    }
    
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, justifyContent: "left" }}
          >
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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    href={page.name === "Inicio" ? "/" :  "/" + page.name.toLocaleLowerCase()}                     
                  >
                    <Typography textAlign="center" key={page.name}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "left",
            }}
          >
            <Link href="/">
              <Image src="/images/PuntoGo_efecto3D.png" width="180" height="40" alt="logo PuntoGo" priority/>
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
              marginRight: "4%",
            }}
          >
              {pages.map((page) => (
                <Tooltip title={page.name === "Inicio" ? "Categorías Principales" : page.name === "Comanderas" ? "Inventario e Historial de Comanderas" : "Configuración del Sistema"} key={page.name}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    href={page.name === "Inicio" ? "/" : "/" + page.name.toLowerCase()}
                    key={page.name}
                  >
                    {page.name}
                  </Link>
                </Button>
                </Tooltip>
              ))}
          </Box>
          <>
            {rows? 
            <>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar {...stringAvatar(`${rows.name} ${rows.lastname}`)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={(event) => handleCloseUserMenu(event)}>
                  <Typography textAlign="center" key={setting.name}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            </> : <></>
            }
          </>
          
        </Toolbar>
      </Container>
    </AppBar>
    );
}
export default ResponsiveAppBar;
