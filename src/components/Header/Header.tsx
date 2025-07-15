import { AppBar, Box, Toolbar, Typography, Container } from "@mui/material";
import { Flight } from "@mui/icons-material";
import "./Header.style.css";

const Header = () => {
  return (
    <AppBar position="fixed" elevation={0} className="header-appbar">
      <Container maxWidth="xl">
        <Toolbar className="header-toolbar">
          <Box className="header-logo-box">
            <Box className="header-icon-box">
              <Flight className="header-flight-icon" sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                component="h1"
                className="gradient-text header-title"
              >
                Flight Inspirations
              </Typography>
              <Typography variant="body2" className="header-subtitle">
                Discover • Explore • Fly
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
