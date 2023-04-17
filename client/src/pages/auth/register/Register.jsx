import * as React from "react";
import { useState } from "react";
import useUserStore from "../../../store/users";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import customTheme from "../theme";
import { setDoc, doc } from "firebase/firestore";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  GlobalStyles,
  Grid,
  IconButton,
  Input,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/joy";
import { db, auth, app } from "../../../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function ColorSchemeToggle({ onClick, ...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}>
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

const Register = () => {
  const registerUser = useUserStore((state) => state.registerUser);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2})?$/i;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed up
      const user = userCredential.user;
      //store user data in firestore database

      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        id: user.uid,
        username,
        admin: false,
        email: email,
      });
      const userData = {
        id: user.uid,
        username,
        email,
        admin: false,
        // otros detalles del usuario
      };
      registerUser(userData);
      await sendEmailVerification(auth.currentUser);
      navigate("/products");
      // window.location.href = "/products";
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
      theme={customTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}>
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography
              fontWeight="lg"
              startDecorator={
                <Link href="/">
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 24,
                      background: (theme) =>
                        `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                      borderRadius: "50%",
                      boxShadow: (theme) => theme.shadow.md,
                      "--joy-shadowChannel": (theme) =>
                        theme.vars.palette.primary.mainChannel,
                    }}
                  />
                </Link>
              }>
              Logo
            </Typography>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 450,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}>
            <div>
              <Typography component="h2" fontSize="xl2" fontWeight="lg">
                Register your account
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 2 }}>
                Let&apos;s get started! Please enter your details.
              </Typography>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  email: formElements.email.value,
                  password: formElements.password.value,
                };
                alert(JSON.stringify(data, null, 2));
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel>Firstname</FormLabel>
                    <Input
                      placeholder="Enter your firstname"
                      type="firstname"
                      name="firstname"
                      autoComplete="given-name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder="Enter your lastname"
                      type="lastname"
                      name="lastname"
                      autoComplete="family-name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="•••••••"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  endDecorator={
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </FormControl>
              <Button type="submit" fullWidth onClick={handleRegisterSubmit}>
                Sign up
              </Button>
              <Link
                component={RouterLink}
                to="/sign-in"
                fontSize="sm"
                fontWeight="lg">
                Already have an account? Sign in
              </Link>
            </form>
            {error && <p>{error}</p>}
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)",
          },
        })}
      />
    </CssVarsProvider>
  );
};

export default Register;
