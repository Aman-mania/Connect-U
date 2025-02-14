import React, { useState } from "react";
import { Button, TextField, Typography, Container, Grid, CssBaseline, Box, Link, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import logoImage from "../assets/logo.png";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
}));

const LeftSide = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  backgroundColor: "#FFFFFF",
  maxWidth: "50%",
}));

const RightSide = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F3F7FF",
}));

const ImageContainer = styled("div")(({ theme }) => ({
  width: "514px",
  height: "467px",
  backgroundImage: `url(${loginImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "45.78px 17.89px 45.78px 26.27px",
}));

const FormContainer = styled(Container)(({ theme }) => ({
  maxWidth: "400px",
  margin: "0 auto",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const Logo = styled("img")(({ theme }) => ({
  width: "250px",
  height: "40px",
  marginBottom: "100px",
}));

const RoleButton = styled(Button)(({ theme }) => ({
  width: "48%", // Adjusted width for side-by-side
  padding: "12px 0", // Thicker button
  fontSize: "16px", // Larger font size
  backgroundColor: "#5088FF",
  color: "#FFFFFF",
  fontWeight: "bold", // Make text bold
  transition: "background-color 0.3s ease", // Smooth transition for color changes
  "&:hover": {
    backgroundColor: "#3a6edc", // Slightly darker blue on hover
  },
  "&:active": {
    backgroundColor: "#2e5cb2", // Even darker blue when clicked
  },
  "&:not(:last-child)": {
    marginRight: theme.spacing(2), // Add spacing between the buttons
  },
}));





export const Signup = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const handleRoleSelect = (selectedRole) => {
    // const navigate=useNavigate();
    if(selectedRole=="worker"){
      navigate('/worker/signup');
    }
    else{
      navigate('/client/signup');
    }
  };


  

  return (
    <Root>
      <CssBaseline />

      {/* Left Side */}
      <LeftSide>
        <FormContainer>
          <LogoContainer>
            <Logo src={logoImage} alt="Logo" />
          </LogoContainer>

          {/* Show buttons to select role if no role is selected */}
          {!role && (
            <>
              <Typography variant="h5" gutterBottom>
                Who do you want to register as?
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <RoleButton onClick={() => handleRoleSelect("worker")}>Worker</RoleButton>
                <RoleButton onClick={() => handleRoleSelect("client")}>Client</RoleButton>
              </Box>
            </>
          )}

          
        </FormContainer>
      </LeftSide>

      {/* Right Side (Untouched) */}
      <RightSide>
        <ImageContainer />
      </RightSide>
    </Root>
  );
};
