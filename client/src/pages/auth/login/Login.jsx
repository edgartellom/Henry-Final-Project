import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import customTheme from "./theme";
import GoogleIcon from "./GoogleIcon";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  GlobalStyles,
  IconButton,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";

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

function errorAlert(error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        Error {errorCode}! — {errorMessage}
      </Alert>
    </Stack>
  );
}

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const user = auth.currentUser;

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      if (user !== null) {
        const username = user.displayName;
        const email = user.email;
        const uid = user.uid;
      }
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Login succesfully!</Alert>
        </Stack>
      );
    } catch (error) {
      errorAlert();
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">
            Password reset email sent! — check it out!
          </Alert>
        </Stack>
      );
    } catch (error) {
      errorAlert();
    }
  };

  const handleLogoutSubmit = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      // Sign-out successful.
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">You have logged out!</Alert>
        </Stack>
      );
    } catch (error) {
      errorAlert();
    }
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
              width: 400,
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
                Welcome back
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
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
                  persistent: formElements.persistent.checked,
                };
                alert(JSON.stringify(data, null, 2));
              }}>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input placeholder="•••••••" type="password" name="password" />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                />
                <Link
                  fontSize="sm"
                  href="#replace-with-a-link"
                  fontWeight="lg"
                  onClick={handlePasswordReset}>
                  Forgot password
                </Link>
              </Box>
              <Button type="submit" fullWidth onClick={handleLoginSubmit}>
                Sign in
              </Button>
            </form>
            <Button
              variant="outlined"
              color="neutral"
              fullWidth
              startDecorator={<GoogleIcon />}>
              Sign in with Google
            </Button>
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

export default Login;
