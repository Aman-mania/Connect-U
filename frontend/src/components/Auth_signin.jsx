import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Box,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import signinImage from "../assets/signin.png";
import logoImage from "../assets/logo.png";

const baseURL = "https://hr.aiassistant.co:8443/api/v1/";

const loginAPI = async (phone_num, password) => {
  const data = { phone_num, password }; // Change to use phone_num

  try {
    const res = await axios.post(baseURL + "login/", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("refreshToken", res.data.refresh_token);
    return res.data;
  } catch (err) {
    return { error: true, errorMessage: err?.response?.data?.message };
  }
};

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
  backgroundImage: `url(${signinImage})`,
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
  opacity: "1",
  marginBottom: "32px",
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  width: "146px",
  height: "38px",
  fontFamily: "Raleway",
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "37.57px",
  textAlign: "left",
  color: "#5088FF",
  marginBottom: "12px",
}));

const SignInText = styled(Typography)(({ theme }) => ({
  width: "342px",
  height: "33px",
  fontFamily: "Raleway",
  fontSize: "28px",
  fontWeight: 600,
  lineHeight: "32.87px",
  textAlign: "left",
  color: "#313D4F",
  marginBottom: "6px",
}));

const DetailsText = styled(Typography)(({ theme }) => ({
  width: "272px",
  height: "19px",
  fontFamily: "Raleway",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "18.78px",
  textAlign: "left",
  color: "#67768D",
  marginBottom: "24px",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "56px",
  padding: "8px 8px 8px 8px",
  gap: "8px",
  borderRadius: "8px 8px 8px 8px",
  backgroundColor: "#5088FF",
  color: "#FFFFFF",
  marginTop: theme.spacing(8),
  "&:hover": {
    backgroundColor: "#4070c5",
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Raleway",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "22.4px",
  textAlign: "left",
  color: "#262626",
  marginBottom: theme.spacing(0.3),
}));

const ForgotPasswordLink = styled(MuiLink)(({ theme }) => ({
  color: "#262626",
  fontWeight: 600,
  fontSize: "14px",
  textDecoration: "none",
  cursor: "pointer",
  marginTop: "8px",
  alignSelf: "flex-end",
  "&:hover": {
    color: "#4C679D",
    textDecoration: "underline",
  },
}));

const ToSignup = styled(Typography)(({ theme }) => ({
  width: "571px",
  height: "10px",
  top: "809px",
  left: "123px",
  fontFamily: "Raleway",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "25.2px",
  textAlign: "left",
  marginTop: theme.spacing(2),
  marginBottom: "24px",
  color: "#262626",
  "& span": {
    color: "#5088FF",
  },
}));

const Auth = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    phone_num: "", // Changed to phone_num
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      try {
        const response = await loginAPI(data.phone_num, data.password); // Changed to phone_num
        setLoading(false);

        if (response.error) {
          setErrors({ form: response.errorMessage });
        } else {
          navigate("/dashboard", { state: { userId: response.userId } });
          console.log("Login successful!");
        }
      } catch (err) {
        setLoading(false);
        setErrors({ form: "An error occurred. Please try again." });
        console.error("Error during login:", err);
      }
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.phone_num = !data.phone_num ? "Phone number is required" : ""; // Changed to phone_num
    tempErrors.password = !data.password ? "Password is required" : "";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Root>
      <CssBaseline />
      <LeftSide>
        <FormContainer>
          <LogoContainer>
            <Logo src={logoImage} alt="Logo" />
          </LogoContainer>
          <WelcomeText>Welcome</WelcomeText>
          <SignInText>Sign In</SignInText>
          <DetailsText>Enter your details to proceed further</DetailsText>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FieldLabel>Phone Number*</FieldLabel>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone_num"
                  placeholder="Enter Phone Number"
                  name="phone_num" // Changed to phone_num
                  value={data.phone_num}
                  onChange={handleChange}
                  error={Boolean(errors.phone_num)}
                  helperText={errors.phone_num}
                />
              </Grid>
              <Grid item xs={12}>
                <FieldLabel>Password*</FieldLabel>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink>
              </Grid> */}
              {errors.form && (
                <Grid item xs={12}>
                  <Typography color="error">{errors.form}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <CustomButton type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </CustomButton>
              </Grid>
            </Grid>
          </form>
          <ToSignup>
            Don't have an account?{" "}
            <Link to="/signup">
              <span>Sign Up</span>
            </Link>
          </ToSignup>
        </FormContainer>
      </LeftSide>
      <RightSide>
        <ImageContainer />
      </RightSide>
    </Root>
  );
};

export default Auth;
