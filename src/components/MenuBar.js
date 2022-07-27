import { AppBar, Button, Chip, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MenuBar() {

  const { authToken, sessionUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ cursor: "pointer" }} onClick={()=>navigate("/")}>
            Wallet App
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {authToken !== false && (<>
            <Button color="inherit" onClick={()=>navigate("/mywallets")}>My Wallets</Button>
            <Button color="inherit" onClick={()=>{
              handleLogout();
              navigate("/");
            }}>Logout</Button>
            <Chip label={sessionUser?.name} color="info" />
          </>)}
          {authToken === false && (<>
            <Button color="inherit" onClick={()=>navigate("/login")}>Login</Button>
          </>)}
        </Toolbar>
      </AppBar>
    </Box>
  );   
}