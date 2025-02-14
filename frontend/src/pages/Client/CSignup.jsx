import React, { useState } from "react";
import { Button, TextField, Typography, Container, Grid, CssBaseline, Box, Link, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import loginImage from "../../assets/login.png";
import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

const CustomButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "56px",
  padding: "8px 8px 8px 8px",
  gap: "8px",
  borderRadius: "8px",
  backgroundColor: "#5088FF",
  color: "#FFFFFF",
  fontWeight: "bold", // Make text bold
  fontSize: "16px", // Adjust font size
  transition: "background-color 0.3s ease", // Smooth transition for hover and active states
  "&:hover": {
    backgroundColor: "#3a6edc", // Darker color on hover
  },
  "&:active": {
    backgroundColor: "#2e5cb2", // Even darker color when clicked
  },
}));

const PasswordStrength = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1),
  width: "100%",
}));



const signupAPI = async (name,phone_number,password,address) => {
    const data = { name,phone_number,password,address};// Change to use phone_num
    //  console.log(data);
     try {
      const response= await axios.post(`${BACKEND_URL}/api/v1/client/signup`,data);
    //   if(response.data.status==)
      const jwttoken=response.data.token;
      localStorage.setItem("token",jwttoken);
      const decodedValue=jwtDecode(jwttoken);
      return decodedValue;
    } catch (err) {
      return {err};
    }
  };








export const CSignup = () => {
//   const [role, setRole] = useState(null);
const navigate=useNavigate();
const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

const role="client";
  const [data, setData] = useState({
    name: "",
    phone_num: "",
    password: "",
    city: "", // Replaced address with city
    profession: "",
    charge_by_day: "",
    charge_by_hours: "",
  });
//   const [passwordStrength, setPasswordStrength] = useState(0); // Using number to represent strength

  const cities = [
    "Mumbai",
    "Chennai",
    "Pune",
    "Delhi",
    "Kolkata",
    "Surat",
    "Ahmedabad",
    "Jaipur",
    "Agra",
    "Indore",
    "Bangalore",
    "Hyderabad",
    "Lucknow",
    "Patna",
    "Vadodara",
    "Bhopal",
    "Kanpur",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // if (name === "password") {
    //   evaluatePasswordStrength(value);
    // }
  };

//   const evaluatePasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (password.match(/[A-Z]/)) strength++;
//     if (password.match(/[0-9]/)) strength++;
//     if (password.match(/[\W_]/)) strength++;

    // setPasswordStrength(strength);
//   };


const validateForm = () => {
    let tempErrors = {};
    tempErrors.name=!data.name?"Name is required" : "";
    tempErrors.phone_num = !data.phone_num ? "Phone number is required" : ""; // Changed to phone_num
    tempErrors.password = !data.password ? "Password is required" : "";
    tempErrors.city = !data.city ? "city is required" : "";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };


const handleSubmit = async (e) => {
    // console.log("hi")
    e.preventDefault();
    const isValid = validateForm();
    // console.log(data);

    if (isValid) {
      setLoading(true);
      try {
        const response = await signupAPI(data.name,data.phone_num, data.password,data.city); // Changed to phone_num
        console.log(response)
        setLoading(false);
        if(response.worker==false){
            navigate('/client');
            console.log("Login successful!");
        }
        //   navigate("/dashboard", { state: { userId: response.userId } });
      } catch (err) {
        setLoading(false);
        setErrors({ form: "An error occurred. Please try again." });
        console.error("Error during login:", err);
      }
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

          {/* Conditionally render form based on the selected role */}
          {role && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone_num"
                    label="Phone Number"
                    value={data.phone_num}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label="City"
                    value={data.city}
                    onChange={handleChange}
                  >
                    {cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Show worker-specific fields if "worker" is selected */}
                {role === "worker" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="profession"
                        label="Profession"
                        value={data.profession}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="charge_by_day"
                        label="Charge per Day"
                        value={data.charge_by_day}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="charge_by_hours"
                        label="Charge per Hour"
                        value={data.charge_by_hours}
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <CustomButton type="submit" fullWidth variant="contained" color="primary">
                    Sign Up
                  </CustomButton>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Typography variant="body2">
                      Already have an account?{" "}
                      <Link href="/signin" variant="body2">
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </FormContainer>
      </LeftSide>

      <RightSide>
        <ImageContainer />
      </RightSide>
    </Root>
  );
};
