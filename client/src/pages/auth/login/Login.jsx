import * as React from "react";
import { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import customTheme from "../theme";
import GoogleIcon from "../GoogleIcon";
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
import "firebase/app";
import "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { app, auth, db } from "../../../firebase/firebaseConfig.js";
import { setDoc, doc } from "firebase/firestore";
import useUserStore from "../../../store/users";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import useCartStore from "../../../store/shoppingCartZustand";

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

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const provider = new GoogleAuthProvider();
  const setUser = useUserStore((state) => state.setUser);
  const getUserById = useUserStore((state) => state.getUserById);
  const registerUser = useUserStore((state) => state.registerUser);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const current = useUserStore((state) => state.currentUser)
  const [cartId, setCartId] = useState('')

  //////////////////////////////////////// USER Store
  const idCart = useUserStore((state) => state.idCart)
  const getCart = useUserStore((state) => state.getCart)
  const updateId = useUserStore((state) => state.updateId)
  const createCart = useUserStore((state) => state.createCart)
/////////////////////////////////////////////////////////Cart Store

const getProductById = useCartStore((state) => state.getProductById)
const cart = useCartStore((state) => state.cart)




  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          username: user.displayName,
          email: user.email,
          // admin: false,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2})?$/i;
      if (!emailRegex.test(email)) {
        setError("Invalid email format.");
        return;
      }
      const confirmEmail = await fetchSignInMethodsForEmail(auth, email);
      if (confirmEmail.length === 0) {
        console.log("error");
        setError("Email address not registered. Please sign up.");
        setTimeout(() => navigate("/sign-up"), 3000);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user);
      setError(""); // Limpia cualquier mensaje de error previo
      // console.log(current)
       console.log(current.id)
       
       
        console.log(idCart)
        console.log(idCart[0].id)
        const temporal = idCart[0].id
        console.log(temporal)
        const idExistente = '0034cadd-0efe-4511-be19-9b680649f35d'

      if(!idCart){
        getCart(current.id)
          
      }else{
        getProductById(idCart[0].id)      

      }
      if(cart.length != 0){
        console.log("product list loaded")
      }
      console.log(idCart)
      console.log(cart)
      // }else{
      //   // const cartUid = await axios.post(`http://localhost:3001/carts`, {userId}, {
      //   //     headers: {"content-type": "application/json"}
      //   //   })
      // }

      
      
      console.log(cartId)
      const response = await axios.get(`http://localhost:3001/cartDetails/${idExistente}`)
      console.log(response.data)

      navigate("/products");
    } catch (error) {
      console.log(error.code, error.message);
      setError(error.message);
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
      console.log(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      if (user !== null) {
        const userData = {
          id: user.uid,
          username: user.displayName,
          email: user.email,
          admin: false,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          // otros detalles del usuario
        };

        setUser(userData);
        const userDb = await getUserById(user.uid);
        if (!userDb) {
          const userDoc = doc(db, "users", user.uid);
          await setDoc(userDoc, userData);

          registerUser(userData);
        }
      }
      navigate("/products");
    } catch (error) {
      console.log(error);
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button
                type="submit"
                value={email}
                fullWidth
                onClick={(event) => handleLoginSubmit(event)}>
                Sign in
              </Button>
              <Link
                component={RouterLink}
                to="/sign-up"
                fontSize="sm"
                fontWeight="lg">
                Don&apos;t have an account? Sign Up
              </Link>
            </form>
            {error && <p>{error}</p>}
            <Button
              onClick={handleLoginGoogle}
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
